console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'leowzhenkang',
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









//render home for app with all artists name
app.get('/artists', (request, response) => {
    const queryString = 'SELECT * FROM artists'
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log(result)
            let data = {
                artistsData: result.rows
            }
            console.log(data)
            response.render('home', data);
        }
    });
});

//render form for adding new artists
app.get('/artists/new', (request, response) => {
    response.render('new');
});
//POST function for adding new artists
app.post('/artists', (request, response) => {
    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)'
    console.log(request.body)

    const values = [
        request.body.name,
        request.body.photo_url,
        request.body.nationality
    ];
    console.log(values)

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result);

            // redirect to home page
            response.redirect("/artists");
        }
    });
});

//for displaying details of 1 artist
app.get('/artists/:id', (req, response) => {
    const queryString = 'SELECT * from artists WHERE id=' + req.params.id;

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            // console.log(result.rows)
            let data = {
                artistsData: result.rows
            }
            response.render("artist", data)
                // response.send(result.rows[req.params.id - 1]);
        }
    });
});

//for displaying all songs of 1 artist
app.get('/artists/:id/songs', (req, response) => {
    const queryString = "SELECT * FROM songs WHERE artist_id=" + req.params.id;

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log(req.params.id - 1)
            response.send(result.rows);
        }
    });
});
//render form for adding new play list
app.get('/playlist/new', (request, response) => {
    response.render('playlistNew')
})

//POST function for adding new playlist
app.post('/playlist', (request, response) => {
    const queryString = 'INSERT INTO playlist (playlist) VALUES ($1)'

    const values = [
        request.body.playlist,
    ];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result);

            // redirect to home page
            response.send("added!");
        }
    });
});


app.get('/playlist/:id/newsong', (request, response) => {
    console.log("adding new song");
    const queryString = "SELECT * FROM songs";
    const queryString2 = "SELECT * FROM playlist";

    pool.query(queryString, (err, result) => {
         console.log("this result is from songs"+result);

        if (err) {
            console.error('query error:', err);
            response.send('query erssssror');

        }else{

            pool.query(queryString2, (err2, result2) => {
                console.log("this result is from playlist"+ result2);
                if (err2) {
                    console.error('query error:', err2);
                    response.send('query error2');
                }else{
                    let allData = {
                        playlistData : result2,
                        songData : result
                    }
                    console.log("sending data" , allData);
                    response.render("playlistAddSong", allData)
                }
            })
        }
    });
})


//app.get to display a single playlist
app.get('/playlist/:id', (request, response) => {
        const queryString = "SELECT * FROM playlist WHERE id=" + request.params.id;

        pool.query(queryString, (err, result) => {
            if (err) {
                console.error('query error:', err.stack);
                response.send('query error');
            } else {
                console.log(request.params.id - 1)
                response.send(result.rows);
            }
        });
    })
    //get request to render form to add song to playlist

//POST function for adding new song to playlist
app.post('/playlist/newsong', (request, response) => {
    const queryString = 'INSERT INTO playlist_song (song_id) VALUES ($1)'

    const values = [
        request.body.songId,
    ];
    console.log(values)

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result);

            // redirect to home page
            console.log(request.body)
            response.send("added new song t00000o playlist!");
        }
    });
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

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);