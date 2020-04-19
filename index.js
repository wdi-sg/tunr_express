console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'Vignesh',
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
 * Create feature
 * ===================================
 */

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/new', (request, response) => {
  response.render('new');
});

app.post('/new', (request, response) => {
  console.log("this", request.body);

  const artistAddQuery = (queryError, result) => {
    if(queryError){
      console.log("Error found!");
      console.log(queryError);
    }else{
      console.log(result);
    }
  }
    const queryString = "INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3) RETURNING *";
    const insertValues = [request.body.artistName,request.body.photoUrl,request.body.nationality];

    pool.query(queryString, insertValues, artistAddQuery )

});

/**
 * ===================================
 * Artists index feature
 * ===================================
 */

app.get('/artists', (request, response) => {
  // respond with HTML page with form to create new pokemon
  const artistQuery = ( error, result) => {
    if ( error ){
      console.log("An Errorr!!")
    }else{
        const data ={
          artistNames: result.rows
        }
        response.render('index', data)
        //response.send(result.rows[0].name);
    }
  }
  const queryString = "SELECT * FROM artists;"
  pool.query(queryString, artistQuery )
});

/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/**********PART 2*************************************/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/
/*===================================================*/


//Display the list of songs and artists
// app.get('/playlist/new', (request, response) => {
//   response.send("NEW list");
// });

app.get('/playlist', (request, response) => {
  console.log("this", request.body);

  const trackListQuery = (trackQueryError, result) => {
    if(trackQueryError){
      console.log("Error found!");
      console.log(trackQueryError);
    }else{
      const data = {
        tracks: result.rows
      }
      response.render('tracks', data)
    }
  }
    const queryString = "SELECT songs.title, songs.album, artists.name FROM songs INNER JOIN artists ON songs.artist_id = artists.id ";

    pool.query(queryString, trackListQuery )

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
