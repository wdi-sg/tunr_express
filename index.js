console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
var sha256 = require('js-sha256');
const cookieParser = require('cookie-parser')

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

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

app.use(express.static(__dirname+'/public'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
 

const SALT = 'ThIs is ThE SecrEt pHrasE.';
const PSALT = 'sErceT pAsSwoRd adDiTioNaL pHraSe';
/**
 * ===================================
 * Homepage React Callback Function
 * ===================================
 */

 function root(request,response){
    response.redirect('/login');
 };

 function loginPage(request,response){
    let sessionCookieCheck = sha256('true'+SALT);

    if (request.cookies.meow === sessionCookieCheck){
        response.redirect('/home');
    };

    response.render('loginpage');
 };

function checkLogin (request,response){
    let queryString = "SELECT * FROM users WHERE username = '" + request.body.username+"'";

    pool.query(queryString,(err,result)=>{
      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } 

      let passwordHash = sha256(request.body.password+PSALT);
      console.log(result.rows)
      if(passwordHash !== result.rows[0].password){
        response.redirect('/login');
      } else {
        let sessionCookie = sha256(`true` + SALT);
        response.cookie('meow',sessionCookie);

        response.redirect('/home');
      }
 
    });

}

function newUserForm (request,response){
  response.render('register');
};

function createUser (request,response){
  console.log("CREATING USERRRRR");
  let queryString = "SELECT * FROM users WHERE username = '" + request.body.username+"'";

  pool.query(queryString,(err,result)=>{
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error1' );
    } else if (result.rows.length === 0) {

      let passwordHash = sha256(request.body.password + PSALT);
      let queryString = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
      console.log(request.body);
      let values = [request.body.username, passwordHash];

      pool.query(queryString,values, (err,result)=>{
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error2' );
        }

        response.redirect('/login');
      });
    } else {
      response.redirect('/register');
    }
  });
}


function homepage (request,response){
  response.render('homepage');
}

function logout(request,response) {
  let cookie = 'logout';
  response.cookie('meow',cookie);
  response.redirect('/login')
}

/**
 * ===================================
 * Artists React Callback functions
 * ===================================
 */

function artistsMainpage(request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };

    const artistsQueryString = 'SELECT * from artists';
    
    pool.query(artistsQueryString, (err, result) => {
      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      }
      let data = {
          artists: result.rows
        }
      response.render('artistmainpage',data);
    });

 };


function newArtistPage (request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    response.render('newartist');
 };

function addNewArtist (request,response){
    const newArtistQueryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3) RETURNING id'
    const values = [request.body.name,request.body.photo_url,request.body.nationality];

    pool.query(newArtistQueryString, values, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        response.redirect(`/artists/${result.rows[0].id}`);

      }
    });
 };

function individualArtistPage (request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const individualArtistQueryString = 'SELECT * FROM artists where id ='+ parseInt(request.params.id);

    pool.query(individualArtistQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        let data = {
          artist: result.rows[0]
        }
        response.render('individualartist', data);
      }
    });
 };

function individualArtistEditPage (request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const individualArtistQueryString = 'SELECT * FROM artists where id ='+ parseInt(request.params.id);

    pool.query(individualArtistQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        let data = {
          artist: result.rows[0]
        }
        response.render('individualartistedit', data);
      }
    });
 };

function editIndividualArtist (request,response){
    const updateString = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id = '+ parseInt(request.params.id) + 'RETURNING id';
    let value = [request.body.name,request.body.photo_url,request.body.nationality];

    pool.query(updateString,value, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        console.log(result.rows);
        response.redirect(`/artists/${result.rows[0].id}`);
      }
    });
};

function individualArtistDeletePage (request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const individualArtistQueryString = 'SELECT * FROM artists where id ='+ parseInt(request.params.id);

    pool.query(individualArtistQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        let data = {
          artist: result.rows[0]
        }
        response.render('individualartistdelete', data);
      }
    });
 };

 function deleteIndividualArtist (request,response){
    const individualArtistQueryString = 'DELETE FROM artists where id ='+ parseInt(request.params.id);

    pool.query(individualArtistQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        response.redirect('/artists');
      }
    });
 };

function songsByArtist (request,response) {
  let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
  const songQuery = 'SELECT * FROM songs where artist_id = '+ parseInt(request.params.id);
  pool.query(songQuery, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      let data = {
        songs: result.rows
      }

      const getArtist = 'SELECT * FROM artists where id ='+ parseInt(request.params.id);

      pool.query(getArtist, (err, result) => {
        if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
        } else {
          data.artist = result.rows[0];
          response.render('individualartistsongs',data);
        }
      });
    }
  });
};

function newSongByArtist (request,response) {
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const getArtist = 'SELECT * FROM artists where id ='+ parseInt(request.params.id);

    pool.query(getArtist, (err, result) => {
      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {

        let data = {
          artist: result.rows[0]
        }

        response.render('newsongbyartist',data);
      }
    });
};

function addSongByArtist(request,response) {
    const getArtistId = "SELECT id FROM artists WHERE LOWER(name) = LOWER('"+request.body.artist+"')";
    
    pool.query(getArtistId, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        const insertSong = 'INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5) RETURNING id '
        let values = [request.body.title,request.body.album,request.body.preview_link,request.body.artwork,result.rows[0].id]
        
        pool.query(insertSong, values, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            response.redirect(`/artist/${request.params.id}/songs`);

          }
        });
      }
    });
 };

 /**
 * ===================================
 * Songs React callback functions
 * ===================================
 */

function songsMainpage(request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const artistsQueryString = 'SELECT * FROM songs';
    
    pool.query(artistsQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      }
      let data = {
          songs: result.rows
        }
      response.render('songsmainpage',data);
    });

 };


