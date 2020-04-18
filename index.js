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

// Show all artists
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

// Show single artist
app.get('/artists/:id', (request, response) => {
    // Get ID of artist
    const id = request.params.id;

    const queryString = `select * from artists where id=${id}`

    pool.query(queryString, (err, result) => {
    if(err) {
        console.error('query error: ', err.stack);
        response.send('query error');
    }
    else{

        const data = {"result" : result.rows};
        response.render('singleartist', data);
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
    let queryString = 'insert into artists (name, photo_url, nationality) values ($1, $2, $3) returning *';

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



/***************
================
================
================
Playlist Part
================
================
================

***************/

////////////Show All playlists
app.get('/playlist', (request,response) => {
    let queryString = `select * from playlist`

    pool.query(queryString, (err, result) => {
        if(err){
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            const data = {"result" : result.rows};
            response.render('allplaylists', data);
        }
    })
})


////////////
//////////// Creating new Playlist
app.get('/playlist/new', (request, response) => {
    response.render('newplaylist');
})

app.post('/playlists/show', (request, response) => {
    const artistName = request.body.playlist;

    let queryString = 'insert into playlist (playlist_name) values ($1) returning *'

    const values = [artistName];

    pool.query(queryString, values, (err, result) => {
        if(err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            const data = result.rows;
            response.send(result.rows);
        }
    })
})


//////////////Create new song for playlist
app.get('/playlist/:id/newsong', (request, response) => {
    const id = request.params.id;

    // Identify playlist that is requested
    const queryString = `select * from playlist where id=${id}`

    pool.query(queryString, (err, result) => {
        if(err){
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            const data = {"playlistDetails" : result.rows};
            response.render('newsong', data);
        }
    })
})

//////////////Show individual playlist
app.get('/playlist/:id', (request, response) => {
    const id = request.params.id;

    // Identify playlist that is requested
    const queryString = `select * from playlist where id=${id}`

    pool.query(queryString, (err, result) => {
        if(err){
            console.error('query error: ', err.stack);
            response.send('query error');
        }
        else{
            const data = {"playlistDetails" : result.rows};
            response.render('singleplaylist', data);
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