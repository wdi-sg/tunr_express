console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'syahirah',
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

var sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
var SALT = "bababanana";

/**
 * ===================================
 * Routes
 * ===================================
 */

//test with 'Hello World'
app.get('/', (request, response) => {
  response.send('Hello World');
});

//////////SHOWS FORM TO CREATE NEW ARTIST//////////
app.get('/artists/new', (request, response) => {
  response.render('new');
});

//////////SUBMITS FORM TO CREATE NEW ARTIST/////////
app.post('/artists', (request, response) => {
    let newArtist = request.body;
    let newValues = [newArtist.name, newArtist.photo_url, newArtist.nationality];

    const newData =  "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(newData, newValues, (err, result) => {

    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        //console.log('query result:', result);
        const theArtist = {
                "id": result.rows[0].id,
                "name": result.rows[0].name,
                "photo_url": result.rows[0].photo_url,
                "nationality": result.rows[0].nationality
            };

        // redirect to home page
        response.render('individual', theArtist);
    }
    });
});

////////SHOW INDIVIDUAL ARTIST PAGE////////
app.get('/artists/:id', (request, response) => {
    let inputId = request.params.id;
    const artistsList = `SELECT * FROM artists WHERE id = ${inputId}`;

    // find artist by id from the artists table
    pool.query(artistsList, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'Artist not found' );
        } else {
            //console.log('query result:', result);
            const theArtist = {
                "id": result.rows[0].id,
                "name": result.rows[0].name,
                "photo_url": result.rows[0].photo_url,
                "nationality": result.rows[0].nationality
            };
            // redirect to home page
            response.render('individual', theArtist);
         };
    });
});

//SHOWS FORM TO CREATE NEW PLAYLIST
app.get('/playlists/new', (request, response) => {
  response.render('newPlaylist');
});

////////SUBMITS FORM TO CREATE NEW PLAYLIST///////
app.post ('/playlists', (request, response) => {
    let newPlaylist = [request.body.name];
    //console.log("Newly created playlist: " + request.body.name);

    const newData =  "INSERT INTO playlist (name) VALUES ($1) RETURNING *";

    pool.query(newData, newPlaylist, (err, result) => {

    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        //console.log('query result:', result);
        const playlistName = {
                "name": result.rows[0].name,
            };

        // redirect to home page
        response.render('addedPlaylist', playlistName);
    }
    });
});

////////SHOW INDIVIDUAL PLAYLIST PAGE////////
app.get('/playlists/:id', (request, response) => {
    let inputId = request.params.id;
    const playlist = `SELECT * FROM playlist WHERE id = ${inputId}`;

    // find playlist by id from the playlist table
    pool.query(playlist, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'Playlist not found' );
        } else {
            console.log('The query result is: ', result);
            const thePlaylist = {
                "id": result.rows[0].id,
                "name": result.rows[0].name
            };
            // redirect to home page
            response.render('OnePlaylist', thePlaylist);
         };
    });
});

///////SHOW FORM TO ADD A SONG TO THE PLAYLIST///////
app.get('/playlists/:id/newsong', (request, response) => {
    let inputId = request.params.id;
    const playlist = `SELECT * FROM playlist WHERE id = ${inputId}`;

    const songlist = `SELECT * FROM songs`;

    // find playlist by id from the playlist table
    pool.query(playlist, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'Playlist not found' );
        } else {
            //find the song from songs tab;e
            pool.query(songlist, (err, result2) => {
            const thePlaylist = {
                "id": result.rows[0].id,
                "name": result.rows[0].name,
                //"songlist": result2.rows
            };
             response.render('addSong', thePlaylist);
            });
        };
    });
});

///////SUBMITS FORM TO ADD A SONG TO PLAYLIST///////
app.post ('/playlists/:id', (request, response) => {
    //added song_id
    let addedSong = parseInt(request.body.song_id);
    console.log(addedSong);

    //selects playlist_id
    let inputId = request.params.id;
    console.log(inputId);

    //add song to the playlist
    let newValues = [addedSong, inputId];
    const addedPlaylist =  "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *";

    pool.query(addedPlaylist, newValues, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            //console.log('query result:', result);
            const updatedPlaylist = {
                "name": result.rows[0].name,
                "song_id": result.rows[0].song_id
        };
        // redirect to home page
        response.send('added!');
        //response.render('playlistSongs', updatedPlaylist);
    }
    });
});

//////SHOWS FORM FOR USER TO REGISTER//////
app.get('/register', (request, response) => {
    response.render('register');
});

/////SUBMITS NEW USER DATA FOR REGISTRATION//////
app.post('/register', (request, response) => {
    let username = request.body.username;
    let password = sha256(request.body.password + SALT);

    let newValues = [username, password];
    const newUser = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";

    pool.query(newUser, newValues, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            let user_id = result.rows[0].id
            let currentSessionCookie = sha256(user_id + SALT );
            response.cookie('loggedIn', currentSessionCookie);

            response.send("User created!");
        }
    });
});

//////SHOWS LOG IN PAGE//////
app.get('/login', (request, response) => {
    response.render('login');
});

///////VERIFY DATA TO LOG IN/////
app.post('/login', (request, response) => {
    let reqUsername = request.body.username;
    let reqPassword = request.body.password;

    let hashedReqPassword = sha256( reqPassword + SALT );
    console.log( "hashed request password: "+ hashedReqPassword );
    //check database for this user
    const userValue = [reqUsername];
    const queryString = "SELECT * FROM users WHERE username = $1";
    console.log("the user is " + queryString);

    pool.query(queryString, userValue, (err, result) => {
        // if this user exists in the database
        console.log(result.rows);
        if( result.rows.length > 0 ){
            //check to see if the password in request.body matches what's in the database
            if( hashedReqPassword === result.rows[0].password ){
                let user_id = result.rows[0].id;
                let hashedCookie = sha256(user_id + SALT);

                response.cookie('user_id', user_id);
                response.cookie('loggedIn', hashedCookie);

                // if it matches they have been verified, log them in
                response.send('Successfully logged in! Redirecting to your page now')
            } else {
                response.status(403).send('wrong password');
            };
        };
      // redirect to home page
    });
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