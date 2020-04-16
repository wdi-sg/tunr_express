console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
const path = require('path');

app.set('views', path.join(__dirname, '..', '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

const artistsRoutes = require('./artists-routes.js');

const errorController = require('../controllers/404-controller.js');

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/', (req, res) => {
    // query database for all pokemon

    // respond with HTML page displaying all pokemon
    res.send('home');
});

app.use('/artists', artistsRoutes);

app.use(errorController.get404Page);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

const db = require('../util/database.js');

let onClose = function() {

    console.log("\nclosing");

    server.close(() => {

        console.log('Process terminated');

        db.poolEnd();
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);