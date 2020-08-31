const { playlists } = require('./db');

module.exports = (app, allModels) => {
    // ALL ROUTES

    const artistsControllerCallback = require('./controllers/artists_controller')(allModels);

    app.get('/', artistsControllerCallback.homepage);
    app.get('/artists', artistsControllerCallback.allArtists);
    app.get('/artist/new', artistsControllerCallback.newArtist);
    app.post('/artists', artistsControllerCallback.createNewArtist);
    app.get('/artists/:id', artistsControllerCallback.getArtist);
    app.delete('/artists/:id', artistsControllerCallback.deleteArtist);
    app.get('/artists/:id/edit', artistsControllerCallback.editArtist);
    app.put('/artists/:id', artistsControllerCallback.editedArtist);
    app.get('/artists/:id/songs', artistsControllerCallback.artistSongs);
    
    const songsControllerCallback = require('./controllers/songs_controller')(allModels);
   
    app.get('/songs', songsControllerCallback.allSongs);
    app.get('/song/new', songsControllerCallback.newSong);
    app.post('/songs', songsControllerCallback.createNewSong);
    app.get('/songs/:id', songsControllerCallback.getSong);
    app.delete('/songs/:id', songsControllerCallback.deleteSong);
    app.get('/songs/:id/edit', songsControllerCallback.editSong);
    app.put('/songs/:id', songsControllerCallback.editedSong);

    const playlistsControllerCallback = require('./controllers/playlists_controller')(allModels);
    
    app.get('/playlists', playlistsControllerCallback.allPlaylists);
    app.get('/playlist/new', playlistsControllerCallback.newPlaylist);
    app.post('/playlists', playlistsControllerCallback.createNewPlaylist);
    app.get('/playlists/:id', playlistsControllerCallback.getPlaylist);
    app.get('/playlists/:id/edit', playlistsControllerCallback.editPlaylist);
    app.put('/playlists/:id', playlistsControllerCallback.editedPlaylist);
    app.delete('/playlists/:id', playlistsControllerCallback.deletePlaylist);
    app.post('/playlists/:id', playlistsControllerCallback.addSongToPlaylist);
};