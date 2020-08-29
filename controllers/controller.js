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
    let createControlCallback = (req, res) => {
        let userInput = req.body;
        allModels.model.create(userInput, (err, result)=>{
            if (err) {
                console.log(err);
                res.status(500).send('Bad user');
            } else {
                console.log(result);
                res.render('show', {result})
            }
        })
    }

    let readControlCallback = (req, res) => {
        allModels.model.read((err, result)=>{
            if (err) {
                console.log(err);
                res.status(500).send('Bad user');
            } else {
                console.log(result);
                res.render('show', {result})
            }
        })
    }

    let newFormControlCallback = (req, res) => {
        response.render('new')
    }

    return {
        create: createControlCallback,
        read: readControlCallback,
        newForm: newFormControlCallback,
    }
}