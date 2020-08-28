module.exports = (app, allModels) => {

    const controllerCallbacks = require('./controllers/tunr')(allModels)

    //list all artists
    app.get('/artists/', controllerCallbacks.allArtists);

    //renders form for new artist creation
    app.get('/artists/new', controllerCallbacks.newArtistForm);

    //create new artist
    app.post('/artists', controllerCallbacks.createNewArtist);

    //artist page
    app.get('/artists/:id', controllerCallbacks.artistPage);

    //render edit artist form
    app.get('/artists/:id/edit', controllerCallbacks.editArtistPage);

    //update artist with new information
    app.put('/artists/:id', controllerCallbacks.editArtist);

    //delete artist
    app.delete('/artists/:id', controllerCallbacks.deleteArtist);

    //select songs from artist, render on page
    app.get('/artists/:id/songs', controllerCallbacks.artistSongPage)

    //render form to make new song for artist
    app.get('/artists/:id/songs/new', controllerCallbacks.newSongByArtist)

    //display all songs
    app.get('/songs/', controllerCallbacks.allSongs);

    //render form for new songs
    app.get('/songs/new', controllerCallbacks.newSongForm);

    //query to create new song
    app.post('/songs', controllerCallbacks.createNewSong);

    //render single song page
    app.get('/songs/:id', controllerCallbacks.songPage);

    //render edit songs page
    app.get('/songs/:id/edit', controllerCallbacks.editSongPage);

    //update song data
    app.put('/songs/:id', controllerCallbacks.editSong);

    app.delete('/songs/:id', controllerCallbacks.deleteSong);
}