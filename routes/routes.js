module.exports = (app, artistControls, songControls) => {

    // redirect the default to home page
    app.get('/', artistControls.redirectHome);

    // see all the artists
    app.get('/artists/', artistControls.read);

    // display the form for a single artist
    app.get('/artists/new', artistControls.newForm);

    // create a new artist
    app.post('/artists', artistControls.createSingle);

    // see a single artist
    app.get('/artists/:id', artistControls.readSingle);

    // display form for editing a single artist
    app.get('/artists/:id/edit', artistControls.editSingle);

    // update a artist
    app.put('/artists/:id', artistControls.updateSingle);

    // delete a artist
    app.delete('/artists/:id', artistControls.destroySingle);

    // see all the songs
    app.get('/songs/', songControls.read);

    // display the form for a single song
    app.get('/songs/new', songControls.newForm);

    // create a new song
    app.post('/songs', songControls.createSingle);

    // see a single song
    app.get('/songs/:id', songControls.readSingle);

    // display form for editing a single song
    app.get('/songs/:id/edit', songControls.editSingle);

    // update a song
    app.put('/songs/:id', songControls.updateSingle);

    // delete a song
    app.delete('/songs/:id', songControls.destroySingle);
}