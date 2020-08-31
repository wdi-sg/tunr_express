const pg = require('pg');

const configs = {
    user: 'wongjoey',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
  };
  
  const pool = new pg.Pool(configs);
  
  pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
  });

  const artistsModelsFunction = require('./models/artists_model');
  const songsModelsFunction = require('./models/songs_model');
  const playlistsModelsFunction = require('./models/playlists_model.js');

  const poolArtistsModelsObject = artistsModelsFunction(pool);
  const poolSongsModelsObject = songsModelsFunction(pool);
  const poolPlaylistsModelsObject = playlistsModelsFunction(pool);

  module.exports = {
    //make queries directly from here
    queryInterface: (text, params, callback) => {
      return pool.query(text, params, callback);
    },
  
    // get a reference to end the connection pool at server end
    pool:pool,
  
    /*
     * ADD APP MODELS HERE
     */
  
    artists: poolArtistsModelsObject,
    songs: poolSongsModelsObject,
    playlists: poolPlaylistsModelsObject 
  };
