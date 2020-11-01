'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubChannel = sequelize.define('SubChannel', {
    channelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  SubChannel.associate = function(models) {
    // associations can be defined here
    SubChannel.belongsTo(models.Channel, { foreignKey: 'channelId' })
  };
  return SubChannel;
};
