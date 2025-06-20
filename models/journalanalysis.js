'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const JournalAnalysis = sequelize.define('JournalAnalysis', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    journalEntryId: DataTypes.UUID,
    theme: DataTypes.STRING,
    tone: DataTypes.STRING,
    summary: DataTypes.TEXT
  });

  JournalAnalysis.associate = function(models) {
    JournalAnalysis.belongsTo(models.JournalEntry, { foreignKey: 'journalEntryId' });
  };

  return JournalAnalysis;
};
