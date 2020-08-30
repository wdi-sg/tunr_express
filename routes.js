module.exports = (app, allModels) => {
    // require artist and song controllers
    const artistControllerCallback = require('./controllers/artist')(allModels);

    const songControllerCallback = require('./controllers/song')(allModels);

    const playlistControllerCallback = require('./controllers/playlist')(allModels);

    // all routes for artist controller
    app.get('/', artistControllerCallback.root);

    app.get('/artists/', artistControllerCallback.allArtists);
    app.get('/artists/new', artistControllerCallback.newArtistForm);
    app.post('/artists', artistControllerCallback.newArtist);
    app.get('/artists/:id', artistControllerCallback.showSingleArtist);
    app.get('/artists/:id/edit', artistControllerCallback.getEditArtistForm);
    app.put('/artists/:id', artistControllerCallback.updateEditArtist);
    app.delete('/artists/:id', artistControllerCallback.deleteArtist);
    app.get('/artists/:id/songs', artistControllerCallback.artistSong);

    // all routes for song controller

    app.get('/songs/', songControllerCallback.allSongs);
    app.get('/songs/new', songControllerCallback.newSongForm);
    app.post('/songs', songControllerCallback.newSong);
    app.get('/songs/:id', songControllerCallback.showSingleSong);
    app.get('/songs/:id/edit', songControllerCallback.getEditSongForm);
    app.put('/songs/:id', songControllerCallback.updateEditSong);
    app.delete('/songs/:id', songControllerCallback.deleteSong);

    // all routes for playlist controller

    app.get('/playlist', playlistControllerCallback.allPlaylist);
    app.get('/playlist/new', playlistControllerCallback.newPlaylistForm);
    app.post('/playlist', playlistControllerCallback.newPlaylist);
    app.get('/playlist/:id', playlistControllerCallback.showPlaylistSong);
    app.get('/playlist/:id/newsong', playlistControllerCallback.newEditPlaylistForm);
    app.post('/playlist/:id', playlistControllerCallback.addSongToPlaylist);

};