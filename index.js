console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'ishak',
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

//Display all Artists
app.get('/artists/', (request, response) => {
  // query database for All Artists
  const queryText = `SELECT * FROM artists`;
  pool.query(queryText, (err, queryResult)=>{
    console.log("Error occured " + err);
    response.render('home', {artists:queryResult.rows});
  });
  // respond with HTML page displaying all Artists

});

//Show individual Artist
app.get('/artists/:id', (request, response) => {
  // respond with HTML page show individual Artists
    let artistId = request.params.id;                                               //get the input of :id
    const queryTextSongs = `SELECT * FROM songs where artist_id= ${artistId}`;      //query from SONGS where artis_id is input of :id
    const queryTextArtists = `SELECT * FROM artists where id= ${artistId}`;         //query from Artist where id is input of :id

    pool.query(queryTextArtists, (err, queryArtistsResult)=>{

        pool.query(queryTextSongs, (err, querySongsResult)=>{
            const result = {
                artist: queryArtistsResult.rows,
                songs:  querySongsResult.rows
            }
            console.log("Error occured " + err);
            response.render('show-each-artist', {artist:result.artist, songs:result.songs});
        });
    });
});



app.get('/new', (request, response) => {
  // respond with HTML page with form to create new Artist
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