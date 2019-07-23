console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'fishie',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

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
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);



// links to pages
const homepage = 'home.jsx';
const artistpage = 'artist.jsx';



/**
 * ===================================
 * Routes
 * ===================================
 */


// ===================================
// Display index of artists
// ===================================

app.get('/', (request, response) => {
    // redirect to home page
    response.redirect('/artists');
});



// ===================================
// Display index of artists
// ===================================

app.get('/artists', (request, response) => {
    const queryString = `SELECT * FROM Artists`;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', result);

            let data = {
                artists: result.rows
            };
            response.render('home', data);
        }
    });
});



// ===================================
// Show individual Artist
// ===================================
app.get('/artists/:id', (request, response) => {

    let artistId = request.params.id;

    const queryString = `SELECT * FROM Artists WHERE id=$1`;
    let values = [artistId];

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {

            let data = {
                artists: result.rows
            };

            response.render('home', data);
        }
    });
});



app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){
    console.log("closing");
    server.close(() => {
        console.log('Process terminated');
        pool.end( () => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);