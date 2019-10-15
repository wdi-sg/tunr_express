console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
user: 'new_user',
password: 'password',
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

  // respond with HTML page displaying all pokemon
  response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});


// add to the database a new artist
app.post('/artists', (request, response) => {
let data = {warning: ""};
console.log('post to artists');
  if (request.body.name === "" || request.body.photo_url === "" || request.body.nationality === "") {
    data = {warning: "Empty name or other data..."}; 
      } else  { 
    data = {warning: "Artist Added!"}; 
      }

let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';

const values = [request.body.name , request.body.photo_url, request.body.nationality];

 pool.query(queryText, values, (err, res) => {
       if (err) {
         console.log("query error", err.message);
       } else {
         console.log("id of the thing you just created:", res.rows[0].id);
       }
   });

  response.render('new', data);


});


app.get('/artists/:id/edit', (request, response) => {
    let inputId = parseInt( request.params.id )
  const queryString = 'SELECT * from artists WHERE id='+inputId;

  pool.query(queryString, (err, result) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    console.log(err);
    // let inputId = parseInt( request.params.id );
    const data = result.rows[0];


  response.render('edit', data);
    
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
