// create control logic to decide on
// appropriate model and view to use
// depending on a specific crud operation

// create callback function which the route uses
module.exports = (allModels) => {
    /*
    createControlCallback will be used by app HTTP method
    request, response will be provided by app
    first step is to get the model/queries wrapped in db.js
    allModels.create() equals pool.query(query, callback)

    defined in model/queries the query text is provided
    we might need to pass data from the user input
    to the model to manipulate it
    we only have to pass in a callback and to render the view
    */

    // control logic for create operation
    // and invoked as a callback in route
    let createSingleControlCallback = (req, res) => {
        let userInput = req.body;
        allModels.song.createSingle(userInput, (err, result) => {
            if (err) {
                console.log(err, '-- create');
                res.status(500).send('Bad user');
            } else {
                let id = result[0].id;
                res.redirect(303, `/songs/${id}`)
            }
        })
    }

    let readControlCallback = (req, res) => {
        allModels.song.read((err, result) => {
            if (err) {
                console.log(err, '-- read');
                res.status(500).send('Bad user');
            } else {
                res.render('song/index', { result })
            }
        })
    }

    let readSingleControlCallback = (req, res) => {
        let id = req.params.id;
        allModels.song.readSingle(id, (err, result) => {
            if (err) {
                console.log(err, '-- readSingle');
                res.status(500).send('Bad user');
            } else {
                res.render('song/show', { ...result[0] })
            }
        })
    }

    let editSingleControlCallback = (req, res) => {
        let id = req.params.id;
        allModels.song.readSingle(id, (err, result) => {
            if (err) {
                console.log(err, '-- editSingle');
                res.status(500).send('Bad user');
            } else {
                res.render('song/edit', { ...result[0] })
            }
        })
    }

    let updateSingleControlCallback = (req, res) => {
        let values = [req.body.name,
            req.body.photo_url,
            req.body.nationality,
            req.params.id,
        ]
        allModels.song.updateSingle(values, (err, result) => {
            if (err) {
                console.log(err, '-- updateSingle');
                res.status(500).send('Server error...')
            } else {
                res.redirect(303, `/songs/${req.params.id}`)
            }
        })
    }

    let destroySingleControlCallback = (req, res) => {
        let id = req.params.id;
        allModels.song.destroySingle(id, (err, result) => {
            if (err) {
                console.log(err, '-- destroySingle');
                res.status(500).send('Server error')
            } else {
                res.redirect(301, '/songs/');
            }
        })
    }

    let newFormControlCallback = (req, res) => {
        res.render('song/new');
    }

    let redirectHomeControlCallback = (req, res) => {
        res.redirect(301, '/songs/');
    }

    return {
        createSingle: createSingleControlCallback,
        read: readControlCallback,
        readSingle: readSingleControlCallback,
        editSingle: editSingleControlCallback,
        updateSingle: updateSingleControlCallback,
        destroySingle: destroySingleControlCallback,
        newForm: newFormControlCallback,
        redirectHome: redirectHomeControlCallback,
    }
}