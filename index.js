console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'ronniechua',
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



//display all artists as a list
app.get('/', (req, res) => {
  // query database for all pokemon
pool.query( 'SELECT * FROM artists',(err, artistResult) => {
if(err) {
    console.log(err);
}
let artist = {};
artist.artlist = [];
artist.artlist = artistResult.rows;
// console.log(artist);

  // respond with HTML page displaying all pokemon
  res.render('home', artist);
});
});


app.get("/new", (req,res) => {
        res.render('newArtist');
    });


// post data from form
app.post('/artist', (request,response) => {

// console.log(request.body);

let list = request.body;
let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

let values = [];
values.push(list.name);
values.push(list.photo_url);
values.push(list.nationality);
// console.log(values);

pool.query(queryText, values, (err, res) => {
    if (err) {
      console.log("query error", err.message);
    } else {
        let created = res.rows;
      // console.log("thing you just created:" + res.rows);
      response.render('createSuccess', created);
    }
});

        // response.render('addedrecipe', {recipes:newRecipe});

});

//display one page on artist information
app.get('/artist/:id', (req, res) => {
    let id = req.params.id;
pool.query( 'SELECT * FROM artists WHERE id =' + id,(err, artistId) => {

let artist = {};
artist.list = [];
artist.list = artistId.rows;
res.render('display', artist);

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