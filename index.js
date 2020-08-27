console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'clairetay',
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

app.get('/artists/', (request, response) => {
  let queryText = "SELECT * FROM artists"
  pool.query(queryText, (err, res)=>{
    if(err){
        console.log(err.message)
        response.send("error occured")
    } else {
        response.render('home', res)
    }
  })
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artists', (request, response) => {
  // respond with HTML page with form to create new pokemon
  let queryText = "INSERT INTO artists(name,photo_url,nationality) VALUES($1,$2,$3)"
  let values = [request.body.artistName, request.body.photoURL, request.body.nationality]
  pool.query(queryText, values, (err, res)=>{
    if(err){
        console.log(err)
        response.send("Error occurred. Data not added.")
    } else {
        response.send("Artist created successfully! <a href='/artists/'>Back to homepage.</a>")
    }
  })

});

app.get('/artists/:id', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.get('/artists/:id/edit', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.put('/artists/:id/edit', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.delete('/artists/:id/edit', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
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