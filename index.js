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


// =============================
// links to pages
// =============================
const homepage = 'home.jsx';
const artistpage = 'artist.jsx';
const newpage = 'new.jsx';
const editpage = 'edit.jsx';



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
    response.redirect('/artist');
});



// ===================================
// Display index of artists
// ===================================

app.get('/artist', (request, response) => {
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

            response.render(homepage, data);
        }
    });
});



// ===================================
// Show individual Artist
// ===================================
app.get('/artist/:id', (request, response) => {

    let artistId = parseInt(request.params.id);

    const queryString = `SELECT * FROM Artists WHERE id=$1`;
    let values = [artistId];

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {

            let data = {
                artists: result.rows[0]
            };

            response.render(artistpage, data);
        }
    });
});



// ===================================
// Display a New Artist Form
// ===================================
app.get('/new', (request, response) => {
    response.render(newpage);
});


/* =========================================
// Add new artist to database
==========================================*/
app.post('/artist', (request, response) => {

    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`;
    let values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log('query error:', err.stack);
            console.log(err);
        } else {

            let data = {
                artist: result.rows[0]
            };

            console.log("send response");
            response.render(artistpage, data);
        }
    }); ////// end of writing to database //////
});



/* ===========================================
// Display the form for editing a single artist
===============================================*/
app.get('/artist/:id/edit', (req, res) => {

    const queryString = 'SELECT * from artists WHERE id=' + parseInt(req.params.id);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                artists: result.rows[0]
            };
            res.render(editpage, data);
        }
    });
});


// ===========================================
// Update a single artist
// ===============================================*/
app.put('/artist/:id', (request, response) => {

    let index = parseInt(request.params.id);

    const queryString = `UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4`;
    let values = [request.body.name, request.body.photo_url, request.body.nationality, index];

    pool.query(queryString, values, (err, result) => {
        if( err ){
            console.log("error query");
            console.log(err)
        } else {
            console.log("sending response ... ");
            response.send("Artist " + request.body.name  +  " updated!");
        }
    });
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