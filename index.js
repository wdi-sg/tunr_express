/**
 * ===================================
 * Configurations and set up
 * ===================================
 */


console.log("starting up!!");

const express = require('express');
const app = express();

const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'hilmijohari',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});


const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const cookieParser = require('cookie-parser')

app.use(cookieParser());
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/register',(request, response)=>{

  response.render('register');

});


app.post('/users', (request, response)=>{

    // hash the password
    // let hashedPassword = sha256( request.body.password );

    let queryString = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";

    const values = [request.body.username, request.body.password];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.log('query error:', err.stack);
            response.send( 'query error' );

        } else {

            response.cookie('username', request.body.username);
            response.cookie('loggedin', true);
            response.cookie('userID', result.rows[0].id);
            response.redirect('/');
        }
    });
});

app.get('/login',(request, response)=>{

  response.render('login');
});


app.post('/login', (request, response)=>{

  const queryString = "SELECT * FROM users WHERE username=$1";

  const values = [request.body.username];

  pool.query(queryString, values, (err, result) => {

    if( err ){
      console.log( "ERRR!", err );

    } else{

      // they entered the correct password if
      // the one in the request is the same as the one in the db query

      // let hashedPassword = sha256( request.body.password);
      if(result.rows[0].password === request.body.password){

        let userID = result.rows[0].id;

        response.cookie('username', request.body.username);
        response.cookie('loggedin', true);
        response.cookie('userID', userID);
        response.redirect('/');

      }else{
        console.log("Wrong password!")
        response.status(403);      }
    }
  });
});



app.get('/', (request, response) => {

  response.redirect('/artists');

});


app.get('/artists', (request, response) => {
  // query database for all artists
  // respond with text that lists the names of all the pokemons

  let queryString = "SELECT * FROM artists ORDER BY id ASC";

  pool.query(queryString, (err, result) => {

    if (err) {
      console.log('query error:', err.stack);
      response.send( 'query error' );

    } else {
      // console.log('query result:', result);
      // console.log(result.rows);

      const data = {
        artist : result.rows
      }

      response.render('home', data);
    }
  });

});

app.get('/artists/:id', (request, response) => {

    let queryString = "SELECT * FROM artists WHERE id=$1";
    let values = [request.params.id];

    pool.query(queryString, values, (err, result) => {

    if (err) {
      console.log('query error:', err.stack);
      response.send( 'query error' );

    } else {
      // console.log('query result:', result.rows[0]);

      const data = {
        artist : result.rows[0]
      }

      response.render('singleArtist', data);
    }
  });
});



app.get('/new', (request, response) => {

    response.render('form');

});

app.post('/artists', (request, response) => {

    let queryString = "INSERT INTO artists (name, photo_url, nationality, info) VALUES ($1, $2, $3, $4)";
    let values = [request.body.name, request.body.photo_url, request.body.nationality, request.body.info];

    pool.query(queryString, values, (err, result) => {

    if (err) {
      console.log('query error:', err.stack);
      response.send( 'query error' );

    } else {
      // console.log('query result:', result.rows);

      response.redirect('/artists')
    }
  });
});

app.get('/artists/:id/edit',(request, response)=>{

    let queryString = "SELECT * FROM artists WHERE id=$1";
    let values = [request.params.id]

    pool.query(queryString, values, (err, result) => {

    if (err) {
      console.log('query error:', err.stack);
      response.send( 'query error' );

    } else {
      // console.log('query result:', result.rows[0]);

      const data = {
        artist : result.rows[0]
      }

      response.render('editform', data);
    }
  });
});


app.put('/artists/:id', (request, response) =>{

    let artistID = request.params.id;
    let updatedName = request.body.name
    let updatedImg = request.body.photo_url
    let updatedNationality = request.body.nationality
    let updatedInfo = request.body.info

    let queryString = `UPDATE artists SET name='${updatedName}', photo_url='${updatedImg}', nationality='${updatedNationality}', info='${updatedInfo}' WHERE id = '${artistID}' `

    pool.query(queryString, (err, result) => {

        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );

        } else {
          // console.log('query result:', result.rows);
          response.redirect('/artists/' + artistID)
        }
    });
});



app.delete("/artists/:id", (request, response) => {

    let queryString = `DELETE FROM artists WHERE id = '${request.params.id}'`

    pool.query(queryString, (err, result) => {

        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );

        } else {
          // console.log('query result:', result.rows);
          response.redirect('/artists')
        }
    });
});



app.get('/artists/:id/songs', (request, response) =>{

    let artistID = request.params.id;

    let queryString = `SELECT * FROM artists WHERE id = '${artistID}'`
    let queryString2 = `SELECT * FROM songs WHERE artist_id = '${artistID}'`

    let data = {
        artist: '',
        songs: ''
    }

    pool.query(queryString, (err, result) => {

        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );

        } else {
          // console.log('query result:', result.rows[0].title);
          // response.send(result.rows);
          data.artist = result.rows[0];
          console.log(data.artist)

          // 2nd SQL Query Here:
            pool.query(queryString2, (err, result) => {

                if (err) {
                  console.log('query error:', err.stack);
                  response.send( 'query error' );

                } else {
                  data.songs = result.rows;

                  response.render('songList', data)
                }
            });
        }
    });
});

app.get('/artists/:id/songs/new', (request, response) =>{


    let artistID = request.params.id

    const data = {
        artist : artistID
    }

    response.render('newSong', data)
});

app.post('/artists/:id/songs/new', (request, response) =>{

    console.log(request.params.id)
    console.log(request.body)


    let queryString = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)"

    let values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.params.id]

    pool.query(queryString, values, (err, result) => {

        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );

        } else {
          // console.log('query result:', result.rows);

          response.redirect('/artists/'+ request.params.id +'/songs')
        }
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