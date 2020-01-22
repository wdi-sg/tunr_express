console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const reactEngine = require('express-react-views').createEngine();

// Initialise postgres client
const configs = {
  user: 'rachelle',
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

app.use(methodOverride('_method'));
app.engine('jsx', reactEngine);

// Set react-views to be the default view engine

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/artists', (request, response) => {
  // query database for all pokemon
  const queryString = 'SELECT * from artists'
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      console.log('query result:', result);
      let data = {
          artists: result.rows
      }
      response.render('home', data);
    }
  });
  // respond with HTML page displaying all pokemon
  //response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artists', (request,response) => {
  let insertQueryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';

  const values = [
    request.body.name,
    request.body.url,
    request.body.nationality
  ];

  pool.query(insertQueryText, values, (err, result) => {
    if (err) {
      //console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      //console.log('query result:', result);
      // redirect to home page
      // response.send( result.rows );
      let allArtistsName = [];
      let listOfArtists = result.rows;
      console.log(result.rows)
      for (i = 0; i < listOfArtists.length; i++) {
          let currentArtistName = listOfArtists[i].name;
          allArtistsName.push(currentArtistName);
          // console.log(currentArtist);
          // console.log(currentArtistName);
      }
      let data = {
          artists: allArtistsName,
      }
      response.render('home', data);
      //console.log(data)
    }
  });
});

app.get('/artists/:id', (request,response) => {
  const queryString = 'SELECT * from artists WHERE id=$1;'
  const values = [request.params.id];
  pool.query(queryString, values, (err,result) => {
    let currentArtist = result.rows[0];
    let artistId = result.rows[0].id;
    let songsQuery = "SELECT * FROM songs WHERE artist_id="+artistId;
    pool.query(songsQuery, (songsErr, songsResult) => {
      let songs = [];
      for (var i = 0; i < songsResult.rows.length; i++) {
        let songName = songsResult.rows[i].title;
        songs = songs + "," + songName;
      }
      //console.log(songs);
    });
    console.log(currentArtist)
    let data = {
        artists: currentArtist
    }
    response.render('single', data);
  });
});

app.get('/artists/:id/edit', (request,response) => {
  const queryString = 'SELECT * from artists WHERE id=$1;'
  const values = [request.params.id];
  pool.query(queryString, values, (err,result) => {
    let currentArtist = result.rows[0];
    console.log(currentArtist)
    let data = {
        artists: currentArtist
    }
    response.render('edit', data);
  });
});

app.put('/artists/:id', (request,response) => {
  const queryString = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3, WHERE id=$1;'
  const values = [
    request.params.id,
    request.body.name,
    request.body.url,
    request.body.nationality
  ];
  pool.query(queryString, values, (err,result) => {
    let currentArtist = result.rows[0];
    console.log(currentArtist)
    let data = {
        artists: currentArtist
    }
    response.render('single', data);
  });
});

app.delete('/artists/:id', (request, response) => {
  const queryString = 'DELETE from artists WHERE id=$1;'
  const values = [request.params.id];

  pool.query(queryString, values, (err,result) => {
    let currentArtist = result.rows[0];
    console.log(currentArtist)
    let data = {
        artists: currentArtist
    }
    response.render('home', data);
  });
});

app.get('/', (request,response) => {
  response.send("Hello World");
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
