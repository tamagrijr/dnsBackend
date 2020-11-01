'use strict';
module.exports = (sequelize, DataTypes) => {
  const Replies = sequelize.define('Replies', {
    userId:{
      type: DataTypes.INTEGER
    }
  }, {});
  Replies.associate = function(models) {
    // associations can be defined here
  };
  return Replies;
};
