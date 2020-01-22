console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'AngelFerreros',
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

  //Define a route with view defined at /. For now it should say Hello World when you visit that url.
  // respond with HTML page
app.get('/', (request, response) => {
  response.render('home');
});

  // Build a feature that creates a new artist in the database.
  // respond with HTML page with form to create new artist
app.get('/artists/new', (request, response) => {
  response.render('new');
});


// accepts form request and process request to add data in DB
app.post ('/artists', (request,response)=>{
 let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
    const values = [
    request.body.name,
    request.body.photo_url,
    request.body.nationality];

        pool.query(queryText, values, (err,result)=>{
            console.log(`insert query`);
            if(err){
                console.log(err);
                response.send('error',err);
            } else {
                console.log('insert new artist completed');
                response.send(result.rows);
            }
        });
});

//show page for a single artist
app.get('/artists/:id',(request, response)=>{
  let artistId = parseInt(request.params.id);
  console.log(artistId);
  let queryText = "SELECT * FROM artists WHERE id ="+artistId;
    pool.query(queryText, (err,result)=>{
      console.log("show info:",result.rows);
      const data = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        photo_url: result.rows[0].photo_url,
        nationality: result.rows[0].nationality };
      response.render('info',data);
    });
});

app.get('/artists/:id/songs', (request,response)=> {
//get the artist_id
  let artistId = parseInt(request.params.id);
  let query = "SELECT * FROM artists WHERE id="+artistId;
    pool.query(query, (err, result)=>{
      if(err){
        console.log("Error:", err);
        response.status(500).send("error");
      }
      else {
        // if result is not empty
        let artist_id = result.rows[0].id;
        let artist_name = result.rows[0].name;
        console.log(artist_name);
        //select title from songs where artist_id = (value above)
        let query = "SELECT title FROM songs WHERE artist_id="+artist_id;
        var responseArray =[];
          pool.query(query, (titleErr, titleResult)=>{
          console.log(titleResult);
          let titleArray = titleResult.rows;
          const data = {
              title: titleArray,
              name: artist_name
            };
          response.render('songs',data); //get all songs to print
        });
      }
    })
});


//get the index page for artists
app.get('/artists', (request,response)=> {

let query = 'SELECT name, photo_url, nationality from artists';
    pool.query(query, (err, result)=>{
      console.log(result);
      let


    });

response.render('ArtistIndex',); //render page to show ALL artist photos, name and nationality

});

//list all the playlists
app.get('/playlist', (request, response) => {
  let query = 'SELECT name from playlist';
    pool.query(query, (err,result)=>{
        if(err){
          console.log(err);
          response.status(500).send("error");
        }
        else{
        console.log("show info:",result.rows);
        const data = {
          name: result.rows
        };
        response.render('playlist',data);
        }
    });
});

// GET /playlist/new - render the form to create a new playlist
app.get('/playlist/new',(request, response) => {
  response.render('PlaylistForm');
});

app.post('/playlist',(request, response) => {

  let queryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *';
    const values = [request.body.playlist_name];

        pool.query(queryText, values, (err,result)=>{
            console.log(`insert query`);
            if(err){
                console.log(err);
                response.send('error',err);
            } else {
                console.log('insert new playlist completed');
                response.redirect('/playlist');
            }
        });
});


//add song to playlist
  //SELECT title from songs
    //results.row = array of title objects for ALL artists
    //render page with dropdown for all songs and all playlists
    //button to create new playlist




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
