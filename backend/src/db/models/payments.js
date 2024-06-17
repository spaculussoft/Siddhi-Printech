const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const payments = sequelize.define(
    'payments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      payment_date: {
        type: DataTypes.DATE,
      },

      amount: {
        type: DataTypes.DECIMAL,
      },

      payment_method: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['completed', 'pending', 'failed'],
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

  payments.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.payments.belongsTo(db.customers, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.payments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.payments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return payments;
};
