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
const cookieParser = require('cookie-parser')


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

app.use(cookieParser());
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




app.get('/artist/:id/songs', (req, res) => {//worked!


  const queryString = 'SELECT title, album FROM songs  WHERE artist_id ='+ parseInt(req.params.id);
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

//===============single Artist===============

app.get('/artist/:id', (req, res) => {//worked!
  console.log("getting request")

  let id = parseInt(req.params.id);
  const queryString = 'SELECT * FROM artists ';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send( 'query error' );
    } else {
      console.log('query result:', result);
      const data = {
            data: result.rows[0]
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


// app.get('/', (req, res) => {//worked!
//   console.log("getting request")
//   console.log(req.params.id);
//   let reqid = parseInt(req.params.id);
//   // console.log(id);

//   const queryString = 'SELECT id, album FROM songs  WHERE artist_id = parseInt(req.params.id)';
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
//===========add log-in page====================

app.get('/login',(req, res) => {
  res.render('loginForm');
});

app.get('/register',(req, res)=> {
  res.render('regiterForm')
});



//======================

var sha256 = require('js-sha256');
const SALT = "bananas are delicious";

app.post('/users', (request, response)=>{

  // hash the password
  let hashedPassword = sha256( request.body.password + SALT );

  const queryString = "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";

  const values = [request.body.name, hashedPassword];

  pool.query(queryString, values, (err, result) => {

    console.log("YAY");
    console.log(result.rows[0] );

    // check to see if err is null

    // they have succesfully registered, log them in
    response.cookie('loggedin', true);
    response.send(`You're registered!`);
  });



});

app.post('/login', (request, response)=>{
  const queryString = "SELECT * FROM users WHERE name=$1";

  const values = [request.body.name];

  pool.query(queryString, values, (err, result) => {

    if( err ){
      console.log( "ERRR!", err );
    }else{

      // they entered the correct passweord if
      // the one in the request is the same as the one in the db query
      //
      let hashedPassword = sha256( request.body.password + SALT );
      if(result.rows[0].password === hashedPassword){

        var user_id = result.rows[0].id;

        console.log("CORRECT")

        let currentSessionCookie = sha256( user_id + 'logged_id' + SALT );


        response.cookie('loggedin', currentSessionCookie);
        response.cookie('user_id', user_id);
      }else{
        console.log("WRONG")

      }

      response.redirect('/');



    }

  });
})


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
