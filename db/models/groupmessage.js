'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMessage = sequelize.define('GroupMessage', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  const columnMapping = {
    through: 'groupJoin',
    otherKey: 'userId',
    foreignKey: 'groupId',
  }
  GroupMessage.associate = function(models) {
    // associations can be defined here
    GroupMessage.belongsToMany(models.User, columnMapping)
  };
  return GroupMessage;
};
