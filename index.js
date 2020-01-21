console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'weizheng1910',
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





// Add new artist - form page
app.get('/new', (request, response) => {
  
  response.render('new');
});

// Add new artist - submit
app.post('/artists', (request,response) => {
  console.log(request.body);

  let values = [request.body.name, request.body.photo_url, request.body.nationality]
  let query = `INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3) RETURNING *`
  pool.query(query,values,(err,result) =>{
    
    console.log(values)
    response.send("done?")
  });
})


// Get an artist
app.get('/artists/:id', (request, response) => {
  let id = request.params.id;
  let query = `SELECT * from artists WHERE id=${id}`

  pool.query(query,(err,result)=>{
    console.log(result.rows)
    const data = {
      artist: result.rows[0]
    }
    
    response.render('artist',data);
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