function newSongPage (request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const artistQuery = 'SELECT id,name FROM artists';

    pool.query(artistQuery, (err,result) => {
      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      }
      let data = {
          artistName: result.rows
        }
      response.render('newsong',data);
    });
 };

function addNewSong (request,response){
    const insertSong = 'INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5) RETURNING id '
    let values = [request.body.title,request.body.album,request.body.preview_link,request.body.artwork,request.body.artist_id];
    
    pool.query(insertSong, values, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        response.redirect(`/songs/${result.rows[0].id}`);

      }
    });
 };

function individualSongPage (request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const individualSongQueryString = 'SELECT * FROM songs where id ='+ parseInt(request.params.id);


    pool.query(individualSongQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        var data = {
          song: result.rows[0]
        }

        console.log(result.rows);

        const artistsName = 'SELECT name FROM artists where id = ' + result.rows[0].artist_id;

        pool.query(artistsName, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            data.artistName = result.rows[0].name;
            response.render('individualsong', data);
          }
        });
      }
    });
 };

function individualSongEditPage (request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const individualSongQueryString = 'SELECT * FROM songs where id ='+ parseInt(request.params.id);

    pool.query(individualSongQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        var data = {
          song: result.rows[0]
        }
        const artistsName = 'SELECT id, name FROM artists';

        pool.query(artistsName, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            console.log (result.rows);
            data.artistName = result.rows;
            console.log(data);
            response.render('individualsongedit', data);
          }
        });
      }
    });
 };

function editIndividualSong (request,response){
  const updateString = 'UPDATE songs SET title=$1, album=$2, preview_link=$3, artwork=$4, artist_id=$5 WHERE id = '+ parseInt(request.params.id) + 'RETURNING id';
  let values = [request.body.title,request.body.album,request.body.preview_link,request.body.artwork,request.body.artist_id];
  
  pool.query(updateString, values, (err, result) => {

    if (err) {
      console.error('query error2:', err.stack);
      response.send( 'query error2' );
    } else {
      response.redirect(`/songs/${result.rows[0].id}`);
    }
  });
 };


function individualSongDeletePage (request,response){
      let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
      const individualSongQueryString = 'SELECT * FROM songs where id ='+ parseInt(request.params.id);

      pool.query(individualSongQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        var data = {
          song: result.rows[0]
        }
        const artistsName = 'SELECT name FROM artists where id = ' + result.rows[0].artist_id;

        pool.query(artistsName, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            data.artistName = result.rows[0].name;
            response.render('individualsongdelete', data);
          }
        });
      }
    });
  };

 function deleteIndividualSong (request,response){
    const individualSongQueryString = 'DELETE FROM songs where id ='+ parseInt(request.params.id);

    pool.query(individualSongQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        response.redirect('/songs');
      }
    });
 };


  /**
 * ===================================
 * Playlist React callback functions
 * ===================================
 */
function playlistsMainpage(request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    const playlistsQueryString = 'SELECT * FROM playlists';
    
    pool.query(playlistsQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      }
      let data = {
          playlists: result.rows
        }
      response.render('playlistsmainpage',data);
    });

 };

function showNewPlaylistPage(request,response){
    let sessionCookieCheck = sha256('true'+SALT);
    if (request.cookies.meow !== sessionCookieCheck){
        response.redirect('/login');
    };
    response.render('newplaylist');
 }


function addNewPlaylist(request,response){
    const newPlaylist='INSERT INTO playlists (title, playlist_image) VALUES ($1,$2) RETURNING id';
    let values = [request.body.title,request.body.playlist_image];

    pool.query(playlistsQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      }
      response.redirect('/playlists/'+result.rows[0].id);
    });

 };

 function individualPlaylistPage(request,response){
    const playlistDetailQuery = 'SELECT * FROM songs INNER JOIN playlist_songs ON (playlists_songs.songs_id = songs.id) where playlists_songs.playlists_id = ' + parseInt(request.params.id);

    pool.query(playlistDetailQuery, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      }

      var data = {
        playlist: result.row[0]
      }

      const queryString = 'SELECT * FROM song'
      pool.query()

      response.redirect('/playlists/'+result.rows[0].id);
    });
 };
/**
 * ===================================
 * Routes
 * ===================================
 */
//login routes

app.get('/',root);

app.get('/login',loginPage);

app.post('/login',checkLogin)

app.get('/register', newUserForm);

app.post('/register', createUser);

app.get('/home', homepage);

app.get('/logout', logout);


//artists routings

app.get('/artists',artistsMainpage);

app.get('/artists/new', newArtistPage);

app.post('/artists/new', addNewArtist);

app.get('/artists/:id', individualArtistPage);

app.get('/artists/:id/edit', individualArtistEditPage);

app.put('/artists/:id', editIndividualArtist);

app.get('/artists/:id/delete', individualArtistDeletePage);

app.delete('/artists/:id/delete', deleteIndividualArtist);

app.get('/artists/:id/songs', songsByArtist);

app.get('/artists/:id/songs/new', newSongByArtist);

app.post('/artists/:id/songs', addSongByArtist);

//songs routings

app.get('/songs',songsMainpage);

app.get('/songs/new', newSongPage);

app.post('/songs/new', addNewSong);

app.get('/songs/:id', individualSongPage);

app.get('/songs/:id/edit', individualSongEditPage);

app.put('/songs/:id', editIndividualSong);

app.get('/songs/:id/delete', individualSongDeletePage);

app.delete('/songs/:id/delete', deleteIndividualSong);

//playlist routings

app.get('/playlist', playlistsMainpage);

app.get('/playlist/new', showNewPlaylistPage);

app.post('/playlist', addNewPlaylist);

app.get('/playlist/:id', individualPlaylistPage);

app.post('/playlist/:id',editPlaylist);


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
