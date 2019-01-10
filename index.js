console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'apple',
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

  // respond with HTML page displaying all artist
    let queryText = "SELECT * FROM artists"
    pool.query(queryText, (err, queryResult) => {
        res.send(queryResult.rows);
    })
});


app.get ('/:id', (req, res) => {
    let id = req.params.id;
    let queryText1 =`SELECT * FROM artists WHERE id=${id}`;
    pool.query(queryText1, (err, queryResult) => {
        res.send(queryResult.rows[0]);
    })
})


app.get ('/edit/:id', (req, res) => {
    let id = req.params.id;
    let queryText2 =`SELECT * FROM artists WHERE id=${id}`;
    pool.query(queryText2, (err, queryResult) => {
        res.render('edit', queryResult.rows[0]);
    })
})

app.get('/new/artist', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new',{});
});


app.post('/new/artist/updated', (request, response)=> {
    response.send(request.body);
    let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
    const values = [request.body.name, request.body.photo_url, request.body.nationality]
    pool.query(queryText, values, (err, res) => {
    });
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