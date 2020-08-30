console.log("db started")

const pg = require('pg');

const configs = {
  user: 'jarryl',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const allArtistsModels = require('./models/artists')
const allSongsModels = require('./models/songs')
const allPlaylistsModels = require('./models/playlists')

console.log(allArtistsModels);

const artistsModelObject = allArtistsModels(pool)
const songsModelObject = allSongsModels(pool)
const playlistsModelObject = allPlaylistsModels(pool)


module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    pool,
    artists: artistsModelObject,
    songs: songsModelObject,
    playlists: playlistsModelObject
}