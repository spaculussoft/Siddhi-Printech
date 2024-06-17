const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Category_questionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const category_questions = await db.category_questions.create(
      {
        id: data.id || undefined,

        text: data.text || null,
        type: data.type || null,
        options: data.options || null,
        is_mandatory: data.is_mandatory || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await category_questions.setCategory(data.category || null, {
      transaction,
    });

    return category_questions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const category_questionsData = data.map((item, index) => ({
      id: item.id || undefined,

      text: item.text || null,
      type: item.type || null,
      options: item.options || null,
      is_mandatory: item.is_mandatory || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const category_questions = await db.category_questions.bulkCreate(
      category_questionsData,
      { transaction },
    );

    // For each item created, replace relation files

    return category_questions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const category_questions = await db.category_questions.findByPk(
      id,
      {},
      { transaction },
    );

    await category_questions.update(
      {
        text: data.text || null,
        type: data.type || null,
        options: data.options || null,
        is_mandatory: data.is_mandatory || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await category_questions.setCategory(data.category || null, {
      transaction,
    });

    return category_questions;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const category_questions = await db.category_questions.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of category_questions) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of category_questions) {
        await record.destroy({ transaction });
      }
    });

    return category_questions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const category_questions = await db.category_questions.findByPk(
      id,
      options,
    );

    await category_questions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await category_questions.destroy({
      transaction,
    });

    return category_questions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const category_questions = await db.category_questions.findOne(
      { where },
      { transaction },
    );

    if (!category_questions) {
      return category_questions;
    }

    const output = category_questions.get({ plain: true });

    output.category = await category_questions.getCategory({
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
        model: db.categories,
        as: 'category',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.text) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('category_questions', 'text', filter.text),
        };
      }

      if (filter.options) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'category_questions',
            'options',
            filter.options,
          ),
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

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
        };
      }

      if (filter.is_mandatory) {
        where = {
          ...where,
          is_mandatory: filter.is_mandatory,
        };
      }

      if (filter.category) {
        var listItems = filter.category.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          categoryId: { [Op.or]: listItems },
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
          count: await db.category_questions.count({
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
      : await db.category_questions.findAndCountAll({
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
          Utils.ilike('category_questions', 'text', query),
        ],
      };
    }

    const records = await db.category_questions.findAll({
      attributes: ['id', 'text'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['text', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.text,
    }));
  }
};
