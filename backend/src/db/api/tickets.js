const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TicketsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        status: data.status || null,
        creation_date: data.creation_date || null,
        last_update_date: data.last_update_date || null,
        details: data.details || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tickets.setCustomer(data.customer || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.tickets.getTableName(),
        belongsToColumn: 'attachments',
        belongsToId: tickets.id,
      },
      data.attachments,
      options,
    );

    return tickets;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const ticketsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      status: item.status || null,
      creation_date: item.creation_date || null,
      last_update_date: item.last_update_date || null,
      details: item.details || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const tickets = await db.tickets.bulkCreate(ticketsData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < tickets.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.tickets.getTableName(),
          belongsToColumn: 'attachments',
          belongsToId: tickets[i].id,
        },
        data[i].attachments,
        options,
      );
    }

    return tickets;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.findByPk(id, {}, { transaction });

    await tickets.update(
      {
        title: data.title || null,
        status: data.status || null,
        creation_date: data.creation_date || null,
        last_update_date: data.last_update_date || null,
        details: data.details || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tickets.setCustomer(data.customer || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.tickets.getTableName(),
        belongsToColumn: 'attachments',
        belongsToId: tickets.id,
      },
      data.attachments,
      options,
    );

    return tickets;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of tickets) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of tickets) {
        await record.destroy({ transaction });
      }
    });

    return tickets;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.findByPk(id, options);

    await tickets.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await tickets.destroy({
      transaction,
    });

    return tickets;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const tickets = await db.tickets.findOne({ where }, { transaction });

    if (!tickets) {
      return tickets;
    }

    const output = tickets.get({ plain: true });

    output.attachments = await tickets.getAttachments({
      transaction,
    });

    output.customer = await tickets.getCustomer({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.customers,
        as: 'customer',
      },

      {
        model: db.file,
        as: 'attachments',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tickets', 'title', filter.title),
        };
      }

      if (filter.details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tickets', 'details', filter.details),
        };
      }

      if (filter.creation_dateRange) {
        const [start, end] = filter.creation_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            creation_date: {
              ...where.creation_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            creation_date: {
              ...where.creation_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.last_update_dateRange) {
        const [start, end] = filter.last_update_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            last_update_date: {
              ...where.last_update_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            last_update_date: {
              ...where.last_update_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.customer) {
        var listItems = filter.customer.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          customerId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.tickets.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.tickets.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('tickets', 'title', query),
        ],
      };
    }

    const records = await db.tickets.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
