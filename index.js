console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jarryl',
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
  // query database for all pokemon
  response.send("Hello World");
  // respond with HTML page displaying all pokemon
  // response.render('home');
});

app.get('/artists/', (req, res) => {
    console.log("this triggered")
    pool.query('SELECT * FROM artists;', (err, result) => {
        if (err) {
            console.error("Query Error", err.stack)
        }
        res.render('home', result.rows);
    })
})

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artists', (req, res) => {
    let values = [req.body.name, req.body.photo_url, req.body.nationality];
    pool
        .query("INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3);", values)
        .then(result => console.log(result.rows))
        .catch(err => console.log("error", err.stack))

    res.send("Artist added successfully!")
})

app.get('/artists/:id', (req, res) => {
    pool
        .query("SELECT * FROM artists WHERE id = $1;", [req.params.id])
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => console.log("error", err.stack))
})

app.get('/artists/:id/edit', (req, res) => {
    pool
    .query("SELECT * FROM artists WHERE id = $1;", [req.params.id])
        .then(result => res.render('edit', result.rows[0]))
        .catch(err => console.log("error", err.stack))
})

app.put('/artists/:id', (req, res) => {
    let values = [req.params.id, req.body.name, req.body.photo_url, req.body.nationality]
    pool
    .query("UPDATE artists SET name = $2, photo_url = $3, nationality = $4 WHERE id = $1;", values)
        .then(result => res.send("Entry updated successfully."))
        .catch(err => console.log("put", err.stack))
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