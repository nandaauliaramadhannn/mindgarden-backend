'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const OpenAiKey = sequelize.define('OpenAiKey', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    key_app: {
      type: DataTypes.STRING,
      allowNull: false
    },
    key_secret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  return OpenAiKey;
};
