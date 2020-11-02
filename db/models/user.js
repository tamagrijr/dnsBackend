'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    avatarUrl: DataTypes.STRING(500),
    userName: DataTypes.STRING(100),
    bio: DataTypes.STRING,
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.STRING
    }
  }, {});
  const columnMappingChannel = {
    through: 'channelJoin',
    otherKey: 'channelId',
    foreignKey: 'userId',
  }
  const columnMappingGroup = {
    through: 'groupJoin',
    otherKey: 'groupId',
    foreignKey: 'userId',
  }
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Friend, { foreignKey: 'userId' }),
    User.hasMany(models.Message, { foreignKey: 'userId' }),
    User.hasMany(models.Reaction, { foreignKey: 'userId' }),
    User.hasMany(models.Channel, { foreignKey: 'ownerId' }),
    User.hasMany(models.channelJoin, { foreignKey: 'userId'})
    User.belongsToMany(models.Channel, columnMappingChannel),
    User.belongsToMany(models.GroupMessage, columnMappingGroup)
  };

  User.prototype.isValid = () => true;

  User.prototype.setPassword = function (password) {
    this.hashedPassword = bcrypt.hashSync(password, 10);
    return this;
  };

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.prototype.toSafeObject = function () {
    return {
      createdAt: this.createdAt,
      email: this.email,
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      updatedAt: this.updatedAt,
    };
  };


  return User;
};
