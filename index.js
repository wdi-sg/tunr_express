console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'Daniel',
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

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Landing page
app.get('/', (request, response) => {
    response.send("Hello Music World");
});

// add artist form
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artists
    console.log("rendering new artist form!");
    response.render('new');
});

// add a NEW artist
app.post('/artists', (req, res) => {
    console.log("creating new artist!");

    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING*;';
    let newArtistArry = [req.body.name, req.body.photo_url, req.body.nationality];

    pool.query(queryString, newArtistArry, (err, result) => {
        if (err) {
            console.error('query error:', err.message)
            res.send('query error')
        } else {
            console.log('query result:', result)
            // redirect to home page
            res.send(result.rows)
        }
    })

});

// see an artist!
app.get('/artists/:id', (req, res) => {
    console.log("finding artist!");
    let id = req.params.id;
    const queryString = `SELECT * FROM artists WHERE id = ${id}`

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.message);
            res.send('query error');
        } else {
            console.log("found artist!");
            console.log('query result:', result);
            // console.log();
            // redirect to home page
            // let artistData = 
            console.log(result.rows);
            res.send(result.rows);
        }
    })

})

// see all songs of from an artist!
app.get('/artists/:id/songs', (req,res) => {
    console.log("tracking discography!")
    let id = req.params.id;
    const queryString = `SELECT * FROM songs WHERE artist_id = ${id}`;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.message);
            res.send('query error');
        } else {
            console.log("found artist's songs!");
            console.log('query result:', result);
            // console.log();
            // redirect to home page
            // let artistData = 
            console.log(result.rows);
            res.send(result.rows);
        }
    })
})

// see all artists
app.get('/artistsall/', (req,res) => {
    console.log("getting all the artists!");
    let queryString = "SELECT * FROM artists;";
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.message);
            res.send('query error');
        } else {
            console.log("got all artists!");
            // // console.log();
            // // redirect to home page
            // // let artistData = 
            // console.log(result.rows);
            res.send(result.rows);
        }
    });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3020, () => console.log('~~~ Tuning in to the waves of port 3020 ~~~'));

let onClose = function () {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);