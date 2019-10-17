console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')
var sha256 = require('js-sha256');

var SALT = "mrbombastic";

// Initialise postgres client
const configs = {
  user: '13InchWong',
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
//------------------------------------------------------------------------------------
app.get('/', (request, response) => {
  // respond with HTML page displaying a big Welcome
  response.render('home');
});
//------------------------------------------------------------------------------------
app.get('/register', (request, response) => {
  response.render('registration');
});
//------------------------------------------------------------------------------------
app.get('/login', (request, response) => {
  response.render('login');
})
//------------------------------------------------------------------------------------
app.get('/artists', (request, response) => {
  // query database for all artists
  const queryString = 'SELECT * FROM artists'
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log("SHOWING ALL ARTISTS");
    }
  // respond with HTML page displaying all artists
  const data = { searched : result.rows };
  response.render('indexArtists', data);
  });    
});
//------------------------------------------------------------------------------------
app.get('/artists/new', (request, response) => {
  response.render('addArtists');
});
//------------------------------------------------------------------------------------
app.post('/artists' , (request, response) => {
  console.log("Added new artists: ", request.body);
  queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
  const values = [request.body.name , request.body.photo_url , request.body.nationality];
  console.log("INSERT=================================");
  pool.query(queryString, values, (err, res) => {
      if (err) {
      console.log("query error", err.message);
      } else {
      console.log("id of the thing you just created:", res.rows[0].id);
      }
  });
})
//------------------------------------------------------------------------------------
app.get('/artists/:id', (request, response) => {
  const queryString = `SELECT * FROM artists WHERE id = '${request.params.id}'`;
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log("Foundddddddddddddddddddddd");
    }
  // respond with HTML page displaying all artists
  const data = { searched : result.rows };
  response.render('eachArtist',data);
  });    
});
//------------------------------------------------------------------------------------
app.get('/artists/:id/edit', (request, response) => {
  const queryString = `SELECT * FROM artists WHERE id = '${request.params.id}'`;
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log("Foundddddddddddddddddddddd");
    }
  // respond with HTML page displaying all artists
  const data = { searched : result.rows[0] };
  response.render('editArtist',data);
  });    
});

//NOT WORKING YET------------------------------------------------------------------------------------
// app.put('/artists/:id', (request,response) => {
//   console.log("Artist Edited: " , request.body);
//   let {id} = request.params;
//   let {name, photo_url, nationality} = request.body;
//   queryString = `UPDATE artists SET name='${name}', photo_url='${photo_url}', nationality='${nationality}' WHERE id=${id} RETURNING *`;
//   console.log("UPDATE=================================");
//   pool.query(queryString, (err, res) => {
//       if (err) {
//       console.log("query error", err.message);
//       } else {
//       console.log("id of the thing you just edited:", res.rows[0].id);
//       }
//   });
//   response.send(request.body)
// });

//PLAYLISTSSSS------------------------------------------------------------------------------------
app.get('/playlists', (request, response) => {
  // query database for all artists
  const queryString = 'SELECT * FROM playlist'
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log("playlist downloaded" , result );
    }
  // respond with HTML page displaying all artists
  const data = { searched : result.rows };
  response.render('indexPlaylists', data);
  });    
});
//------------------------------------------------------------------------------------
app.get('/playlists/new', (request, response) => {
  response.render('addPlaylist');
});
//------------------------------------------------------------------------------------
app.post('/playlists' , (request, response) => {
  console.log("Added new playlist: ", request.body);
  queryString = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *';
  const values = [request.body.name];
  console.log("INSERT PLAYLIST=================================");
  pool.query(queryString, values, (err, res) => {
      if (err) {
      console.log("query error", err.message);
      } else {
      console.log("playlist id of the thing you just created:", res.rows[0].id);
      }
      response.redirect('/playlists');
  });
})
//------------------------------------------------------------------------------------
app.get('/playlists/:id', (request, response) => {
  const queryString = `SELECT * FROM playlist WHERE id = '${request.params.id}'`;
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log("Playlist Foundddddddddddddddddddddd" , result);
    }
  // respond with HTML page displaying all artists
  const data = { searched : result.rows };
  response.render('eachPlaylist',data);
  });    
});




//SONGSSSSSS------------------------------------------------------------------------------------
app.get('/playlists/:id/newsong', (request, response) => {
  const queryString = `SELECT * FROM playlist WHERE id = '${request.params.id}'`;
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        console.log("Foundddddddddddddddddddddd");
    }
  // respond with HTML page displaying all artists
  const data = { searched : result };
  response.render('addSong',data);
  });    
});


//NOT YET------------------------------------------------------------------------------------

app.post('/playlists/:id' , (request, response) => {
  console.log("Added new song to playlist: ", request.body);
  queryString = 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1 $2) RETURNING *';
  const values = [request.body.name , request.body.photo_url , request.body.nationality];
  console.log("INSERT=================================");
  pool.query(queryString, values, (err, res) => {
      if (err) {
      console.log("query error", err.message);
      } else {
      console.log("id of the thing you just created:", res.rows[0].id);
      }
  });
})

//------------------------------------------------------------------------------------

app.post('/register' , (request, response) => {
  console.log("Registered new user: ", request.body);
  let userPassword = sha256(request.body.password + SALT);
  queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
  const values = [request.body.name , userPassword];
  pool.query(queryString, values, (err, result) => {
      if (err) {
      console.log("query error", err.message);
      } else {
      console.log("User just created: ", result);

      response.redirect ('/login');
      }
  });
});
//------------------------------------------------------------------------------------

app.post('/login' , (request, response) => {
  let loginName = request.body.name;
  let loginPassword = request.body.password;
  
  queryString = "SELECT * FROM users WHERE name ='" +loginName+ "'";
  pool.query(queryString, (err, result) => {
    if (err) {
    console.log("query error", err.message);
    } else {
      console.log("User Login: ", result.rows);
      if (err) {
        console.error ('query error: ', err.stack);
        response.send("query error");
      } else {
        // console.log('query result: ', result.rows);
        if (result.rows.length > 0 ){
          let hiddenPassword = sha256(loginPassword + SALT);
          if (hiddenPassword === result.rows[0].password){
            let user_id = result.rows[0].id;
            let hiddenCookie = sha256(user_id + SALT);

            response.cookie('user_id', user_id);
            response.cookie('hasLoggedIn', hiddenCookie)
            response.send("You are logged in!");
          
          } else {
            response.status(403).send('bad password input');
          }
        } else {
          response.status(403).send ("no such user")
        }
      }
    }
  });
});
//------------------------------------------------------------------------------------

app.get('/special', (request, response)=>{
  let user_id = request.cookies['user_id'];
  let hashedValue = sha256( user_id + SALT );

  // if there is a cookie that says hasLoggedIn yes, let them access this page
  if( request.cookies['hasLoggedIn'] === hashedValue ){
    response.send('you can do stuff');

  }else{

    //otherwise, show them a message
    response.send('go awayyyy');
    // response.redirect('/login');

  }



});
//------------------------------------------------------------------------------------

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
