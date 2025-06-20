'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const SubscriptionRenewal = sequelize.define('SubscriptionRenewal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    subscriptionId: DataTypes.UUID,
    paymentId: DataTypes.UUID,
    previousEndDate: DataTypes.DATE,
    newEndDate: DataTypes.DATE,
    renewedAt: DataTypes.DATE
  });

  SubscriptionRenewal.associate = function(models) {
    SubscriptionRenewal.belongsTo(models.Subscription, { foreignKey: 'subscriptionId' });
    SubscriptionRenewal.belongsTo(models.Payment, { foreignKey: 'paymentId' });
  };

  return SubscriptionRenewal;
};
