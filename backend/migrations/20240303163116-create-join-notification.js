'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JoinNotifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER
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
 

  await queryInterface.addIndex('JoinNotifications', ['userId', 'groupId'], {
    unique: true,
    name: 'unique_userId_groupId_JoinNotifications'
  });
},

async down(queryInterface, Sequelize) {
  // Remove composite unique constraint
  await queryInterface.removeIndex('JoinNotifications', 'unique_userId_groupId');

  await queryInterface.dropTable('JoinNotifications');
}
};