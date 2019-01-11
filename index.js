/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const methodOverride = require('method-override');

/*-----------Postgres-----------*/
const pg = require('pg');
const configs = {
  user: 'the574life',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/*-----------Express-----------*/
// Init express app
const express = require('express');

const app = express();


// this line sets css files path
app.use(express.static(__dirname+'/public/'));
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
  res.render('home');
});


app.get('/new', (request, res) => {
  res.render('new');
});


// The Index Feature
app.get('/artists/', (req, res) => {
    let queryString = `SELECT * FROM artists`;

    pool.query(queryString, (err, queryResult) => {
        let artists = {};
        artists.list = [];
        for(let i = 0; i < queryResult.rows.length; i++){
            artists.list.push(queryResult.rows[i]);
        }
        // console.log(artists.listing);
        res.render('artistPage', artists);
    })
})


// The Create Feature
app.get('/artists/new', (req, res) => {
        res.render('newArtist');
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