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

app.get('/', (request, response) => {
  // respond with HTML page displaying all pokemon
  response.render('home');
});

app.get('/artists', (request, response) => {
  // query database for all artists
  const queryString = 'select * from artists'

  pool.query(queryString, (err, result) => {
    if(err) {
        console.error('query error: ', err.stack);
        response.send('query error');
    }
    else{
        const data = {"result" : result.rows};
        response.render('allartists', data);
    }
  })
});


/*
====================
Creating a new Artist
=======================
*/

app.get('/artists/new', (request, response) => {

    response.render('newartist');
})

app.post('/artists', (request, response) => {
    // query database for all artists
    let queryString = 'insert into artists (name, photo_url, nationality) values ($1, $2, $3) returning id';

    const artist = request.body;

    const values = [artist.name, artist.photo_url, artist.nationality];

    pool.query(queryString, values, (err, result) => {
        if(err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            response.send(result.rows);
        }
    })

})

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