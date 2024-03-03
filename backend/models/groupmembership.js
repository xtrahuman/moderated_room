"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupMembership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupMembership.belongsTo(models.User, { foreignKey: "userId" });
      GroupMembership.belongsTo(models.Group, { foreignKey: "groupId" });
    }
  }
  GroupMembership.init(
    {
      role: {
        type: DataTypes.ENUM("admin", "member", "moderator"),
        allowNull: false,
        defaultValue: "member", // Set default value to 'member'
      },
    },
    {
      sequelize,
      modelName: "GroupMembership",
      indexes: [
        {
          unique: true,
          fields: ['groupId', 'userId']
        }
      ]
  
    }
  );
  return GroupMembership;
};
