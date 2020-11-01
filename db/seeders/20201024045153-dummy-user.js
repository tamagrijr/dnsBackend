'use strict';
const bcrypt = require('bcryptjs');

const setPassword = function (password) {
  let hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword
};
const password1 = setPassword('password')
const password2 = setPassword('password')
const password3 = setPassword('password')
const password4 = setPassword('password')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'demo',
        lastName: 'user',
        email: 'demo@email.com',
        userName: 'Demo',
        avatarUrl: '',
        bio: 'I am a demo user',
        hashedPassword: password1,
        tokenId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Warren',
        lastName: 'Tamagri',
        email: 'tamagrijr@gmail.com',
        userName: 'JoJo',
        avatarUrl: 'https://i.imgur.com/KsNTAHB.jpg',
        bio: 'I hate postman',
        hashedPassword: password2,
        tokenId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Cole',
        lastName: 'McCole',
        email: 'cole@mccole.com',
        userName: 'Cole',
        avatarUrl: 'https://i.imgur.com/hvJQyfA.jpg',
        bio: 'I am getting annoyed with Warren\'s questions',
        hashedPassword: password3,
        tokenId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Mr',
        lastName: 'noFriends',
        email: 'mrnofriends@email.com',
        userName: 'noFriends',
        avatarUrl: '',
        bio: 'I am a lonely user',
        hashedPassword: password4,
        tokenId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
