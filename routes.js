module.exports = (app, allModels) => {

//requires artist controller
const artistController = require('./controllers/artists.js')(allModels);
const songsController = require('./controllers/songs')(allModels);

//artists routes
    app.get('/', artistController.helloWorld);
    app.get('/artists/', artistController.allArtists);
    app.get('/artists/new', artistController.newArtistForm);
    app.get('/artists/delete', artistController.deleteArtistForm);
    app.post('/artists', artistController.addNewArtist);
    app.get('/artists/:id', artistController.viewSingleArtist);
    app.get('/artists/:id/edit', artistController.editArtistInfo);
    app.put('/artists/:id', artistController.updateArtistInfo);
    app.delete('/artists/delete/', artistController.deleteArtist);
    app.get('/artists/:id/songs', artistController.showArtistSongs);

//songs routes
    app.get('/songs/', songsController.allSongs);
    app.get('/songs/new', songsController.newSongForm);
    app.get('/songs/delete', songsController.deleteSongForm)
    app.post('/songs', songsController.addNewSong);
    app.get('/songs/:id', songsController.viewSong);
    app.get('/songs/:id/edit', songsController.editSongInfo);
    app.put('/songs/:id', songsController.updateSongInfo);
    app.delete('/songs/delete', songsController.deleteSong);
}