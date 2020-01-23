console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'hwee',
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



/**
 * ===================================
 * Routes
 * ===================================
 */


///////////////////////////////////////////// SHOW ALL ARTISTS /////////////////////////////////////////////
app.get('/artists', (request, response) => {

    let querySelectorAllArtists = ('SELECT * FROM artists');

    pool.query(querySelectorAllArtists, (err, result) => {

        if (err) {
            // err below is a built-in function from express to check error
            console.log("ERRRRR", err);
            response.status(500).send("error");
        } else {

            response.send(result.rows);
        }
    });
});



///////////////////////////////////////////// FORM TO ADD ARTIST ////////////////////////////////////////////
app.get('/artists/new', (request, response) => {
    response.render('add-form')
});



///////////////////////////////////////////// INSERT NEW ARTIST /////////////////////////////////////////////
app.post('/artists', (request, response) => {

    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

    let nameInput = request.body.name;
    let photoInput = request.body.photo;
    let nationalityInput = request.body.nationality;
    const values = [nameInput, photoInput, nationalityInput];

    // console.log(result.rows); - WORKED
    // console.log(request.body); - WORKED

    pool.query(queryString, values, (err, result) => {
        response.redirect('/artists');
    });
});



///////////////////////////////////////////// DISPLAY CHOSEN ARTIST //////////////////////////////////////////
app.get('/artists/:id', (request, response) => {

    let querySelectorAllArtists = ('SELECT * FROM artists');
    const index = parseInt(request.params.id);

    pool.query(querySelectorAllArtists, (err, result) => {

        // console.log(result.rows.length); - WORKED
        // console.log(result.rows[0].id); - WORKED

        for (let i = 0; i < result.rows.length; i++) {
            let chosenIndex = result.rows[i].id;

            if (index === chosenIndex) {
                response.send(result.rows[i]);
            }
        }
    });
});



///////////////////////////////////////////// DISPLAY PLAYLIST//////////////////////////////////////////
app.get('/playlist', (request, response) => {

    let querySelectorPlaylist = ('SELECT * FROM playlist');

    pool.query(querySelectorPlaylist, (err, result) => {

        if (err) {
            // err below is a built-in function from express to check error
            console.log("ERRRRR", err);
            response.status(500).send("error");
        } else {

            response.send(result.rows);
        }
    });
});



///////////////////////////////////////////// SHOW ALL PLAYLISTS /////////////////////////////////////////////
app.get('/playlist', (request, response) => {

    let querySelectorAllPlaylists = ('SELECT name FROM playlist');

    pool.query(querySelectorAllPlaylists, (err, result) => {

        if (err) {
            // err below is a built-in function from express to check error
            console.log("ERRRRR", err);
            response.status(500).send("error");
        }

        // if (this.props.name === null) {
        //     response.send("No playlist, create one now!");
        // }
        else {
            // console.log('I AM HEREEEEEE');
            response.send(result.rows);
        }
    });
});



///////////////////////////////////////////// CREATE NEW PLAYLIST //////////////////////////////////////////
app.get('/playlist/new', (request, response) => {
    response.render('add-playlist');
});



///////////////////////////////// INSERT NEW PLAYLIST + VIEW ALL PLAYLIST //////////////////////////////////
app.post('/playlist', (request, response) => {

    let queryString = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *';

    let nameInput = request.body.playlist_name;
    const values = [nameInput];

    pool.query(queryString, values, (err, result) => {
        response.redirect('/playlist');
    });
});


/* TRY LATER */
/////////////////////////////////////// VIEW PLAYLISTS - based on name /////////////////////////////////////
// app.get('/playlists/name', (request, response) => {

//     let querySelectorAllPlaylist = ('SELECT * FROM playlist');

//     pool.query(querySelectorAllPlaylist, (err, result) => {

//         // if (err) {
//         //     // err below is a built-in function from express to check error
//         //     console.log("ERRRRR", err);
//         //     response.status(500).send("error");
//         // }


//             for (let i = 0; i < result.rows.length; i++) {
//                 console.log(result.rows[i].name);
//                 response.send(result.rows[i].name);
//         }
//     });
// });


/////////////////////////////////////// VIEW ONE PLAYLISTS - based on ID /////////////////////////////////////
app.get('/playlist/:id', (request, response) => {

    let querySelectorAllPlaylist = ('SELECT * FROM playlist');
    const index = parseInt(request.params.id);

    pool.query(querySelectorAllPlaylist, (err, result) => {

        // console.log(result.rows.length); - WORKED
        // console.log(result.rows[0].id); - WORKED

        for (let i = 0; i < result.rows.length; i++) {
            let chosenIndex = result.rows[i].id;

            if (index === chosenIndex) {
                response.send(result.rows[i]);
            }
        }
    });
});




///////////////////////////////// INSERT NEW SONG + VIEW ALL PLAYLIST //////////////////////////////////
app.get('/playlist/new', (request, response) => {
    response.render('add-playlist');
});



//////////////////////////////////////// FORM TO ADD SONG INTO PLAYLIST /////////////////////////////////
app.get('/playlist/:id/newsong', (request, response) => {
    response.render('add-song-playlist');
});


////////////////////////////////////// INSERT NEW SONG INTO PLAYLIST ////////////////////////////////////
app.post('/playlist', (request, response) => {

    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

    let nameInput = request.body.name;
    let photoInput = request.body.photo;
    let nationalityInput = request.body.nationality;
    const values = [nameInput, photoInput, nationalityInput];

    // console.log(result.rows); - WORKED
    // console.log(request.body); - WORKED

    pool.query(queryString, values, (err, result) => {
        response.redirect('/artists');
    });
});



// ///////////////////////////////////////////// SHOW ALL SONGS //////////////////////////////////////////
// app.get('/songs', (request, response) => {

//     let querySelectorAllSongs = ('SELECT * FROM songs');

//     pool.query(querySelectorAllSongs, (err, result) => {

//         if (err) {
//             // err below is a built-in function from express to check error
//             console.log("ERRRRR", err);
//             response.status(500).send("error");
//         } else {

//             const data = result.rows[1];

//             response.render('display-songs', data);
//             console.log(result.rows[1]);

//             // response.send(result.rows);
//         }
//     });
// });




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

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);




