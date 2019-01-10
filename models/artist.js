'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    nationality: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
 };
  return Artist;
};