console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'marcus',
  password: 'happytreefriends',
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
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//public folder for CSS
app.use(express.static('public'))
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
//copy paste this code to create table quickly
// psql -d tunr_db -U marcus -f tables.sql
// psql -d tunr_db -U marcus -f songs.sql
// psql -d tunr_db -U marcus -f artist_data.sql


//artist index
app.get('/artists', (request, response) => {
  //get info from database on artists
  pool.query('SELECT * FROM artists', (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }else{
      var dataSet = {
        artists: result.rows
      }
      response.render('artist-index', dataSet);
    }
  })
});

//artist show feature
app.get('/artist/:id/showfeature', (request, response) => {
  //get request params info on which artist was clicked
  var input = 'SELECT id FROM artists where id=$1'
  var values = [request.params.id]
  pool.query(input,values,(err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }else{
      var secondInput = 'SELECT * FROM songs where artist_id=$1';
      var secondValues = [result.rows[0].id];
      pool.query(secondInput,secondValues,(error,res)=>{
        if (error){
          return console.error('Error executing query', error.stack)
        }else{
          var dataSet = {
            artistid: request.params.id,
            artists: res.rows
          }
          response.render('artist-show-feature', dataSet);
        }
      })
    }
  })
});

//create new artist in database
app.get('/artist/create', (request, response) => {
  response.render('create-artist');
});

app.post('/artist/', (request,response)=>{
  var input = 'INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3)';
  var values = [request.body.name,request.body.photo_url,request.body.nationality]
  pool.query(input,values,(err,result)=>{
    if (err){
      return console.error('Error executing query', error.stack)
    }else{
      response.redirect('/artists')
    }
  })
})
//edit form to edit artist info
app.get('/artist/:id/edit',(request,response)=>{
  var input = 'SELECT * FROM artists where id=$1'
  var values = [request.params.id]
  pool.query(input, values, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      var dataSet = {
        artist: result.rows
      }
      response.render("edit-artist",dataSet)
    }
  })
})
//get the database info about selected artist and insert new update
app.put('/artist/:id',(request,response)=>{
  var input = 'SELECT * FROM artists where id=$1'
  var values = [request.params.id]
  pool.query(input, values, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      var secondInput = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 where id=$4'
      var secondValues = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id]
      pool.query(secondInput,secondValues,(err,res)=>{
        if (error){
          return console.error('Error executing query', error.stack)
        }else{
          var redirectLink = '/artist/' + request.params.id + '/showfeature'
          response.redirect(redirectLink)
        }
      })
    }
  })
})
//delete the artist
app.delete('/artist/:id',(request,response)=>{
  var input = 'DELETE FROM artists where id=$1'
  var values = [request.params.id]
  pool.query(input, values, (error,result)=>{
    if (error){
      return console.error('Error executing query', error.stack)
    }else {
      var redirectLink = '/artists'
      response.redirect(redirectLink)
    }
  })
})





/**
 * ===================================
 * Listen to requests on port 3000 - Don't touch this part. It's working as it is!
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
