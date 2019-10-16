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
app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public/'));
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  // query database
// show all the artists
  const queryString = 'SELECT * from artists';
 pool.query(queryString, (err, result) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    console.log(err);
    // let inputId = parseInt( request.params.id );
            const data = {
            artistsobj: result.rows
        }
    data.pageTitle = "All Artists";
         console.log("artist data:", data);
  // respond with HTML page displaying all artists
    response.render('home', data);
  });
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

const values = [request.body.name, request.body.photo_url, request.body.nationality];

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

app.get('/artists/:id', (request, response) => {
    let inputId = parseInt( request.params.id )
  const queryString = 'SELECT * from artists WHERE id='+inputId;

  pool.query(queryString, (err, result) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    console.log(err);
    // let inputId = parseInt( request.params.id );
        console.log(result.rows[0]);
    const data = result.rows[0];


  response.render('show', data);
    
      });
});

app.put('/artists/:id', (request, response) => {
          console.log('edit the data');
  let inputId = parseInt( request.params.id )
  const queryString = `UPDATE artists SET name='${request.body.name}', photo_url='${request.body.photo_url}', nationality='${request.body.nationality}' WHERE id=${request.params.id}`;
  // let queryString = 'UPDATE artists SET name=($1),photo_url=($2),nationality=($3) WHERE id ='+inputId;

// const values = [request.body.name, request.body.photo_url, request.body.nationality];
  pool.query(queryString, (err, result) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    console.log(err);
    // let inputId = parseInt( request.params.id );
    let data = request.body;
    console.log(queryString);
        console.log(data);
  response.render('edit', data);
    
      });
});

// PLAYLIST SECTION

// Give NEW PLAYLIST FORM
app.get('/playlist/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new_playlist');
});

// ADD a NEW PLAYLIST 
// add to the database a new artist
app.post('/playlist', (request, response) => {
let data = {warning: ""};
console.log('post to playlist');
  if (request.body.name === "") {
    data = {warning: "Empty name or other data..."}; 
      } else  { 
    data = {warning: "Playlist Added!"}; 
      }

let queryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING id';

const values = [request.body.name];

 pool.query(queryText, values, (err, res) => {
       if (err) {
         console.log("query error", err.message);
       } else {
         console.log("id of the thing you just created:", res.rows[0].id);
       }
   });

  response.render('new_playlist', data);
});

// SHOW ALL PLAYLISTS

app.get('/playlist', (request, response) => {
  // query database
// show all the artists
  const queryString = 'SELECT * from playlist';
 pool.query(queryString, (err, result) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    console.log(err);
    // let inputId = parseInt( request.params.id );
            const data = {
            playlistsobj: result.rows
        }
    data.pageTitle = "All Playlists";
         // console.log("playlist data:", data);
  // respond with HTML page displaying all artists
    response.render('home_playlist', data);
  });
 });

// FORM TO ADD THE SONGS IN THE PLAYLIST OPTIONS
app.get('/playlist/:id/newsong', (request, response) => {
      let inputId = parseInt( request.params.id )
  // query database
// show all the artists
  const queryString = 'SELECT * from songs';
 pool.query(queryString, (err, result) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    console.log(err);
    // let inputId = parseInt( request.params.id );
            const data = {
            songsobj: result.rows
        }
    data.pageTitle = "All Playlists";
    data.id = inputId;
    data.action = "/playlist/"+inputId+"/newsong";
         // console.log("playlist data:", data);
  // respond with HTML page displaying all artists
    response.render('new_song', data);
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
