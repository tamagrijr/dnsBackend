'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channelAvatar: {
      type: DataTypes.STRING,
    }
  }, {});
  const columnMapping = {
    through: 'channelJoin',
    otherKey: 'userId',
    foreignKey: 'channelId',
  }
  Channel.associate = function(models) {
    // associations can be defined here
    Channel.belongsTo(models.User, { foreignKey: "ownerId"}),
    Channel.belongsToMany(models.User, columnMapping)
    // Channel.hasMany(model.subChannel, { foreignKey: "channelId" })
  };
  return Channel;
};
