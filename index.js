console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'tengchoonhong',
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
  response.redirect('home');
});

app.get('/home', (request, response) => {
  response.render('home');
});

app.get('/home/index', (request, response) => {
  let text = `SELECT * FROM artists`;

  pool.query(text, (err, indexResult) => {
    response.send(indexResult.rows)
  });
})

app.get('/home/show', (request, response) => {

});

app.get('/home/new', (request, response) => {
  response.render('new');
});

app.post('/home/new', (request, response) => {
  let text = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)`
  const values = [request.body.name, request.body.photo, request.body.nationality]

  pool.query(text, values, (err, newArtist) => {
    response.send(newArtist.rows)
  });
});

// app.post('/pokemons', (request, response) => {

//   let text = 'INSERT INTO pokemons (name, img, weight, height) VALUES ($1, $2, $3, $4)'

//   const values = [request.body.name, request.body.img, request.body.weight, request.body.height]

//   pool.query( text, values, (err, queryResult) => {
//       console.log("result", queryResult.rows);

//       response.send(queryResult.rows)
//   })

// })


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
