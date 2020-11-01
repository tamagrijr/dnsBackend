'use strict';
module.exports = (sequelize, DataTypes) => {
  const channelJoin = sequelize.define('channelJoin', {
    userId:{
    type:  DataTypes.INTEGER,
    allowNull: false,
  },
  channelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  }, {});
  channelJoin.associate = function(models) {
    // associations can be defined here
    channelJoin.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return channelJoin;
};
