console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'SYNG',
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

const cookieParser = require('cookie-parser');
app.use(cookieParser());
var sha256 = require('js-sha256');

/**
 * ===================================
 * Part 1 Artists
 * ===================================
 */

app.get('/', (request, response) => {
  // query database for all artists
  // respond with HTML page displaying all artists
  response.send('Hello World');
  //response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artists
  response.render('new');
});

app.post('/artists/new', (request, response) => {
    // INSERT new artist into artists db
    console.log("Adding artist:");
    console.log(request.body);
    let newArtist = [ request.body.name, request.body.photo_url, request.body.nationality ];

    let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES($1, $2, $3) RETURNING *';

    pool.query(queryText, newArtist, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let artist = result.rows[0];
        response.render('artist', artist);
    });
});

app.get('/artists/:id', (request, response) => {
    // SELECT artist from artists db
    let id = request.params.id;
    console.log("Getting artist id: " + id);

    let queryText = `SELECT * FROM artists WHERE id=${id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let artist = result.rows[0];
        response.render('artist', artist);
    });
});

app.get('/artists/:id/edit', (request, response) => {
    // SELECT artist from artists db
    let id = request.params.id;
    console.log("Editing artist id: " + id);

    let queryText = `SELECT * FROM artists WHERE id=${id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let artist = result.rows[0];
        console.log(artist);
        response.render('edit', artist);
    });
});

app.put('/artists/:id', (request, response) => {
    // SELECT artist from artists db
    let id = request.params.id;
    console.log("Updating artist id: " + id);
    console.log(request.body);
    let editArtist = [ request.body.name, request.body.photo_url, request.body.nationality, id];

    let queryText = `UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4 RETURNING *`;

    pool.query(queryText, editArtist, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let artist = result.rows[0];
        response.render('artist', artist);
    });
})

app.delete('/artists/:id', (request, response) => {
    // SELECT artist from artists db
    let id = request.params.id;
    console.log("Deleting artist id: " + id);

    let queryText = `DELETE FROM artists WHERE id=${id} RETURNING *`;
    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        console.log("Deleted: " + result.rows[0]);
        let home = '<a href="http://localhost:3000/artists" alt="home">Back to Homepage</a>'
        response.send(home);
    });
})

app.get('/artists/:id/songs', (request, response) => {
    //SELECT songs for artist from songs db
    let artist_id = request.params.id;
    console.log("Getting songs for artist id: " + artist_id);

    let queryText = `SELECT * FROM songs WHERE artist_id=${artist_id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let songs = result.rows
        response.send(songs);
    });
});

app.get('/artists', (request, response) => {
    // display all artists from artists db
    let queryText = "SELECT * FROM artists ORDER BY name";

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        //response.send(result.rows);
        let data = {};
        data.artists = result.rows;
        response.render('home', data);
    });
});

/**
 * ===================================
 * Part 2 Playlists
 * ===================================
 */

app.get('/playlists/new', (request, response) => {
  // respond with HTML page with form to create new playlist
  response.render('newlist');
});

app.post('/playlists/new', (request, response) => {
    // INSERT new playlist into playlist db
    console.log("Adding playlist:")
    console.log(request.body);
    let newList = [ request.body.name ];

    let queryText = 'INSERT INTO playlists (name) VALUES($1) RETURNING *';

    pool.query(queryText, newList, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let list = result.rows[0];
        response.render('list', list);
    });
});

app.get('/playlists/:id', (request, response) => {
    // SELECT playlist from playlists db
    let playlist_id = request.params.id;
    console.log("Getting playlist id: " + playlist_id);

    let queryText = `SELECT playlists.name, songs.title FROM playlists INNER JOIN playlist_song ON (playlists.id = playlist_song.playlist_id) INNER JOIN songs ON (songs.id = playlist_song.song_id) WHERE playlist_song.playlist_id=${playlist_id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let list = {};
        list.id = playlist_id;
        list.songs = result.rows;
        // if no songs in playlist yet
        if (list.songs.length === 0) {
            list.songs = [{}];
            list.songs[0].name = "Playlist " + playlist_id;
            list.songs[0].title = "empty";
        }
        console.log(list);
        response.render('list', list);
    });
});

app.get('/playlists/:id/newsong', (request, response) => {
    // respond with HTML page with form to add new song to playlist
    let playlist_id = request.params.id;
    console.log("Adding to playlist id: " + playlist_id);
    //input songs list to be rendered as option
    let queryText = 'SELECT * FROM songs';
    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let list = {};
        list.message = "Add Song to Playlist " + playlist_id;
        list.id = playlist_id;
        list.songs = result.rows;
        response.render('newlistsong', list);
    });
});

