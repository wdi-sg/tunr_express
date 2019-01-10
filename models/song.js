'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    album: DataTypes.STRING,
    preview_link: DataTypes.STRING,
    artwork: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Artist)
  };
  return Song;
};