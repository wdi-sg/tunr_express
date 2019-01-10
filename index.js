console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
  password: 'postgres'
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

/******Set up express app *******/
// app.get('/', (request, response) => {

//   response.send("HELLO WORLD");
// });

/******The Index Feature *******/
// app.get('/artists', (request, response) => {
  
  
//   pool.query('SELECT * FROM artists',(err, queryResult) => {

//     console.log("result", queryResult.rows);

//     response.send(queryResult.rows);  
  
// });
// });

/******The Show Feature *******/
// app.get('/artists/:id', (request, response) => {
  
//   let id = request.params.id;
//   pool.query('SELECT * FROM artists WHERE id='+id,(err, queryResult) => {

//     console.log("result", queryResult.rows);

//     response.send(queryResult.rows);  
  
// });
// });
app.get('/artists/new', (request,response)=> { 

  response.render('new');

});

app.post('/artists/updated', (request, response) => {
  
  //console.log(request.body);
  let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
  const values = [request.body.name, request.body.photo_url, request.body.nationality]
  pool.query(queryText, values, (err, res) => {
    
  });
  
  response.send(request.body);

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
