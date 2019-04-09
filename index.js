console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'shwj',
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

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, res) => {
  // query database for all pokemon
  const queryString = `SELECT * FROM artists`;
    pool.query(queryString,(errobj, result)=>{
        if(errobj === undefined){
            console.log('This where results come to.', result.rows);
            // console.log(result.rows);
            const data = result.rows;

            res.render('home', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
});

app.get('/new', (req, res) => {
  // respond with HTML page with form to create new pokemon
    // response.render('new');
    res.send('hello new');
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

/*
The Index Feature
Build the index feature for artists:
1. Render on DOM to show artist(?)


The Show Feature
Build the show feature for an artist
1. click

The Create Feature
Build a feature that creates a new artist in the database.

The Edit Feature
Build a feature that allows a user to edit an existing artist in the database

The Delete Feature
Build a feature that allows users to delete an existing artist from the database.

*/