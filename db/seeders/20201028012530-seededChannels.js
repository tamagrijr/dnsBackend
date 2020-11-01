'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Channels', [
        {
        ownerId: 2,
        name: 'Warren\'s First Channel',
        channelAvatar: 'https://i.imgur.com/MGfS5pn.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
        ownerId: 2,
        name: 'Warren\'s Second Channel',
        channelAvatar: 'https://i.imgur.com/kTXta4O.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
        ownerId: 2,
        name: 'Warren\'s Third Channel',
        channelAvatar: 'https://i.imgur.com/RUdyz2a.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
          ownerId: 2,
          name: 'a/A',
          channelAvatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Appacademylogo.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          },
        {
        ownerId: 1,
        name: 'Demo\'s First Channel',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
        ownerId: 1,
        name: 'Demo\'s Second Channel',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
        {
        ownerId: 3,
        name: 'Cole\'s Only Channel',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Channels', null, {});

  }
};
