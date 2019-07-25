console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'janetle',
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

app.use(express.static(__dirname+ '/public/'));

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


app.get('/', (request, response) => {//worked!
  console.log("getting request")
  const queryString = 'SELECT * FROM artists ';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      console.log('query result:', result);
      const artists = {
        artists : result.rows,
      }

      // response.send( result.rows );
    response.render('home', artists);
    };
  });
});

//==============add new artist====================

app.get('/new', (request, response) => { //worked
 
  response.render('newArtist');
});

app.post('/',(req, res) => {
  console.log("new artist")
    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2, $3) ';
          value = [req.body.name, req.body.photo_url, req.body.nationality];
    pool.query(queryString,value, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } 
          
          res.send("New artist added");
      });
    });




// app.get('/artist/:id/songs', (req, res) => {//worked!
//   console.log("getting request")
//   console.log(req.params.id);
//   let reqid = parseInt(req.params.id);
//   // console.log(id);

//   const queryString = 'SELECT title, album FROM songs  WHERE artist_id = 3';
//   // console.log(result);
//   pool.query(queryString, (err, result) => {
//       console.log(result.rows);
//     if (err) {
//       console.error('query error:', err.stack);
//       res.send( 'query error' );
//     } else {
      
      
//       res.send( result.rows);
    
//     };
//   });
// });

//===============single Artist===============

app.get('/artist/:id', (req, res) => {//worked!
  console.log("getting request")

  let id = parseInt(req.params.id);
  const queryString = 'SELECT * FROM artists  WHERE id = id';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send( 'query error' );
    } else {
      console.log('query result:', result);
      const data = {
            data: result.rows[id-1],
      }
      
      res.render( 'singleArtist',data);
    
    };
  });
});

//=================================================

app.get('/artist/:id/songs/new', (req, res) => {//worked!
 
  let reqid = parseInt(req.params.id);
  
  res.render('form');
    
    });
app.post('/artist/:id/songs',(req, res) => {
    console.log("new artist")
    const queryString = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1,$2, $3,$4, $5) ';
          value = [req.body.title,req.body. album, req.body.preview_link, req.body.artwork, req.body.artist_id];
    pool.query(queryString,value, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        res.send( 'query error' );
      } 
          
        res.send("New song added");
    });
});

 //================get playlists ===================


app.get('/playlists', (req, res) => {
  console.log("getting request")

  const queryString = 'SELECT * FROM playlists'  ;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send( 'query error' );
    } else {
      console.log('query result:', result);
      
      res.send( result.rows);
    
    };
  });
});

///================add song to playlist===============

app.get('/playlists/new', (req, res) => {//worked!

  res.render('playlistsForm');
    
    });
app.post('/playlists',(req, res) => {
    console.log("new playlist")
    const queryString = 'INSERT INTO playlists (name) VALUES ($1)';
    value = [req.body.name]
    pool.query(queryString,value, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        res.send( 'query error' );
      } 
          
        res.send("New playlist added");
    });
});
//=================show song in a playlist =============

app.get('/playlists/:id', (req, res) => {
  console.log("getting request")
  let id = req.params.id;
  console.log(id);

  const queryString = 'SELECT * FROM playlists WHERE id = id'  ;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send( 'query error' );
    } else {
      console.log('query result:', result);
      
      res.send( result.rows);
    
    };
  });
});

//==========add dropdown of artists when creating new song========


app.get('/songs/new', (req, res) => {//good
  console.log("dropdown");
  const queryString = 'SELECT id,name FROM artists';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send( 'query error' );
    } else {
      console.log('query result:', result.rows);
      const data = {
            data: result.rows,
      }
      
      res.render( 'newSong',data);
    
    };
  });
});
//============restrict user from adding twice=======================


app.get('/s', (req, res) => {//worked!
  console.log("getting request")
  console.log(req.params.id);
  let reqid = parseInt(req.params.id);
  // console.log(id);

  const queryString = 'SELECT id, album FROM songs  WHERE artist_id = parseInt(req.params.id)';
  // console.log(result);
  pool.query(queryString, (err, result) => {
      console.log(result.rows);
    if (err) {
      console.error('query error:', err.stack);
      res.send( 'query error' );
    } else {
      
      
      res.send( result.rows);
    
    };
  });
});



//===========get songs from one artist ===================







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
