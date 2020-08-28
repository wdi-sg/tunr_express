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

  app.get('/artists/:id/songs', artistsControllerCallbacks.artistSongs);
  app.get('/artists/:id', artistsControllerCallbacks.individualArtist);
  // do database query and return the results

    app.post('/artists', artistsControllerCallbacks.createArtist);
  app.get('/artists/', artistsControllerCallbacks.allArtists);
  app.get('/artists/:id/edit', artistsControllerCallbacks.editArtist);
  app.put('/artists/:id', artistsControllerCallbacks.updateArtist);
  app.get('/artists/:id/delete', artistsControllerCallbacks.deleteArtist);
  app.delete('/artists/:id', artistsControllerCallbacks.artistDeleted);



  //app.get('/pokemons/:id', pokemons.getPokemon);
};

