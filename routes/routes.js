module.exports = (app, allControls) => {

    // define routes in here

    // redirect the default to home page
    app.get('/', allControls.redirectHome);

    // see all the artists
    app.get('/artists/', allControls.read);

    // display the form for a single artist
    app.get('/artists/new', allControls.newForm);

    // create a new artist
    app.post('/artists', allControls.createSingle);

    // see a single artist
    app.get('/artists/:id', allControls.readSingle);

    // display form for editing a single artist
    app.get('/artists/:id/edit', allControls.editSingle);
}