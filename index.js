
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'elisu',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const SALT = "meow meow poop";
const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
const cookieParser = require('cookie-parser')
// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(methodOverride('_method'));
// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
var htmlElementAttributes = require('react-html-attributes');
var sha256 = require('js-sha256');

/**
 * ===================================
 * Routes
 * ===================================
 */

 /* ==== Post Register Request ==== */
app.post('/register', (request, response) => {
    let newUser = request.body;
    let hashedPassword = sha256(newUser.user_password);

    let queryString = "INSERT INTO users(user_email, user_password)VALUES($1,$2) RETURNING *";
    let values = [newUser.user_email, hashedPassword];

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log(err);
            response.send("query error");
        } else {
            console.log("new user successfully added!")
            //user successfully registered
            //send them a hashed logged in cookie and a userid cookie
            let hashedLogin = sha256('logged_id: ' + newUser.id + SALT);
            response.cookie('loggedin', hashedLogin);
            response.cookie('userid', result.rows[0].id);
            response.render('loggingin.jsx');
        }
    })
});

 /* ==== Post Login Request ==== */
app.post('/login', (request, response) => {
    const queryString = "SELECT * FROM users WHERE user_email=$1";
    const values = [request.body.user_email];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.log( "Something went wrong!", err );
        } else {

        // they entered the correct password if the password of the entered name matches the one attached to the name in the db

        let hashedPassword = sha256(request.body.user_password);
        if(result.rows[0].user_password === hashedPassword) {
            let hashedLogin = sha256('logged_id: ' + result.rows[0].id + SALT);
            response.cookie('loggedin', hashedLogin);
            response.cookie('userid', result.rows[0].id);
            response.render('loggingin.jsx');
      } else {
        response.send("You didn't say the magic word..")
      }
    }
  });
});

/* ==== Fake Main Page ==== */
app.get('/', (request, response) => {
  // for now just say hello world
  response.send('Hello World!');
});

/* ==== Logged In Main Page ==== */
app.get('/youcool', (request, response) => {

    console.log(request.cookies);
    let queryString = "SELECT * FROM artists order by id";

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('loading artists page');
            response.render('youcool.jsx', result);
        }
    });
});

/* ==== Request Artist Index Page ==== */
app.get('/artists', (request, response) => {
    console.log("now getting artists");
    let queryString = "SELECT * FROM artists order by id";

    pool.query(queryString, (err, result) => {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('loading artists page');
            // response.send(result);
            response.render('artists.jsx', result);
        }
    });
});

/* ==== Request Create Individual Artist Page ==== */
app.get('/artists/new', (request, response) => {
    response.render('new.jsx');
});

/* ==== Post Individual Artist Page ==== */
app.post('/artists', (request, response) => {
    let newArtist = request.body;
    console.log(newArtist);

    let values = [request.body.name, request.body.photo_url, request.body.nationality];
    let queryString = "INSERT INTO artists(name,photo_url,nationality)VALUES($1,$2,$3)";

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log(err);
            response.send("query error");
        } else {
            console.log("artist successfully added!")
            // let url = "/artists/" + newArtist.id;
            response.redirect('/artists');
        }
    })
});

/* ==== Request Individual Artist Page ==== */
app.get('/artists/:id', (request, response) => {
    artistId = parseInt(request.params.id);

    let values = [artistId];
    let queryString = "SELECT * FROM artists WHERE id =$1";

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('loading individual artist page');
            response.render('artist.jsx', result);
        }
    });
})

/* ==== Request Edit Individual Artist ==== */
app.get('/artists/:id/edit', (request, response) => {
    let artistId = parseInt(request.params.id);
    let values = [artistId];
    let queryString = "SELECT * FROM artists WHERE id =$1";

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('loading individual artist edit page');
            response.render('edit.jsx', result);
        }
    });
});

/* ==== Accepting Edit Individual Request ==== */
app.put('/artists/:id', (request, response) => {
    let id = request.params.id;
    let editedArtist = request.body;
    let text = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id = $4';
    let values = [request.body.name, request.body.photo_url, request.body.nationality, id];

    pool.query(text, values, (err, result) => {
        if (err) {
            console.log(err);
            response.send("query error");
        } else {
            console.log("artist successfully edited!")
            response.redirect('/artists');
        }
    })
});

/* ==== Request Delete Artist ==== */
app.get('/artists/:id/delete', (request, response) => {
    let artistId = parseInt(request.params.id);
    let values = [artistId];
    let queryString = "SELECT * FROM artists WHERE id =$1";

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('loading individual artist delete page');
            response.render('delete.jsx', result);
        }
    });
})

/* ==== Accepting Delete Request ==== */
app.delete('/artists/:id', (request, response) => {
    // let byeArtist = request.body;
    let id = request.params.id;
    let queryString = 'DELETE from artists WHERE id = $1';
    let values = [id];

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log(err);
            response.send("query error");
        } else {
            console.log("artist has been deleted!")
            response.redirect('/artists');
        }
    })
});

/* ==== Request Individual Artist Page ==== */
app.get('/artists/:id/songs', (request, response) => {
    artistId = parseInt(request.params.id);
    let values = [artistId];
    let queryString = "SELECT artists.name, artists.id, artists.photo_url, songs.title, songs.album, songs.preview_link FROM artists INNER JOIN songs ON artists.id = songs.artist_id WHERE songs.artist_id = $1";

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('loading individual artist songs page');
            // response.send(result);
            response.render('songs.jsx', result);
        }
    });
})

/* ==== Request Create Individual Artist Song Page ==== */
app.get('/artists/:id/songs/new', (request, response) => {
    let artistId = parseInt(request.params.id);
    let values = [artistId];
    let queryString = "SELECT * FROM artists WHERE id =$1";

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.log('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('loading individual artist add song page');
            console.log(result);
            response.render('newsong.jsx', result);
        }
    });
});

/* ==== Post Individual Artist Song ==== */
app.post('/artists/:id/songs', (request, response) => {
    let newSong = request.body;
    console.log(newSong);

    let values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id];

    let queryString = "INSERT INTO songs(title, album, preview_link, artwork, artist_id)VALUES($1,$2,$3,$4,$5)";

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log(err);
            response.send("query error");
        } else {
            console.log("new song successfully added!")
            response.redirect('/artists');
        }
    })
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