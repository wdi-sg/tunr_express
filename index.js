console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
  user: 'lekhweemeng',
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

app.use(cookieParser());

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
    var visits = request.cookies['visits'];
    if( visits === undefined ){
    visits = 1;
    }else{
        visits = parseInt( visits ) + 1;
    }
    var data = {
        cookie: visits
    }
    response.cookie('visits', visits)
    response.render('main', data);
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new tune
  var visits = request.cookies['visits'];
  var data = {
      cookie: visits
  }
  response.render('new', data);
});

app.post('/artists', (request, response) => {
    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3)'
    const values = [request.body.artistName, request.body.photo, request.body.nationality];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            console.log('query result: ', result);
            response.redirect('/');
        }
    })
});

app.get('/artists/:id', (request, response) => {
    var visits = request.cookies['visits'];
    let artistId = parseInt(request.params.id);
    let queryString = 'SELECT name FROM artists WHERE id =$1';
    const values=[artistId];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            var data = {
                name: result.rows[0].name,
                cookie: visits
            }
            console.log('query result: ', result.rows[0].name);
            response.render('oneArtist', data);
        };
    });
});

app.get('/artists/:id/songs', (request, response) => {
    var visits = request.cookies['visits'];
    let artistId = parseInt(request.params.id);
    let queryString = 'SELECT title FROM songs WHERE artist_id =$1';
    const values=[artistId];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            var data = {
                songs: result.rows,
                cookie: visits
            }
            console.log('query result: ', result.rows);
            response.render('artistsongs', data);
        };
    });
});

app.get('/playlist/new', (request, response) => {
  // query database for all pokemon
  var visits = request.cookies['visits'];
  var data = {
      cookie: visits
  }
  // respond with HTML page displaying all pokemon
  response.render('newplaylist', data);
});

app.get('/playlist/:id/newsong', (request, response) => {
  // query database for all pokemon
  var visits = request.cookies['visits'];
  var data = {
      cookie: visits
  }
  // respond with HTML page displaying all pokemon
  response.render('pladdsong', data);
});

app.post('/playlist', (request, response) => {
    let queryString = 'INSERT INTO playlist (name) VALUES ($1)'
    const values = [request.body.playlistName];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            console.log('query result: ', result);
            response.redirect('/');
        }
    })
});

app.get('/playlist/:id', (request, response) => {
    var visits = request.cookies['visits'];
    let playlistId = parseInt(request.params.id);
    let queryString = 'SELECT title, album, artist_id FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_id =$1';
    const values=[playlistId];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            var data = {
                songs: result.rows,
                plId: playlistId,
                cookie: visits
            }
            console.log('*********************************');
            console.log('query result: ', result.rows);
            response.render('showplaylist', data);
        };
    });
});

app.post('/playlist/:id', (request, response) => {
    let queryString = 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1,$2)'
    console.log('blahhhhhhhhhhhhhh' + request.params.id);
    const values = [request.body.songId, request.body.playlistId];
    pool.query(queryString, values, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            console.log('query result: ', result);
            response.redirect('/playlist');
        }
    })
});

app.get('/playlist', (request, response) => {
    var visits = request.cookies['visits'];
    let plId = parseInt(request.params.id);
    let queryString = 'SELECT name FROM playlist';
    // const values=[plId];
    pool.query(queryString, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            var data = {
                pl: result.rows,
                cookie: visits
            }
            console.log('query result: ', result.rows);
            response.render('playlist', data);
        };
    });
});

app.get('/register', (request, response) => {
    response.render('register');
});

app.post('/register', (request, response) => {
    let encPw = sha256(request.body.password);
    console.log('**************this is the hashed password*********');
    console.log(encPw);
    let queryString1 = 'INSERT INTO users (user_id, password) VALUES ($1,$2)'
    const values1 = [request.body.userId, encPw];
    pool.query(queryString1, values1, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            console.log('query result: ', result);
            response.cookie('loggedin', true)
            response.redirect('/');
        }
    })
});

app.get('/login', (request, response) => {
    response.render('login');
});

app.post('/login', (request, response) => {
    let encPw = sha256(request.body.password);
    console.log('**************this is the hashed password*********');
    console.log(encPw);
    let queryString1 = 'SELECT * FROM users WHERE user_id = $1'
    const values1 = [request.body.userId];
    pool.query(queryString1, values1, (err,result)=> {
        if (err) {
            console.log('error: ', err.stack);
            response.send('query error');
        } else {
            if (encPw === result.rows[0].password){
            console.log('query result: ', result);
            response.cookie('loggedin', true);
            response.cookie('user name', request.body.userId);
            response.cookie('user id', result.rows[0].id);
            response.redirect('/users/'+result.rows[0].id);
            } else {
                response.send('Either your user ID or password is incorrect. Please try again')
            }
        }
    })
});

app.get('/users/:id', (request, response) => {
    var isLogged = request.cookies['loggedin'];
    console.log('*********check the value here!!!!***** ' + isLogged);
    if(isLogged == 'true'){
        let queryString = 'SELECT songs.title, songs.artist_id, album FROM songs INNER JOIN user_fav ON (songs.id = user_fav.song_id) WHERE user_fav.user_id = $1';
        const values=[parseInt(request.params.id)];
        pool.query(queryString, values, (err,result)=> {
            if (err) {
                console.log('error: ', err.stack);
                response.send('query error');
            } else {
                var data = {
                    songs: result.rows,
                }
                console.log('query result: ', result.rows);
                response.render('userlogged',data);
            };
        });
    } else {
        response.send('please proceed to log in.')
    }
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