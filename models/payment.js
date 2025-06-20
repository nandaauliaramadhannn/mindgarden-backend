'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    amount: DataTypes.FLOAT,
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'IDR'
    },
    provider: DataTypes.ENUM('stripe', 'midtrans'),
    status: DataTypes.ENUM('pending', 'success', 'failed'),
    method: DataTypes.STRING,
    transactionId: DataTypes.STRING,
    paidAt: DataTypes.DATE
  });

  Payment.associate = function(models) {
    Payment.belongsTo(models.User, { foreignKey: 'userId' });
    Payment.hasOne(models.SubscriptionRenewal, { foreignKey: 'paymentId' });
  };

  return Payment;
};
