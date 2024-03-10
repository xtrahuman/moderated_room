/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GroupMemberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      role: {
        type: Sequelize.ENUM('admin', 'non_member','moderator'),
        allowNull: false,
        defaultValue: 'non_member'
      },
      verifyStatus: {
        type: Sequelize.ENUM('verified', 'unverified','awaiting_verification'),
        allowNull: false,
        defaultValue: 'unverified'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add composite unique constraint
    await queryInterface.addIndex('GroupMemberships', ['userId', 'groupId'], {
      unique: true,
      name: 'unique_userId_groupId'
    });
  },
  async down(queryInterface, Sequelize) {
    // Remove composite unique constraint
    await queryInterface.removeIndex('GroupMemberships', 'unique_userId_groupId');

    await queryInterface.dropTable('GroupMemberships');
  }
};
