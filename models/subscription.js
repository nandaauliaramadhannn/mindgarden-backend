'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    plan: {
      type: DataTypes.ENUM('free', 'premium'),
      defaultValue: 'free'
    },
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User, { foreignKey: 'userId' });
    Subscription.hasMany(models.SubscriptionRenewal, { foreignKey: 'subscriptionId' });
  };

  return Subscription;
};
