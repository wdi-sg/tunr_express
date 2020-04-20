console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const session = require('express-session');

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

// Set session
app.use(session({
    secret: 'tunr!secret',
    resave: false,
    saveUninitialized: false,
    name: 'sid',
    cookie: {
        maxAge: 86400000,
        sameSite: true
    }
}))


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
const path = require('path');

app.set('views', path.join(__dirname, '..', '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

const artistsRoutes = require('./artists-routes.js');
const playlistsRoutes = require('./playlists-routes.js');
const authRoutes = require('./auth-routes.js');
const errorController = require('../controllers/404-controller.js');

const db = require('../util/database.js');

app.use(express.static(path.join(__dirname, '../public/')));

app.use(authRoutes);

app.get('/', async (req, res) => {

    const queryT = `SELECT * FROM artists WHERE id=3`
    const { rows } = await db.query(queryT);
    res.render('home', { 'singleArtist': rows[0] });
});

app.use('/artists', artistsRoutes);

app.use('/playlists', playlistsRoutes);

app.use(errorController.get404Page);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {

    console.log("\nclosing");

    server.close(() => {

        db.poolEnd();

        console.log('Process terminated');

    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);