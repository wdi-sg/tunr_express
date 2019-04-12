console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const cookieParser = require('cookie-parser');
const SALT = 'hola';
const sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
  user: 'yuiterai',
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

app.use(cookieParser());

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



app.get('/', (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  console.log(request.cookies)
  if (request.cookies.loggedIn){
  response.render('home');

}else{
    response.send('you are not logged in')
}
  });




//Show a list of all artists name
app.get('/artists/', (request, response) => {

    const queryString = 'SELECT * FROM artists'

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            const data = {artists: result.rows};

            response.render('selectartist', data);
          }

  });
});



//Create a new artist in the database
app.get('/artists/new', (request, response) => {
    response.render('add');
});

app.get('/artists/:id/songs/new', (request, response) => {

    const userInput = parseInt(request.params.id);
    const data = {artistId: userInput};


    response.render('newsong', data);
});



app.post('/artists/:id/songs', (request, response) => {

    let queryText = 'INSERT INTO songs(title, album, preview_link, artwork, artist_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
    let values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.params.id];

    pool.query(queryText, values, (err, result) => {

        if (err) {
            console.error('query error:', err);
            response.send('LINE 101 query error');
          } else {
            response.send(result);
          }
    });

});
//==================================================================================
//In order to see the new data =>
//Use psql / RETURNING * + response.send(result) / with app.get(/artists/:id/songs)
//====================================================================================



//Displays a list of songs for the selected artist
app.get('/artists/:id/songs', (request, response) => {
    const queryString = 'SELECT * from songs WHERE artist_id=' + request.params.id;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err);
            response.send('LINE 125 query error');
          } else {
            const userInput = parseInt(request.params.id);

            const artistId = result.rows[0].artist_id;

            const data = {songs: result.rows};
            response.render('displaysongs', data);
          }

    });

});



//Will show the selected artist info
app.get('/artists/:id', (request, response) => {
    const queryString = 'SELECT * from artists WHERE id=' + request.params.id;
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    // console.log("SQL query: ", queryString);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err);
            response.send( 'LINE 98 query error' );
          } else {
            const userInput = parseInt(request.params.id);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            // console.log("HEY userInput is here: ", userInput);
            // console.log(result.rows);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            const artistId = result.rows[0].id;
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            // console.log("HEY artistID is:", artistId);
//!!!!!!!!!!!!!DO console.log!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
            const data = { artist: result.rows };
            response.render('showartist', data );
          }
     });
});



//Send a request to create a new playlist
app.get('/playlist/new', (request, response) => {
    response.render('newplaylist');
});


//List all the playlists
app.get('/playlist', (request, response) => {

    const queryString = 'SELECT * from playlist';
    console.log("im all playlist" + queryString);

    pool.query(queryString, (err, result) => {
        if (!err) {
            const data = {playlists: result.rows};
            response.render('showPlayList', data);
          } else {
            console.error('query error:', err);
            response.send('LINE 203 query error');
          }
    });
});




//create a new playlist
app.post('/playlist', (request, response) => {
    let queryText = 'INSERT INTO playlist(name) VALUES($1) RETURNING *';
    let values = [request.body.name];

    pool.query(queryText, values, (err, result) => {

        if (!err) {
            response.send(result);

          } else {
            console.error('query error:', err);
            response.send('LINE 187 query error');
          }
    });
});



//==========================================
//
//          DONE
//
//==========================================



//Send a request to create a resister form
app.get('/register', (request, response) => {
    response.render('register');
});



app.post('/register', (request, response) => {
    let queryText = 'INSERT INTO users (name, password) VALUES ($1, $2)';
    let hash = sha256(request.body.password + SALT);
    const values = [request.body.name, hash];
    pool.query(queryText, values, (err, result) => {
        if (!err) {
            const user = request.body;
            response.cookie('username', user.name);
            response.cookie('loggedIn', hash);
            response.send('worked');
          } else {
            console.error('query error:', err);
            response.send('LINE 241 query error');
          }
    });
});


app.get('/login', (request, response) => {
  response.render('login');
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