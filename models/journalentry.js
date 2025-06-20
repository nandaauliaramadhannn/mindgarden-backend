'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const JournalEntry = sequelize.define('JournalEntry', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    entryDate: DataTypes.DATEONLY,
    text: DataTypes.TEXT,
    mood: DataTypes.ENUM('positive', 'neutral', 'negative'),
    emoji: DataTypes.STRING
  });

  JournalEntry.associate = function(models) {
    JournalEntry.belongsTo(models.User, { foreignKey: 'userId' });
    JournalEntry.hasOne(models.JournalAnalysis, { foreignKey: 'journalEntryId' });
  };

  return JournalEntry;
};
