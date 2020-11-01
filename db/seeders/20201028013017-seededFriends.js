'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Friends', [
      {
        userId: 1,
        friendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        friendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        friendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        friendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Friends', null, {});
  }
};
