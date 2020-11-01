'use strict';
module.exports = (sequelize, DataTypes) => {
  const groupJoin = sequelize.define('groupJoin', {
    userId: {
      type:  DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  groupJoin.associate = function(models) {
    // associations can be defined here
  };
  return groupJoin;
};
