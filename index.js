console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'Sheryl',
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

//artists index
app.get('/artists', (req, res) => {

    let text = "SELECT * FROM artists ORDER BY id ASC";
    pool.query( text,(err, result) => {
        // console.log("result", result.rows);

        res.render("home", {artists: result.rows});
        // res.send(result.rows);
    });
})

//INDIVIDUAL ARTIST
app.get('/artists/:id', (req, res) => {

    let id = req.params.id;
    let text = `SELECT * FROM artists WHERE id=${id}`;
    pool.query( text,(err, result) => {
        res.render("artist", {artists: result.rows[0]});

        // res.send(result.rows);

    });
})


// INSERT
// app.get('/artists/new', (req, res) => {
//         // console.log("result", result.rows);
//         res.render("create")
//     });


// app.post('/artists', (req, res) => {

//     let text = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)'

//     const values = [req.body.name, req.body.photo_url, req.body.nationality]

//     pool.query( text, values, (err, result) => {
//         res.render("create", {artists: result.rows});

//     });
// })

app.get('/artists/:id/edit', (req, res) => {

    let id = req.params.id;
    let text = `SELECT * FROM artists WHERE id=${id}`;
    pool.query( text,(err, result) => {
        res.render("edit", {artists: result.rows[0]});

        // res.send(result.rows);

    });
})

app.put('/artists/:id', (req, res) => {
    let text = "UPDATE artists SET name = $2, photo_url=$3, nationality =$4 WHERE id = $1";
    const values = [req.params.id, req.body.name, req.body.photo_url, req.body.nationality]
    pool.query( text, values, (err, result) => {
        res.redirect("/artists/" + req.params.id)
    });
})





// app.get('/', (req, res) => {
//   // query database for all pokemon

//   // respond with HTML page displaying all pokemon
//   res.render('home');
// });

// app.get('/new', (req, res) => {
//   // respond with HTML page with form to create new pokemon
//   res.render('new');
// });


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
