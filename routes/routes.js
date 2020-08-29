module.exports = (app, allControls) => {
    // define routes in here
    // app.get('/students/new', allControls.form)
    app.get('/students', allControls.read);
}