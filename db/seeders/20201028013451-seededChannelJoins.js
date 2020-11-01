'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('channelJoins', [
      {
        userId: 1,
        channelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        channelId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        channelId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        channelId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        channelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('channelJoins', null, {});
  }
};
