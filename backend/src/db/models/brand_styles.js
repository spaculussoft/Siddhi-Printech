const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const brand_styles = sequelize.define(
    'brand_styles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
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

  brand_styles.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.brand_styles.hasMany(db.orders, {
      as: 'orders_brand_style',
      foreignKey: {
        name: 'brand_styleId',
      },
      constraints: false,
    });

    //end loop

    db.brand_styles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.brand_styles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return brand_styles;
};
