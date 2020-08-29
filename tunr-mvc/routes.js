module.exports = (app, allModels) => {



/**
 * ===================================
 * Artists Routes
 * ===================================
 */

  // require the controller
  const artistsControllerCallbacks = require('./controllers/artists')(allModels);

app.get('/artists/new',artistsControllerCallbacks.newArtist);
app.get('/artists/:id/songs/new', artistsControllerCallbacks.artistNewSong);
app.post('/artists/:id/songs', artistsControllerCallbacks.addArtistNewSong);
  app.get('/artists/:id/songs', artistsControllerCallbacks.artistSongs);
  app.get('/artists/:id', artistsControllerCallbacks.individualArtist);
  // do database query and return the results

    app.post('/artists', artistsControllerCallbacks.createArtist);
  app.get('/artists/', artistsControllerCallbacks.allArtists);
  app.get('/artists/:id/edit', artistsControllerCallbacks.editArtist);
  app.put('/artists/:id', artistsControllerCallbacks.updateArtist);
  app.get('/artists/:id/delete', artistsControllerCallbacks.deleteArtist);
  app.delete('/artists/:id', artistsControllerCallbacks.artistDeleted);

//
/**
 * ===================================
 * Songs Routes
 * ===================================
 */

const songsControllerCallbacks = require('./controllers/songs')(allModels);
app.get('/songs/addtoplaylist/:id',songsControllerCallbacks.addSongsToPlaylists);
app.post('/songs/songaddedtoplaylist',songsControllerCallbacks.songsAddedToPlaylists);
app.get('/songs/',songsControllerCallbacks.songsList);
app.get('/songs/new',songsControllerCallbacks.newSong);
app.post('/songs',songsControllerCallbacks.createSong);
app.get('/songs/:id',songsControllerCallbacks.individualSong);
app.get('/songs/:id/edit',songsControllerCallbacks.editSong);
app.put('/songs/:id',songsControllerCallbacks.updateSong);
app.get('/songs/:id/delete',songsControllerCallbacks.deleteSong);
app.delete('/songs/:id',songsControllerCallbacks.songDeleted);


/**
 * ===================================
 * Playlist Routes
 * ===================================
 */

const playlistControllerCallbacks = require('./controllers/playlist')(allModels);
app.get('/playlist/new',playlistControllerCallbacks.newPlaylist);
app.get('/playlist/:id/newsong',playlistControllerCallbacks.newSongToPlaylist)
app.get('/playlist/:id',playlistControllerCallbacks.individualPlaylist);

app.post('/playlist',playlistControllerCallbacks.createPlaylist);
app.post('/playlist/newsong',playlistControllerCallbacks.updateSongToPlaylist)

};

