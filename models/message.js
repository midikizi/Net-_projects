'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // Temporairement commenté
      // Message.belongsTo(models.User, {
      //   foreignKey: 'userId'
      // });
    }
  }
  Message.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // userId temporairement modifié pour être optionnel
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attachment: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Message'
  });
  return Message;
};