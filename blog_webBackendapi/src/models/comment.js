'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.blog, {
        foreignKey: 'blogId',
        as: 'blog'
      });
      comment.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'  
      });
      comment.belongsTo(models.comment, {
        foreignKey: 'parentId',
        as: 'parent'
      });
      comment.hasMany(models.comment, {
        foreignKey: 'parentId',
        as: 'children'
      });
    }
  }
  comment.init({
    content: DataTypes.STRING,
    blogId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};