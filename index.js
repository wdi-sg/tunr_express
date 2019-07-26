console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'apooshoo',
  password: 'neilgaiman1',
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

const cookieParser = require('cookie-parser');
app.use(cookieParser());
var sha256 = require('js-sha256');

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
app.use(express.static(__dirname+'/public/'));
//require CSS!

/**
 * ===================================
 * Routes
 * ===================================
 */

//index page, link to home
app.get('/', (request, response) => {
    let queryString = `SELECT * FROM artists ORDER BY id ASC`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            let info = result.rows;
            let data = {
                artistsData: info
            };
            response.render('home', data);
        }
    })

});

//show page, link to each-artist
app.get('/artist', (request, response) => {
    //search artists by id
    let id = parseInt(request.query.search);
    console.log(id);

    let queryString = `SELECT * FROM artists WHERE id = ${id}`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else {
            response.render('each-artist', result.rows);
        }
    })

})

//create an artist, link to create-artist
app.get('/artist/new', (request, response) => {

    response.render('create-artist');
});

//create an artist, get info from create-artist, redirect to home?
app.post('/artist/new', (request, response) => {
    let artist = request.body;
    let queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`;
    let values = [artist.name, artist.photo_url, artist.nationality];
    pool.query(queryString, values, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            console.log(result.rows[0]);
            response.redirect('/');
        }
    })

})

//edit an artist, get id info from home, link to edit-artist
app.get('/artist/edit', (request, response) => {
    let id = parseInt(request.query.edit);
    let queryString = `SELECT * FROM artists WHERE id = ${id}`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            let data = result.rows[0];
            response.render('edit-artist', data);
        }
    })

})

app.put('/artist/edit', (request, response) => {
    let data = request.body;
    let id = parseInt(request.body.id);
    let queryString = `UPDATE artists SET name = '${data.name}', photo_url = '${data.photo_url}', nationality = '${data.nationality}' WHERE id = ${id} RETURNING *`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            // console.log(result.rows[0]);
            response.redirect('/');
        }
    })

})

app.delete('/artist/delete', (request, response) => {
    let id = parseInt(request.body.delete);
    let queryString = `DELETE FROM artists WHERE id = ${id}`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            response.redirect('/');
        }
    })
})

//---------------SONGS-------------
//get songs by artist, push to songs-index
app.get('/artist/songs', (request, response) => {
    let artist = request.query.search;
    let values = [artist];
    let queryString = `SELECT * FROM artists WHERE name = $1`;
    pool.query(queryString, values, (err, result) => {
        if (err){
            console.log(err.stack);
        } else {
            let artistId = result.rows[0].id;
            console.log(artistId);
            values  = [artistId];
            queryString = `SELECT * FROM songs WHERE artist_id = $1`;
            pool.query(queryString, values, (err, result) => {
                if (err){
                    console.log(err.stack);
                } else {
                    console.log(result.rows)
                    let data = {
                        songsData: result.rows
                    };
                    response.render('songs-index', data);
                }
            })
        }
    })
})

//create song, get artist id, push to create-song
app.get('/artist/songs/new', (request, response) => {
    let id = parseInt(request.query.create);
    let data = {
        artistId: id
    }
    response.render('create-song', data);
})

//get info from create-song, create song, redirect to songs-index
app.post('/artist/:id/songs/new/', (request, response) => {
    let songData = request.body;
    console.log(request.body)
    let artistId = parseInt(request.params.id);

    console.log(artistId)
    let values = [songData.title, songData.album, "", songData.artwork, artistId]
    let queryString = `INSERT INTO songs (title, album, preview_link, artwork, artist_Id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    pool.query(queryString, values, (err, result) => {
        if (err){
            console.log(err.stack);
        } else {
            response.redirect('/artist/songs');
        }
    })
})
//-----------------ACCOUNT

var loggedIn = sha256('true');

//sends you to register-form
app.get('/register', (request, response) => {
    response.render('register-form');
})

//gets user, password and creates account.
//stores in database, hashes password. Sends loggedIn hash, user and user id
app.post('/register', (request, response) => {
    console.log(request.body);
    let user = request.body.user;
    let hash = sha256(request.body.password);

    let queryString = `INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id`;

    let values = [user, hash];
    pool.query(queryString, values, (err, result) => {
        if (err){
            console.log(err.stack);
        } else {
            let newId = result.rows[0].id;
            console.log("newid ="+newId);
            response.cookie('user', user);
            response.cookie('loggedin', loggedIn);
            response.cookie('userid', newId)
            response.redirect('/');
        }
    })

})

//push to login form
app.get('/login', (request, response) => {
    response.render('login');
})

//checks input against database, sends cookies for user, loggedin, userid. push to '/'
app.post('/login', (request, response) => {
    let user = request.body.user;
    let hash = sha256(request.body.password);
    if (request.cookies.loggedin === loggedIn){
        console.log("Already logged in!");
    } else {
        let queryString = `SELECT * FROM users WHERE name = $1`;
        let values = [user];
        pool.query(queryString, values, (err, result) => {
            if (err){
                console.log(err.stack);
            } else {
                let savedPass = result.rows[0].password;
                let savedId = result.rows[0].id;
                if (hash === savedPass){
                    console.log('login!');
                    response.cookie('user', user);
                    response.cookie('loggedin', loggedIn);
                    response.cookie('userid', savedId);
                    response.redirect('/')
                } else {
                    console.log('no match found')
                }
            }
        })
    }

})

//logout, clearCookies, push to '/'
app.get('/logout', (request, response) => {
    response.clearCookie('user');
    response.clearCookie('userid');
    response.clearCookie('loggedin');

    response.redirect('/');
})

//favourite a song: checks if logged in, then inputs into table
app.post('/favourites/new', (request, response) => {
    if (request.cookies.loggedin !== loggedIn){
        console.log("Please log in!");
    } else {
        let songId = parseInt(request.body.fav);
        let userId = parseInt(request.cookies.userid);

        let values = [songId, userId];
        let queryString = `INSERT INTO favourites (song_id, user_id) VALUES ($1, $2) RETURNING *`;
        pool.query(queryString, values, (err, result) => {
            if (err){
                console.log(err.stack);
            } else {
                console.log(result.rows[0]);
            }
        })

        response.redirect('/');
    }
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