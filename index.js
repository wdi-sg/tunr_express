console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
var sha256 = require('js-sha256');

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
const cookieParser = require('cookie-parser')
// Init express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());

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
      response.render('new')
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

/**
 * ===================================
 * Tracklist feature
 * ===================================
 */

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
    const queryString = "SELECT songs.title, songs.album, artists.name FROM songs INNER JOIN artists ON songs.artist_id = artists.id"

    pool.query(queryString, trackListQuery )

});

/**
 * ===================================
 * Playlist id feature
 * ===================================
 */

app.get('/playlist/:id', (request, response) => {
  //console.log("this", request.body);

  const queryString = "SELECT songs.title, songs.album, artists.name FROM songs INNER JOIN artists ON (songs.artist_id = artists.id) WHERE artists.id = " + request.params.id ;

  const playListQuery = (playListQueryError, result) => {
    if(playListQueryError){
      console.log("Error found!");
      console.log(playListQueryError);
    }else{
      response.send(result.rows)
      response.render('songsByArtist')

    }
  }
    pool.query(queryString, playListQuery )

});


/**
 * ===================================
 * Create New Playlist feature
 * ===================================
 */


app.get('/newPlaylist', (request, response) => {
  response.render('new');
});

app.post('/newPlaylist', (request, response) => {
  console.log("this", request.body);

  const artistAddQuery = (queryError, result) => {
    if(queryError){
      console.log("Error found!");
      console.log(queryError);
    }else{
      console.log(result);
    }
  }
    const queryString = "";
    const insertValues = [request.body.artistName,request.body.photoUrl,request.body.nationality];

    pool.query(queryString, insertValues, artistAddQuery )

});

/**
 * ===================================
 * Create Favorites feature
 * ===================================
 */

 app.get('/newPlaylist', (request, response) => {
  response.render('new');
});

app.post('/newPlaylist', (request, response) => {
  console.log("this", request.body);

  const artistAddQuery = (queryError, result) => {
    if(queryError){
      console.log("Error found!");
      console.log(queryError);
    }else{
      console.log(result);
    }
  }
    const queryString = "";
    const insertValues = [request.body.artistName,request.body.photoUrl,request.body.nationality];

    pool.query(queryString, insertValues, artistAddQuery )

});







/**
 * ===================================
 * Create Registration feature
 * ===================================
 */

///// create a row in the users table

app.get('/', (request, response) => {
  response.render('home');
});

///// registration
// app.get('/users/new', (request, response) => {
app.get('/register', (request, response) => {

  // send response with some data (a string)
  response.render('register');
});

app.post('/register', (request, response) => {
  console.log(request.body)

  // TODO : check to make sure that the name is unique in the db:
  // SELECT * FROM users WHERE name=request.body.name
  //let getUserQuery = "SELECT * FROM users WHERE name=request.body.name";
  // send response with some data (a string)
  //response.send("WORKSS");
  let registerQuery = "INSERT INTO users (name, password) VALUES ($1, $2)";

  var hashedPassword = sha256(request.body.password);

  const values = [request.body.name, hashedPassword];
  console.log(request.body.name);
  console.log(hashedPassword);

  pool.query(registerQuery, values, (error, result)=>{
    if( error ){
      console.log("ERRRRRRRRRROR");
      console.log(error);
    }
    response.cookie('logged in', 'true');
    console.log("YAAAYYYYY");

  })

});

app.get('/login', (request, response) => {
  // send response with some data (a string)
  response.render('login');
});

app.post('/login', (request, response) => {
  console.log(request.body)

  let getUserQuery = "SELECT * FROM users WHERE name=$1";

  const values = [request.body.name];

  pool.query(getUserQuery, values, (error, result)=>{
    if( error ){
      console.log("ERRRRRRRRRROR");
      console.log(error);
    }
    console.log("YAAAYYUUUUUUUYYYYYY");
    console.log("SELECT RESULT:")
    console.log(result.rows);

    // if there is a result in the array
    if( result.rows.length > 0 ){
      // we have a match with the name
      // response.send("heeeyyyy");heeeyyyy

      let requestPassword = request.body.password;

      if(sha256( requestPassword) === result.rows[0].password){
        response.cookie('logged in', 'true');
        response.send("you are you!");
      }else{

        response.status(403);
        response.send("sorry!!!!!!!");
      }

    }else{
      // nothing matched
      response.status(403);
      response.send("sorry!");
    }

  })

  // send response with some data (a string)
});


app.get('/dashboard', (request, response) => {

  if( request.cookies['logged in'] === 'true'){

    response.send("your dashboard");
  }else{

    response.status(403);
    response.send("not allowed");
  }
});

app.delete('/logout', (request, response)=>{
  response.clearCookie('logged in');
  response.send("WOW Delerte");

});


app.get('/', (request, response) => {

  const data = {
    loggedIn : false
  };

  if( request.cookies['logged in'] === 'true'){
    data.loggedIn = true;
  }

  // send response with some data (a string)
  response.render('home', data);
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
