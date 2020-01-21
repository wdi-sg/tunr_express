
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const configs = {
  user: 'safraz',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};
const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/artists', (request, response) => {
  let text =`INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id`;
  let values = [request.body.name, request.body.photo_url, request.body.nationality];
  pool.query(text, values);
  response.render('home');
});

app.get('/artists', (request, response) => {
  // query database for all pokemon
  // respond with HTML page displaying all pokemon
  response.render('home');
});

app.get('/artists/new', (request, response) => {
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


//To create table & seed: 
//psql -d tunr_db -U safraz -f tables.sql
//psql -d tunr_db -U safraz -f artist_data.sql
//psql -d tunr_db -U safraz -f songs.sql