"use strict";
const { Model,Sequelize } = require("sequelize");
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
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "member", "moderator"),
        allowNull: false,
        defaultValue: "non_member", // Set default value to 'member'
      },
      verifyStatus: {
        type: DataTypes.ENUM('verified', 'unverified','awaiting_verification'),
        allowNull: false,
        defaultValue: 'unverified'
      }
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
