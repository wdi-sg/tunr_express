console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'cash',
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

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, res) => {
    // query database for all pokemon
    let text = `SELECT * FROM artists;`
    pool.query(text, (err, result) => {
        let passObj = result.rows;
        res.render('home', {
            passObj: passObj
        });
    })
    // respond with HTML page displaying all pokemon
    // response.render('home', );
});

app.get('/artist/', (req, res) => {
    let text = `SELECT * FROM artists;`
    pool.query(text, (err, result) => {
        let passObj = result.rows;
        res.render('home', {
            passObj: passObj
        });
    })
});

app.get('/artist/:id/songs', (req, res) => {
    let text = `SELECT * FROM songs WHERE artist_id = ${req.params.id}`
    pool.query(text, (err, result) => {
        let passObj = result.rows;
        res.render('songs', {
            passObj: passObj
        });
    })
});

app.get('/artist/:id/songs/new', (req, res) => {
    let text = `SELECT * FROM artists WHERE id = ${req.params.id}`
    pool.query(text, (err, result) => {
        let passObj = result.rows[0];
        res.render('newArtSong', {
            passObj: passObj
        });
    })
});

app.post('/artist/:id/songs', (req, res) => {
    let text = `INSERT INTO songs(title, album, preview_link, artwork, artist_id) VALUES($1, $2, $3, $4, $5);`
    let values = [req.body.title, req.body.album, req.body.preview, req.body.artwork, req.params.id];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("new artist song insert error: ", err.stack);
        } else {
            console.log("new art song insert success!", result.rows[0]);
            let showAll = `SELECT * FROM songs WHERE artist_id = ${req.params.id}`
            pool.query(showAll, (err, result) => {
                let passObj = result.rows;
                res.render('songs', {
                    passObj: passObj
                });
            });
        };
    });

});



app.get('/new', (request, response) => {
    // respond with HTML page with form to create new pokemon
    response.render('new');
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