app.post('/playlists/:id/newsong', (request, response) => {
    // INSERT song_id into playlist_song db
    let song_id = request.body.song_id;
    let playlist_id = request.params.id;
    console.log("Inserting to playlist id: " + playlist_id);

    let addSong = [ song_id, playlist_id ];
    let queryText = `INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *`;

    pool.query(queryText, addSong, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        console.log(result.rows[0]);
        //use redirect so id not need to be input
        response.redirect('/playlists/'+playlist_id);
    });
});

app.get('/playlists', (request, response) => {
    // display all playlists from playlists db
    let queryText = "SELECT * FROM playlists ORDER BY name";

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        //response.send(result.rows);
        let list = {};
        list.playlists = result.rows;
        response.render('listhome', list);
    });
});

/**
 * ===================================
 * Part 3 User Account
 * ===================================
 */
const SALT = 'tunr_db';

app.get('/register', (request, response) => {
  // respond with HTML page with form to register
  let output = {};
  output.message = "Register An Account";
  response.render('account', output);
});

app.post('/register', (request, response) => {
    // INSERT new user into user db
    console.log("Adding user:")
    console.log(request.body);

    // check if user name taken
    let user_name = request.body.name;
    let queryText = `SELECT * FROM users WHERE name='${user_name}'`;
    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }

        if (result.rows.length > 0) {
          let output = {};
          output.message = "User name already exist!";
          response.render('account', output);
        } else {
            // if not, register user
            let hashedPw = sha256(request.body.password + SALT);
            let newUser = [ user_name, hashedPw ];

            queryText = 'INSERT INTO users (name, password) VALUES($1, $2) RETURNING *';

            pool.query(queryText, newUser, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    response.send('query error');
                }
                // send login cookies
                console.log("Registered" + result.rows[0]);
                response.cookie('user_name', result.rows[0].name);
                response.cookie('loggedIn', result.rows[0].password);
                // redirect to homepage
                response.redirect('/artists');
            });
        }
    });
});

app.get('/login', (request, response) => {
  // respond with HTML page with form to register
  let output = {};
  output.message = "Login Account";
  response.render('account', output);
});

app.post('/login', (request, response) => {
    // check user login
    let user_name = request.body.name;
    let hashedPw = sha256(request.body.password + SALT);

    let queryText = `SELECT * FROM users WHERE name='${user_name}'`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        // if there is result
        if ( result.rows.length > 0 ) {
            // check if password correct
            if ( hashedPw === result.rows[0].password) {
                // send login cookies
                response.cookie('user_id', result.rows[0].id);
                response.cookie('user_name', result.rows[0].name);
                response.cookie('loggedIn', result.rows[0].password);
                // redirect to homepage
                response.redirect('/artists');
            } else {
                // else return incorrect password
                let output = {};
                output.message = "Incorrect password, please try again";
                response.render('account', output);
            }
        } else {
            // if there is no result
            let output = {};
            output.message = "Incorrect user name, please try again";
            response.render('account', output);
        }
    });
});

app.get('/favorites/new', (request, response) => {
    // respond with HTML page with form to add new song to favorites
    // get user_name from cookie
    let user_name = request.cookies['user_name'];
    // check if password correct?
    console.log("Adding to favorites");
    // input songs list to be rendered as option
    let queryText = 'SELECT * FROM songs';

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        let list = {};
        list.message = "Add Song to " + user_name + " Favorites";
        list.songs = result.rows;
        response.render('newlistsong', list);
    });
});

app.post('/favorites/new', (request, response) => {
    // INSERT user & song into favorites db
    let user_id = request.cookies['user_id'];
    // check if password correct?
    let song_id = request.body.song_id
    console.log("Adding song: " + song_id);
    let addFav = [ song_id, user_id ];

    let queryText = 'INSERT INTO favorites (song_id, user_id) VALUES ($1, $2) RETURNING *';

    pool.query(queryText, addFav, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        console.log(result.rows);
        response.redirect('/favorites');
    });
});

app.get('/favorites', (request, response) => {
    let user_id = request.cookies['user_id'];
    let hashedPw = request.cookies['loggedIn'];

    let queryText = `SELECT * FROM users WHERE id=${user_id}`;

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        // validate login
        console.log(result.rows);
        if( hashedPw === result.rows[0].password ){
            queryText = `SELECT favorites.song_id,songs.title FROM favorites INNER JOIN songs ON (favorites.song_id=songs.id) INNER JOIN users ON (favorites.user_id=users.id) WHERE favorites.user_id=${user_id}`;
            pool.query(queryText, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    response.send('query error');
                }
                // display favorites of user
                console.log(result.rows);
                let list = {};
                list.songs = result.rows;
                response.render('favhome', list);
            });
        }else{
            // redirect to homepage
            response.redirect('/artists');
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
  });
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);