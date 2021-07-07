'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    nationality: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
    Artist.hasMany(models.Song,{
      foreignKey:'artist_id'
    })

  };
  return Artist;
};