'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Messages', [
        //channelMessages
      {
        userId: 2,
        channelId: 1,
        message: 'This is my first message on Dungeons and Slack',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        channelId: 1,
        message: 'This is my second message on Dungeons and Slack',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        channelId: 1,
        message: 'This is my third message on Dungeons and Slack',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        channelId: 1,
        message: 'This is my fourth message on Dungeons and Slack',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        channelId: 1,
        message: 'This is my fifth message on Dungeons and Slack',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        channelId: 1,
        message: 'You know Warren, I don\'t think this is very good seed data',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //GroupMessages
      {
        userId: 2,
        groupId: 1,
        message: 'This is my first group message on Dungeons and Slack',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Messages', null, {});
  }
};
