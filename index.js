console.log("starting up!!");

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
  res.render("new");
});

app.post(`/artists`, (req, res)=> {

  let values = [req.body.name, req.body.photo_url, req.body.nationality]

  let command = `INSERT INTO Artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`;

  pool.query(command, values, (err, result)=> {

    if (err) {
      console.log(`Error in query!!!`, err)
    } else {
      res.redirect(`/artists`)
    }
  })
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

            res.render('home', artistData)

        }
    })
})


app.get('/', (request, response) => {
    // query database for all pokemon

    // respond with HTML page displaying all pokemon
    response.send('home');
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