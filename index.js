console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

var SALT = "shdhs:!DJDSkdmsldsfksjensshdhs:!DJDSkdmsldsfksjens;:!DJDSkdmsldsfksjensshdhs:!DJDSkdmsldsfksjens;"

// Initialise postgres client
const configs = {
    user: 'mariadimitrijevic',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
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

//index - render home
app.get('/', (request, response) => {
    // query database for all artists

    // respond with HTML page displaying all artists
    response.render('home');
});

//table for creating new artist, display form for new artist
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('new');
});


app.get('/artists/', (request, response) => {

    // const data = {artists: result.rows};


    const queryText = "SELECT * FROM artists";

    pool.query(queryText, (err, queryRes) => {
        // const data = {artists: queryRes.rows};

        const artistsDB = queryRes.rows;
        const data = {
            artists: artistsDB
        };

        // if (err) {
        //     return console.error('Error executing query', err.stack)
        // }


        console.log(queryRes.rows);
        response.render('index', data);
    });
});

//show new artist, post

app.post('/artists', (request, response) => {

    let { name, photo_url, nationality } = request.body;
    queryText = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${name}', '${photo_url}', '${nationality}') RETURNING *`


    pool.query(queryText, (err, queryRes) => {
        console.log(queryRes.rows[0])

        response.render('showNewArtist', queryRes.rows[0]);

    })
})





//show single artist
app.get('/artists/:id', (request, response) => {

    const queryText = "SELECT * FROM artists";

    pool.query(queryText, (err, queryRes) => {
        console.log(queryRes);

        const artistsDB = queryRes.rows; //the array of objects from the database

        const data = {
            artists: artistsDB
        };

        response.render('showSingleArtist', data);

    })
});


// update
app.put('/artists/:id', (request, response) => {
    let { id } = request.params;
    let { name, photo_url, nationality } = request.body;
    const queryText = `UPDATE artists SET name='${name}', photo_url='${photo_url}', nationality='${nationality}' WHERE id=${id} RETURNING *`;
    pool.query(queryText, (err, queryRes) => {
        response.render('show', queryRes.rows[0]);
    });
});


//delete artist
app.delete('/artists/:id', (request, result) => {
    let { id } = request.params;
    const queryText = `DELETE FROM artists WHERE id=${id}`;
    pool.query(queryText, (err, queryRes) => {
        response.render('home');
    });
});

//songs

app.get('/artists/:id/songs', (request, result) => {
    let { id } = request.params;
    const queryText = `SELECT * FROM songs WHERE artist_id=${id}`;
    pool.query(queryText, (err, queryRes) => {
        response.render('songs', queryRes);
    });
});


//playlist new form
app.get('/playlist/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('newPlaylist');
});


//show playlist, post

app.post('/playlist', (request, response) => {


    let queryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING id';

    const values = [request.body.playlistName];

    pool.query(queryText, values, (err, queryRes) => {


        response.render('newPlaylist', data);
    });

});





//add song to a playlist
app.post('/playlist/:id', (request, response) => {
    let id = request.params.id;
    const values = [request.body.song_id, request.params.id];
    let queryText = 'INSERT INTO playlist_song (song_id , playlist_id) VALUES ($1, $2) RETURNING id';


    pool.query(queryText, values, (err, queryRes) => {
        console.log(err);
    });
    queryText = 'SELECT * from songs';
    pool.query(queryText, (err, queryRes) => {


        const data = {
            songsList: queryRes.rows
        }

        data.id = id;


        response.render('playlistNewSong', data);
    });

});

///part 3

// Create a route and jsx file that renders a form for the user to register.

// GET /register

// Create a route that accepts the POST request from the form.

// After the user has been put in the DB, set cookies to set them as logged in:

// a cookie for their username
// a cookie for their hashed loggedIn cookie
// their user id
// Redirect them to the home page.

// register
//get form

app.get('/register', (request, response) => {
    response.render('register')

});

//post
app.post('/register', (request, response) => {
    console.log(request.body);
    let newUser = request.body;
    let hashedPassword = sha256(newUser.password + SALT);

    const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';

    const values = [
        newUser.name,
        hashedPassword
    ];

    pool.query(queryString, values, (err, queryRes) => {

        let userID = queryRes.rows[0].id;
        let hashedCookie = sha256(userID + 'loggedin' + SALT);

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', queryRes);

            response.cookie('loggedin', hashedCookie)
            response.cookie('user_id', userID)


            // response.send( queryRes.rows );
            //response render home, after issue fixed
            response.render('home');

        }
    });
});



//login
//get form
app.get('/login', (request, response) => {
    response.render('login')
});

//post


app.post('/login', (request, response) => {
    let newUser = request.body;
    let requestUsername = request.body.name;
    let requestPassword = request.body.password;

    // check in the database for a row with this user
    const queryString = "SELECT * from users WHERE name='" + requestUsername + "'";
    console.log("db query", queryString);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            // if this user exists in the db

            if (result.rows.length > 0) {

                let hashedRequestPassword = sha256(requestPassword + SALT);
                console.log("hashed request password: " + hashedRequestPassword);

                // check to see if the password in request.body matches what's in the db
                //or hashedRequestPassword === requestPassword ?
                if (hashedRequestPassword === result.rows[0].password) {
                    let user_id = result.rows[0].id

                    let hashedCookie = sha256(SALT + user_id);

                    response.cookie('user_id', user_id);
                    response.cookie('hasLoggedIn', hashedCookie);

                    // if it matches they have been verified, log them in
                    response.send('about to log you in')

                } else {

                    response.status(403).send('wrong password');
                }


                //

            } else {
                response.status(403).send('wrong username');

            }


            // redirect to home page
            // response.render('home');
        }
    });

    response.render('home');


});

//favorites

app.get('/login/favorites/new', (request, response) => {
            const queryString = `SELECT * FROM songs`;
        let id = request.params.id;
            //recognise logged in user? how? cookies?

            pool.query(queryString, (err, queryRes) => {

                    const data = {
                        songsList: queryRes.rows
                    }

                    data.id = id;

                    response.render('formForFavorite', data);
                });

            });
//form renders with song library to choose, but submit doesn't work

        app.post('/favorites', (request, response) => {
            let newFavSong = request.body.id;
            let cookie = request.cookies;

            const queryString = `INSERT INTO favorites (song_id, user_id) VALUES ($1, $2) returning *`;

            //const data for songs
            // let values
            //cookies?? how?

            pool.query(queryString, values, (err, queryRes) => {
                if (err) {
                    console.log('query error:', err.stack);
                    response.send('query error');
                } else {
                    response.render('Favorites', data);
                }
            })
        });







        /**
         * ===================================
         * Listen to requests on port 3000
         * ===================================
         */
        const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

        let onClose = function() {

            console.log("closing");

            server.close(() => {

                console.log('Process terminated');

                pool.end(() => console.log('Shut down db connection pool'));
            })
        };

        process.on('SIGTERM', onClose); process.on('SIGINT', onClose);