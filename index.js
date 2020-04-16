const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'chelseaee',
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
app.use(express.static(__dirname + "/public/"));


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


app.get(`/artists/new`, (req, res) => {

    res.render("new-artist");
});

app.get(`/songs/new`, (req, res) => {

    let command = `SELECT id, name FROM artists`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const data = {
                artistData: result.rows
            }
            res.render("new-song", data);
        }
    });
});

app.post(`/artists`, (req, res) => {

    let values = [req.body.name, req.body.photo_url, req.body.nationality]

    let command = `INSERT INTO Artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`;

    pool.query(command, values, (err, result) => {

        if (err) {
            console.log(`Error in query!!!`, err)
        } else {
            res.redirect(`/artists`)
        }
    })
})

app.get(`/artists/:id/edit`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `SELECT * FROM artists WHERE id = ${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const foundArtist = result.rows[0];
            const data = {
                artistData: foundArtist,
            };
            res.render("edit-artist", data);
        }
    });
});

app.get(`/artists/:id/songs`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `SELECT songs.id, songs.title, artists.name AS artist_name FROM songs INNER JOIN artists ON songs.artist_id = artists.id WHERE artists.id = ${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const foundSongs = result.rows;
            const data = {
                songs: foundSongs
            }
            res.render("artists-songs", data);
        }
    });
});

app.put(`/artists/:id`, (req, res) => {

    const query = parseInt(req.params.id);

    let command = `UPDATE Artists SET name='${req.body.name}', photo_url='${req.body.photo_url}', nationality='${req.body.nationality}' WHERE id = ${query} RETURNING *`

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/artists/${query}`)
        }
    })
})

app.delete(`/artists/:id`, (req, res) => {

    const query = parseInt(req.params.id)

    const command = `DELETE FROM Artists WHERE id = ${query} RETURNING *`

    pool.query(command, (err, result) => {

        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/artists`);
        }

    })

})

app.get(`/artists/:id`, (req, res) => {

    const query = parseInt(req.params.id);

    let command = `SELECT * FROM artists WHERE id = ${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {

            const foundArtist = result.rows[0];

            const data = {
                artistData: foundArtist,
            };

            res.render('artist', data);
        }
    });
})


app.get(`/artists`, (req, res) => {

    let command = `SELECT * FROM artists`

    pool.query(command, (err, result) => {

        if (err) {
            console.log(`There was an error.`);
            console.log(err.message)
        } else {
            const artistArr = result.rows;
            const artistData = {
                artists: artistArr
            }

            res.render('all-artists', artistData)

        }
    })
})


app.get(`/songs`, (req, res) => {

    let command = `SELECT * FROM songs`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`There was an error.`);
            console.log(err.message);
        } else {
            const songData = result.rows;
            const data = {
                songs: songData,
            };

            res.render("all-songs", data);
        }
    });

})

app.get(`/songs/new`, (req, res) => {
    const query = parseInt(req.params.id);
    let command = `SELECT * FROM songs WHERE id=${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`There was an error.`);
            console.log(err.message);
        } else {
            const foundSong = result.rows[0];
            const data = {
                songData: foundSong,
            };

            res.render("song", data);
        }
    });
});



app.get(`/songs/:id`, (req, res) => {
    const query = parseInt(req.params.id);
    let command = `SELECT * FROM songs WHERE id=${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`There was an error.`);
            console.log(err.message);
        } else {
            const foundSong = result.rows[0];
            const data = {
                songData: foundSong,
            };

            res.render("song", data);
        }
    });
});



app.get('/', (request, response) => {
    response.render('home');
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);