module.exports = (app, allModels) => {

  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller  allModels is passed into the callback function in controllers/pokemon
  const artistsControllerCallbacks = require('./controllers/artists')(allModels);

  app.get('/', artistsControllerCallbacks.index);
  app.get('/artists/', artistsControllerCallbacks.artists);
  app.get('/artists/new',artistsControllerCallbacks.newArtist);
  app.post('/artists',artistsControllerCallbacks.postArtist);
  app.get('/artists/:id',artistsControllerCallbacks.idArtist);
  app.get('/artists/:id/edit',artistsControllerCallbacks.editArtist);
  app.put('/artists/:id',artistsControllerCallbacks.updateArtist);
  app.delete('/artists/:id',artistsControllerCallbacks.delArtist);
  app.get('/artists/:id/songs',artistsControllerCallbacks.allSongsArtist);

  const songsControllerCallbacks = require('./controllers/songs')(allModels);

  app.get('/songs/',songsControllerCallbacks.songs);
  app.get('/songs/new',songsControllerCallbacks.newSong);
  app.post('/songs',songsControllerCallbacks.postSong);
  app.get('/songs/:id',songsControllerCallbacks.idSong);
  app.get('/songs/:id/edit',songsControllerCallbacks.editSong);
  app.put('/songs/:id',songsControllerCallbacks.updateSong);
  app.delete('/songs/:id',songsControllerCallbacks.delSong);



  const playlistControllerCallbacks = require('./controllers/playlist')(allModels);

  app.get('/playlist',playlistControllerCallbacks.listPlayList)
  app.get('/playlist/new', playlistControllerCallbacks.newPlayList);
  app.post('/playlist', playlistControllerCallbacks.createPlayList);
  app.get('/playlist/:id/newsong', playlistControllerCallbacks.addSongToPlayList)
  app.get('/playlist/:id',playlistControllerCallbacks.listPlayListSongs)
  app.post('/playlist/:id',playlistControllerCallbacks.addedSongToPlayList)

};