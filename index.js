console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
  password: 'pg'
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




/**
 * ===================================
 * Routes
 * ===================================
 */

//INDEX ,SHOW ALL ARTISTS
app.get('/', (req, res) => {
    let text = "SELECT * FROM artists";
    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            res.send( result.rows );
        }
    });
});

//SHOW AN ARTIST
app.get('/:artist', (req, res) => {
    let text = `SELECT * FROM artists WHERE name='${req.params.artist}'`;
    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            res.send( result.rows );
        }
    });

});

//CREATE NEW ARTIST
app.post('/', (req, res) => {
});

//UPDATE AN ARTIST
app.put('/:artist', (req, res) => {

});

//DELETE AN ARTIST
app.delete('/:artist', (req, res) => {

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