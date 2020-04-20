console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'kokchuantan',
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
const addArtist = (request, response) => {
  userEntry = request.body;
  name = userEntry.name;
  url = userEntry.photo_url;
  nationality = userEntry.nationality;
  const queryString = 'insert into artists (name,photo_url,nationality) values ($1,$2,$3) returning id'
  let values = [name, url, nationality]
  pool.query(queryString, values, (err, result) => {

      if (err) {
          console.error('query error:', err.stack);
          response.send('query error');
      } else {
          // console.log('query result:', result);
          console.log(result.rows[0].id)
          link = '/artists/' + result.rows[0].id;
          response.redirect(link);
      }
  });
}

const addPlaylist = (request, response) => {
  userEntry = request.body;
  name = userEntry.name;
  const queryString = 'insert into playlist (name) values ($1) returning id'
  let values = [name]
  pool.query(queryString, values, (err, result) => {

      if (err) {
          console.error('query error:', err.stack);
          response.send('query error');
      } else {
          // console.log('query result:', result);
          console.log(result.rows[0].id)
          link = '/playlist/' + result.rows[0].id;
          response.redirect(link);
      }
  });
}

app.get('/artists', (request, response) => {
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log(queryError, 'error');
      response.status(500);
      response.send('error');
    }else{
      const data = {
         artists : result.rows
      };
      response.render('home', data); 
    }
  };

  const queryString = "SELECT * FROM artists";

  pool.query(queryString, whenQueryDone )
});

app.get('/playlist', (request, response) => {
  const whenQueryDone = (queryError, result) => {
    if( queryError ){
      console.log(queryError, 'error');
      response.status(500);
      response.send('error');
    }else{
      const data = {
         playlists : result.rows
      };
      response.render('playlist', data); 
    }
  };

  const queryString = "SELECT * FROM playlists";

  pool.query(queryString, whenQueryDone )
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.get('/playlist/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('newplaylist');
});

app.get('/artists/:id', (request, response) => {
  let userInput = request.params.id;
  const queryString = 'SELECT * from artists where id = ($1)'
  values = [userInput]
  pool.query(queryString, values, (err, result) => {

      if (err) {
          console.error('query error:', err.stack);
          response.send('query error');
      } else {
        data = {
          artist : result.rows
        }
        console.log(data)
          // console.log('query result:', result.rows);
          response.render('artist',data);
      }
  });
});

app.get('/playlist/:id', (request, response) => {
  let userInput = request.params.id;
  const queryString = 'SELECT songs.title FROM songs INNER JOIN playlist ON (songs) =  WHERE ;'
  values = [userInput]
  pool.query(queryString, values, (err, result) => {

      if (err) {
          console.error('query error:', err.stack);
          response.send('query error');
      } else {
        data = {
          playlist : result.rows
        }
        console.log(data)
          // console.log('query result:', result.rows);
          response.render('playlist',data);
      }
  });
});

app.get('/playlist/:id/newsong', (request, response) => {
  let userInput = request.params.id;
  const queryString = 'SELECT name from playlist where id = ($1)'
  values = [userInput]
  pool.query(queryString, values, (err, result) => {

      if (err) {
          console.error('query error:', err.stack);
          response.send('query error');
      } else {
        data = {
          playlist : result.rows
        }
        const query = 'SELECT * from songs'
        pool.query(query, data, (err, result) => {

          if (err) {
              console.error('query error:', err.stack);
              response.send('query error');
          } else {
            allSongs = {
              songs : result.rows
            }
              response.render('addsongs',allSongs,data);
          }
      });
      }
  });
});

app.get('/artists/:id/songs', (request, response) => {
  let userInput = request.params.id;
  const queryString = 'SELECT * from artists where id = ($1)'
  values = [userInput]
  pool.query(queryString, values, (err, artistResult) => {

      if (err) {
          console.error('query error:', err.stack);
          response.send('query error');
      } else {
        let selectedArtist = artistResult.rows[0].id
        const query = 'select * from songs where artist_id = $1'
        value = [selectedArtist]
        pool.query(query, value, (err, result) => {
          if (err) {
              console.error('query error:', err.stack);
              response.send('query error');
          } else {
            data = {
              artist : artistResult.rows[0].name,
              song : result.rows
            }
              // console.log('query result:', result.rows);
              response.render('songs',data);
              
          }
      });
      }
  });
});

app.post('/artists',addArtist)

app.post('/playlist',addPlaylist)

app.post('/playlist/newsong',addPlaylist)

app.get('/', (request, response) => {
  response.redirect('/artists');
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
