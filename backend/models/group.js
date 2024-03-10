'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: 'GroupMembership',
        foreignKey: 'groupId',
        as: 'members',
      });

      Group.belongsToMany(models.User, {
        through: 'JoinNotification',
        foreignKey: 'groupId',
        as: 'join_members',
      });
    }
  }
  Group.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING,
    name: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};