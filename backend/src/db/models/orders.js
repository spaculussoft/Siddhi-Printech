const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      order_date: {
        type: DataTypes.DATE,
      },

      total_price: {
        type: DataTypes.DECIMAL,
      },

      answers: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['pending', 'processing', 'completed', 'canceled'],
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

  orders.associate = (db) => {
    db.orders.belongsToMany(db.products, {
      as: 'products',
      foreignKey: {
        name: 'orders_productsId',
      },
      constraints: false,
      through: 'ordersProductsProducts',
    });

    db.orders.belongsToMany(db.color_codes, {
      as: 'color_codes',
      foreignKey: {
        name: 'orders_color_codesId',
      },
      constraints: false,
      through: 'ordersColor_codesColor_codes',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.orders.belongsTo(db.customers, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.orders.belongsTo(db.industries, {
      as: 'industry',
      foreignKey: {
        name: 'industryId',
      },
      constraints: false,
    });

    db.orders.belongsTo(db.brand_styles, {
      as: 'brand_style',
      foreignKey: {
        name: 'brand_styleId',
      },
      constraints: false,
    });

    db.orders.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.orders.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return orders;
};
