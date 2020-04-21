console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require("cookie-parser");

// Initialise postgres client
const configs = {
  user: 'marcustan',
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
app.use(cookieParser());

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {

  // query database for all pokemon

    let visits = request.cookies["visits"];
    if (visits === undefined){
      visits = 1;
    } else {
      visits++;
    }
    response.cookie(`visits`, visits)

    const data = {
      count : visits
    }

  // respond with HTML page displaying all pokemon
  response.render('home', data);
});

// Show all artists 

//

app.get('/artists/', (request, response) => {
  // query database for all artists
  pool.query('SELECT * FROM artists', (error, result) => {
    if (error) {
      console.log('query error');
    } else {
   
      const artists = result.rows;
      // respond with HTML page displaying all artist
      response.render('artists', {"artists": artists});
    }
  })
});


// Form for a single artist 

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artist

  let visits = request.cookies["visits"];
  if (visits === undefined){
    visits = 1;
  } else {
    visits++;
  }
  response.cookie(`visits`, visits)

  const data = {
    count : visits
  }
  response.render('new', data);
});

// Create a new artist

app.post('/artists', (request, response) => {
  const name = request.body.name;
  const photo_url = request.body.photo_url;
  const nationality = request.body.nationality;

  const values = [name, photo_url, nationality];

  const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

  pool.query(queryString, values, (error, result) => {
    if (error) {
      console.log('query error');
    } else {
      response.render('success');
    }
  });
})

// See a single artist 

app.get('/artists/:id', (request, response) => {
  const artistId = request.params.id;

  pool.query('SELECT * FROM artists WHERE id=$1', [artistId], (error, result) => {
    if (error) {
      console.log('query error');
    } else {
      let visits = request.cookies["visits"];
      if (visits === undefined){
        visits = 1;
      } else {
        visits++;
      }
      response.cookie(`visits`, visits)
  
      const data = {
        count : visits,
        artist : result.rows[0]
      }
  
      response.render('single', data);
    }
  });
});

/**
 * ===================================
 * Part 2 Playlists Stuff
 * ===================================
 */

app.get('/playlists/', (request, response) => {
  response.render('playlists');
});

app.get('/playlists/new', (request, response) => {
  pool.query('SELECT * FROM songs', (error, result) => {
    if (error) {
      console.log('query error');
    } else {
      const songList = result.rows;
      response.render('new_playlist', {"songList": songList});
    }
  })
})

app.post('/playlists', (request, response) => {
  const name = request.body.name;
  const songs = request.body.songs;

  pool.query('INSERT INTO playlist (name) VALUES ($1) RETURNING id', [name], (error, result) => {
    if (error) {
      console.log('playlist insery error');
    } else {
      const playlist_id = result.rows[0].id;

      pool.query('SELECT id, title FROM songs', (error, result) => {
        if (error) {
          console.log('query error');
        } else {
          const songList = result.rows;

          const songId = songs.map(song => {
            for (let i = 0; i < songList.length; i++) {
              if (songList[i].title === song) {
                return songList[i].id;
              }
            }
          })

          songId.forEach(songId => {
            pool.query('INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2)', [songId, playlist_id], (error, result) => {
              if (error) {
                console.log('error inserting');
              } else {
                console.log('done!');
              }
            })
          })

          response.render('success');
        }
      })
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
