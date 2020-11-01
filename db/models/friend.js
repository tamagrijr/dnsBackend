'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    friendId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Friend.associate = function(models) {
    // associations can be defined here
    Friend.belongsTo(models.User, { foreignKey: "userId" })
  };
  return Friend;
};
