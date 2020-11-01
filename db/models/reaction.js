'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reaction: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Reaction.associate = function(models) {
    // associations can be defined here
    Reaction.belongsTo(models.User, { foreignKey: 'userId' }),
    Reaction.belongsTo(models.Message, { foreignKey: 'messageId' })
  };
  return Reaction;
};
