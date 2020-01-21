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


app.get('/artists', (request, response) => {

    let querySelectorAllArtists = ('SELECT * FROM artists');

    pool.query(querySelectorAllArtists, (err, result) => {

        if (err) {
            // err below is a built-in function from express to check error
            console.log("ERRRRR", err);
            response.status(500).send("error");
        }

        else {

            console.log("WE GOT IT!");
            console.log(result.rows[0]);
            response.send(result.rows);
        }
    });
});



app.get('/artists/new', (request, response) => {
    response.render('add-form')
});



app.post('/artists', (request, response) => {

    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

    let nameInput = request.body.name;
    let photoInput = request.body.photo;
    let nationalityInput = request.body.nationality;
    const values = [nameInput, photoInput, nationalityInput];

    // console.log(result.rows);
    // console.log(request.body);

    pool.query(queryString, values, (err, result) => {
        response.redirect('/artists');
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