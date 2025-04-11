'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      blog.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      });
      blog.belongsTo(models.category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
      blog.hasMany(models.comment, {
        foreignKey: 'blogId',
        as: 'comments'
      });
    }
  }
  blog.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    contentHtml: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    image: DataTypes.BLOB,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'blog',
  });
  return blog;
};