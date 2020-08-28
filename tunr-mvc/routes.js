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


const songsControllerCallbacks = require('./controllers/songs')(allModels);

app.get('/songs/',songsControllerCallbacks.songsList);
app.get('/songs/new',songsControllerCallbacks.newSong);
app.post('/songs',songsControllerCallbacks.createSong);
app.get('/songs/:id',songsControllerCallbacks.individualSong);
app.get('/songs/:id/edit',songsControllerCallbacks.editSong);
app.put('/songs/:id',songsControllerCallbacks.updateSong);
app.get('/songs/:id/delete',songsControllerCallbacks.deleteSong);
app.delete('/songs/:id',songsControllerCallbacks.songDeleted);





  //app.get('/pokemons/:id', pokemons.getPokemon);
};

