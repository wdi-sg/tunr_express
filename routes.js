module.exports = (app, allModels) => {

//requires artist controller
const artistController = require('./controllers/artists.js')(allModels);

    app.get('/', artistController.helloWorld);

    app.get('/artists/', artistController.allArtists);

    app.get('/artists/new', artistController.newArtistForm);

    app.get('/artists/delete', artistController.deleteArtistForm);

    app.post('/artists', artistController.addNewArtist);

    app.get('/artists/:id', artistController.viewSingleArtist);

    app.get('/artists/:id/edit', artistController.editArtistInfo);

    app.put('/artists/:id', artistController.updateArtistInfo);

    app.delete('/artists/delete/', artistController.deleteArtist);


app.get('/artists/:id/songs', (req, res) => {
    allModels
        .query(`SELECT * FROM songs WHERE artist_id = ${req.params.id};`)
        .then(result => res.send(result.rows))
        .catch(err => console.log("error", err.stack))
    })

}