const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CustomersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customers = await db.customers.create(
      {
        id: data.id || undefined,

        first_name: data.first_name || null,
        last_name: data.last_name || null,
        email: data.email || null,
        phone_number: data.phone_number || null,
        address: data.address || null,
        state: data.state || null,
        country: data.country || null,
        city: data.city || null,
        password: data.password || null,
        is_verified: data.is_verified || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.customers.getTableName(),
        belongsToColumn: 'profile_pic',
        belongsToId: customers.id,
      },
      data.profile_pic,
      options,
    );

    return customers;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const customersData = data.map((item, index) => ({
      id: item.id || undefined,

      first_name: item.first_name || null,
      last_name: item.last_name || null,
      email: item.email || null,
      phone_number: item.phone_number || null,
      address: item.address || null,
      state: item.state || null,
      country: item.country || null,
      city: item.city || null,
      password: item.password || null,
      is_verified: item.is_verified || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const customers = await db.customers.bulkCreate(customersData, {
      transaction,
    });

    // For each item created, replace relation files

    for (let i = 0; i < customers.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.customers.getTableName(),
          belongsToColumn: 'profile_pic',
          belongsToId: customers[i].id,
        },
        data[i].profile_pic,
        options,
      );
    }

    return customers;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customers = await db.customers.findByPk(id, {}, { transaction });

    await customers.update(
      {
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        email: data.email || null,
        phone_number: data.phone_number || null,
        address: data.address || null,
        state: data.state || null,
        country: data.country || null,
        city: data.city || null,
        password: data.password || null,
        is_verified: data.is_verified || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.customers.getTableName(),
        belongsToColumn: 'profile_pic',
        belongsToId: customers.id,
      },
      data.profile_pic,
      options,
    );

    return customers;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customers = await db.customers.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of customers) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of customers) {
        await record.destroy({ transaction });
      }
    });

    return customers;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customers = await db.customers.findByPk(id, options);

    await customers.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await customers.destroy({
      transaction,
    });

    return customers;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const customers = await db.customers.findOne({ where }, { transaction });

    if (!customers) {
      return customers;
    }

    const output = customers.get({ plain: true });

    output.orders_customer = await customers.getOrders_customer({
      transaction,
    });

    output.payments_customer = await customers.getPayments_customer({
      transaction,
    });

    output.tickets_customer = await customers.getTickets_customer({
      transaction,
    });

    output.profile_pic = await customers.getProfile_pic({
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
        model: db.file,
        as: 'profile_pic',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.first_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customers', 'first_name', filter.first_name),
        };
      }

      if (filter.last_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customers', 'last_name', filter.last_name),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customers', 'email', filter.email),
        };
      }

      if (filter.phone_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'phone_number',
            filter.phone_number,
          ),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customers', 'address', filter.address),
        };
      }

      if (filter.state) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customers', 'state', filter.state),
        };
      }

      if (filter.country) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customers', 'country', filter.country),
        };
      }

      if (filter.city) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customers', 'city', filter.city),
        };
      }

      if (filter.password) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customers', 'password', filter.password),
        };
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

      if (filter.is_verified) {
        where = {
          ...where,
          is_verified: filter.is_verified,
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
          count: await db.customers.count({
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
      : await db.customers.findAndCountAll({
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
          Utils.ilike('customers', 'email', query),
        ],
      };
    }

    const records = await db.customers.findAll({
      attributes: ['id', 'email'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['email', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.email,
    }));
  }
};
