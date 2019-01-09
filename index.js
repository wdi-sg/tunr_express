console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jasonw',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
  password: '1234'
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

// Get form for entering new artist
app.get('/artists/new',(req,res) => {
    res.render('new')
});


//Build the index feature for artists
app.get('/artists', (req, res) => {

// Get all the artists, output in object view
    const queryText = `SELECT * FROM artists ORDER BY id ASC`;

   pool.query(queryText,(err, queryResult) => {
        if (err) {
            console.log('Error: ', error);
        } else {
            console.log("Result: ", queryResult.rows);
            //console.log(queryResult.rows);
             res.render('home', {artists: queryResult.rows});
         };
    });
});

//Build the show feature for an artist
app.get('/artists/:id', (req, res) => {

    let id = req.params.id;
    const queryText = `SELECT * FROM artists WHERE id = '${id}'`;

   pool.query(queryText,(err, queryResult) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("result", queryResult.rows);
            res.render("displaySingleArtist", {artists: queryResult.rows});
        };

 //response.render('home');
    });
});


/*app.get('/artists/:name', (req, res) => {

    let name = req.params.name;
    console.log(name);
    const queryText = `SELECT * FROM artists WHERE name ='${name}'`;
    console.log(queryText);

   pool.query(queryText,(err, queryResult) => {
        console.log(err);
        console.log("result", queryResult.rows);

        res.send(queryResult.rows);
 //response.render('home');
    });
});*/


app.post('/artist', (request, response) => {

  //let id = request.params.id;
  let queryText = 'INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3)';
  const values = [request.body.name,request.body.photo_url,request.body.nationality];

  pool.query(queryText, values, (err, queryResult) => {
            if (err) {
                console.log('Error', err);
            }
            console.log("result", queryResult.rows);
            response.render("new", queryResult.rows);
  });
});


app.put('/artists/:id', (req, res) => {
    let artistId = parseInt(req.params.id);
    let artists;


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
