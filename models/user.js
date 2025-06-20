'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
    },
    plantType: {
      type: DataTypes.ENUM('flower', 'tree', 'cactus'),
      defaultValue: 'flower'
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  User.associate = function(models) {
    User.hasOne(models.Subscription, { foreignKey: 'userId' });
    User.hasMany(models.JournalEntry, { foreignKey: 'userId' });
    User.hasMany(models.Payment, { foreignKey: 'userId' });
  };

  return User;
};
