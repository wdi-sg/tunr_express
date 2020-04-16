console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'thomasoh',
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
  // query database for all artists

  // respond with HTML page displaying all artists
  response.render('home');
});

app.get('/new', (request, response) => {
  response.render('new');
});

app.get('/artists/:id/songs', (req, res) => {
    //Getting artist data first
    const firstValues = [req.params.id]
    const firstQueryString = "SELECT * FROM artists WHERE id = $1"
    let artistInfo;

    pool.query(firstQueryString, firstValues, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.send('query error');
        } else {
            artistInfo = result.rows[0];
        }
    })




    const secondValues = [req.params.id]
    const secondQueryString = "SELECT title FROM songs WHERE artist_id = $1";

    pool.query(secondQueryString, secondValues, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.send('query error');
        } else {
            const songArray = []
            for (let i = 0; i < result.rows.length; i++){
                songArray.push(result.rows[i].title)
            }
            const data = {songArray, artistInfo}
            res.render('artistWithSongs', data);
        }
    })
})

app.get('/artists/:id', (req, res) => {
    const values = [req.params.id]
    const queryString = "SELECT * FROM artists WHERE id = $1"

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.send('query error');
        } else {
            const data = result.rows[0];
            res.render('artist', data);
        }
    })
})

app.post('/artists', (req, res) => {
    const values = [req.body.name, req.body.photo_url, req.body.nationality];
    const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.send('query error');
        } else {
            res.redirect('/artists/' + result.rows[0].id)
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