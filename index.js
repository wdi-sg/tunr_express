console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'valenlyn',
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

  response.render('home');

});

app.get('/new', (request, response) => {

  response.render('new');

});

app.post('/new', (request, response) => {

    console.log(request.body);

    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${request.body.name}', '${request.body.photo_url}', '${request.body.nationality}') RETURNING *`;

    pool.query(queryString, (err, result) => {

        if (err) {
            console.log('query error', err.stack);
            response.send('query error');
        } else {
            const data = result.rows;
            response.render('artists', {artists: data});
        }

    })


})

app.get('/artists/:id', (request, response) => {

    let index = request.params.id;
    const queryString = `SELECT * FROM artists WHERE id=${index}`;

    pool.query(queryString, (err, result) => {

    if (err) {
        console.log('query error', err.stack);
        response.send('query error');
    } else {
        console.log('query result', result.rows);

        const data = result.rows;
        response.render('artists', {artists: data});
    }

    })

});

app.get('/artists', (request, response) => {

    const queryString = 'SELECT * FROM artists';

    pool.query(queryString, (err, result) => {

        console.log(err, result);
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);

            const data = result.rows;
            response.render('artists', {artists: data});

        }
    })

});






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