console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'andrealmj',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
  password: 'pg'
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

// RESTful Routing
// URL            HTTP Verb   Action      SQL
// /artists/      GET         index       SELECT
// /artists/new   GET         new         N/A (SELECT)
// /artists       POST        create      INSERT
// /artists/:id   GET         show        SELECT
// /artists/:id/  edit        GET edit    SELECT
// /artists/:id   PATCH/PUT   update      UPDATE
// /artists/:id   DELETE      destroy     DELETE

app.get('/', (req, res) => {
    res.redirect('/artists/');
})

//building the index feature (displays all artists)
app.get('/artists/', (request, response) => {
    //responds with HTML page displaying all artists
    let text = `SELECT * FROM artists`;

    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        } else {
            response.render('home', { artists: result.rows });
        }
    });
});

//building the show feature (displays artist according to id)
app.get('/artists/:id', (request, response) => {
    let artistID = request.params.id;
    let text = `SELECT * FROM artists WHERE id = ${artistID}`

    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        } else {
            response.render('artist', {artists: result.rows});
        }
    });
});

//create a new artist
// app.get('/artists/new', (request, response) => {
//   // respond with HTML page with form to create new artist
//     pool.query('SELECT * FROM artists', (err, result) => {
//         if (err) {
//             console.error('query error: ', err.stack);
//             response.send('query error');
//         } else {
//             const queryResult = result;
//             response.render('newArtist', queryResult);
//         }
//     })
// });

app.get('/new', (request, response) => {
    response.render('newArtist');
});

//post the new artist info from the form
app.post('/artists/', (request, response) => {
    let text = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id`;
    let values = [];

    console.log(request.body);
    values.push(request.body.name);
    values.push(request.body.photo_url);
    values.push(request.body.nationality);
    console.log(values);

    pool.query(text, values, (err, result) => {
        if (err) {
            console.error('query err', err.stack);
            response.send('query error')
        } else {
            const newArtistId = result.rows[0].id;
            console.log(newArtistId);
            response.redirect('/artists/'+newArtistId);
        }
    })
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
