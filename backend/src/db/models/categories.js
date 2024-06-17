const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const categories = sequelize.define(
    'categories',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      is_active: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  categories.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.categories.hasMany(db.category_questions, {
      as: 'category_questions_category',
      foreignKey: {
        name: 'categoryId',
      },
      constraints: false,
    });

    db.categories.hasMany(db.products, {
      as: 'products_category',
      foreignKey: {
        name: 'categoryId',
      },
      constraints: false,
    });

    //end loop

    db.categories.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.categories.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return categories;
};