'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('groupJoins', [
      {
        userId: 1,
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        groupId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        groupId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('groupJoins', null, {});
  }
};
