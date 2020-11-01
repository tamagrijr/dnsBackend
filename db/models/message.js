'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.INTEGER,
    },
    groupId: {
      type: DataTypes.INTEGER,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: 'userId' }),
    Message.belongsTo(models.Channel, { foreignKey: 'channelId' }),
    Message.belongsTo(models.GroupMessage, { foreignKey: 'groupId' })
  };
  return Message;
};
