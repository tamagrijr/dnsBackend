'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('GroupMessages', [
      {
        name: 'Cool Group One',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cool Group Two',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cool Group Three',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('GroupMessages', null, {});
  }
};
