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
      },
      {
        userId: 3,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 8,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 9,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 10,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 11,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 12,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 13,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 14,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 15,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 16,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 17,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 18,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 19,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 20,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 21,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 22,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 23,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 24,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 25,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 26,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 27,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 28,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 29,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 30,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 31,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 32,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 33,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 34,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 35,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 36,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 37,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 38,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 39,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 40,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 41,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 42,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 43,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 44,
        channelId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('channelJoins', null, {});
  }
};
