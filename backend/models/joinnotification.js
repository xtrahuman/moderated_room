'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JoinNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JoinNotification.belongsTo(models.User, { foreignKey: "userId" });
      JoinNotification.belongsTo(models.Group, { foreignKey: "groupId" });
    }
  }
  JoinNotification.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JoinNotification',
    indexes: [
      {
        unique: true,
        fields: ['groupId', 'userId']
      }
    ]
  });
  return JoinNotification;
};