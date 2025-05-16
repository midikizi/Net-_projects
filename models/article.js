'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      // Temporairement commenté
      // Article.belongsTo(models.User, {
      //   foreignKey: 'userId'
      // });
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // userId temporairement modifié pour être optionnel
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Article'
  });
  return Article;
};