
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
 * Routes - Artists
 * ===================================
 */


app.post('/artists', (request, response) => {
  let text =`INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id`;
  let values = [request.body.name, request.body.photo_url, request.body.nationality];
  pool.query(text, values);
  response.render('home');
});

app.get('/artists', (request, response) => {
  let artistsList = [];;
  let text = "SELECT * FROM artists";
  pool.query(text, (err,results) => {
    for (i=0; i<results.rows.length;i++) {
      artistsList.push(results.rows[i].name);
    };
    console.log(artistsList);
    let data = {artists: artistsList};
    response.render('home', data);
  });  
});

app.get('/artists/new', (request, response) => {
  response.render('new');
});

/**
 * ===================================
 * Routes - playlist & songs
 * ===================================
 */

app.post('/playlist', (request, response) => {
  let text =`INSERT INTO playlist (name) VALUES ($1) RETURNING id`;
  let values = [request.body.name];
  pool.query(text, values);
  response.render('homeplaylist');
});

app.get('/playlist', (request, response) => {
  let list = [];
  let text = `SELECT * FROM playlist`;
  pool.query(text, (err,results) => {
    for (i=0; i<results.rows.length; i++) {
      list.push(results.rows[i].name);
    };
    let data = {playlists: list};
    console.log(data.playlists)
    response.render('homeplaylist', data);
  });  
});

app.get('/playlist/new', (request, response) => {
  response.render('newplaylist');
});

app.get('/playlist/:id', (request, response) => {
  let text = `SELECT * FROM playlist WHERE id=$1`;
  let value= [parseInt(request.params.id)];
  pool.query(text, value, (err,results) => {
    console.log(results.rows[0]);
    data = results.rows[0];
    response.render('showplaylist',data);
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


//To create table & seed: 
//psql -d tunr_db -U safraz -f tables.sql
//psql -d tunr_db -U safraz -f artist_data.sql
//psql -d tunr_db -U safraz -f songs.sql