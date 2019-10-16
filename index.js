console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'jasminesis',
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

app.get('/', (request, response) => {
    // query database for all artist

    // respond with HTML page displaying all artist
    response.render('home');
});

app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('new');
});

app.post('/artists', (request, response) => {
    let input = request.body;
    let inputArr = [input.name, input.photo_url, input.nationality];
    console.log(inputArr);

    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`
    pool.query(queryString, inputArr, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            console.log('query results: ', result);
            response.send(result.rows)
        }
    })
})

app.get('/artists/:id', (request, response) => {
    let inputID = request.params.id;

    const queryString = `SELECT * FROM artists WHERE id=${inputID}`

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            console.log('query results: ', result);
            response.send(result.rows)
        }
    })
})

app.get('/artists/:id/songs', (request, response) => {
    let inputID = request.params.id;

    const queryString = `SELECT * FROM songs WHERE artist_id=${inputID}`

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            // console.log('query results: ', result);
            const data = {
                result: result.rows
            }
            console.log(data)
            response.render('showsongs', data)
        }
    })
})

// // Display the form for editing a single artist
// app.get('/artist/:id/edit', (request, response) => {
//     let inputID = request.params.id;

//     const queryString = `SELECT * FROM artists WHERE id=${inputID}`

//     pool.query(queryString, (err, result) => {
//         if (err) {
//             console.log('query error: ', err.stack)
//             response.send('query error');
//         } else {
//             console.log('query results: ', result);
//             response.send(result.rows)
//         }
//     })
// })
app.get('/playlists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('newplaylist');
});

app.post('/playlists', (request, response) => {
    let input = request.body;
    let inputArr = [input.name];
    console.log(inputArr);

    const queryString = `INSERT INTO playlists (name) VALUES ($1) RETURNING *`
    pool.query(queryString, inputArr, (err, result) => {
        if (err) {
            console.log('query error: ', err.stack)
            response.send('query error');
        } else {
            console.log('query results: ', result);
            response.send(result.rows)
        }
    })
})

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