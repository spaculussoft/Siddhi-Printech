const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const customers = sequelize.define(
    'customers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      first_name: {
        type: DataTypes.TEXT,
      },

      last_name: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      phone_number: {
        type: DataTypes.TEXT,
      },

      address: {
        type: DataTypes.TEXT,
      },

      state: {
        type: DataTypes.TEXT,
      },

      country: {
        type: DataTypes.TEXT,
      },

      city: {
        type: DataTypes.TEXT,
      },

      password: {
        type: DataTypes.TEXT,
      },

      is_verified: {
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

  customers.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.customers.hasMany(db.orders, {
      as: 'orders_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.customers.hasMany(db.payments, {
      as: 'payments_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.customers.hasMany(db.tickets, {
      as: 'tickets_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    //end loop

    db.customers.hasMany(db.file, {
      as: 'profile_pic',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.customers.getTableName(),
        belongsToColumn: 'profile_pic',
      },
    });

    db.customers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.customers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return customers;
};
