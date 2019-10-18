console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
var sha256 = require('js-sha256');
const cookieParser = require('cookie-parser')

var SALT = "maximum effort"

// Initialise postgres client
const configs = {
  user: 'eugene',
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
app.use(cookieParser());
/**
 * ===================================
 * Routes
 * ===================================
 */
// home page to show all the particulars of the artists
app.get('/', (request, response) => {

    const queryString= "SELECT * FROM artist"

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("query error");
        }else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});

app.get('/home', (request, response) => {

    response.render("home");
})


// rendering the page to create a new artist
app.get('/artist/new', (request, response) => {

  response.render('new');
});

// putting the created new artist into the table
app.post('/artist', (request, response) => {

    console.log(request.body);
    const newArr= [request.body.name, request.body.photo_url, request.body.nationality];

    const queryString= "INSERT INTO artist (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(queryString, newArr, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("query error");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    })
})

// find artist through id
app.get('/artist/:id', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM artist WHERE id="+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("NO SUCH PERSON ON EARTH");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


app.get('/artist/:id/edit', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM artist WHERE id="+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("NO SUCH PERSON IN OUR DATABASE");
        }
        else {
            console.log("query result :", result.rows[0]);


            response.render("edit", result.rows[0]);
        }
    });
});


app.put('/artist/:id', (request, response) => {

    console.log(request.body);
    let name= request.body.name;
    let photo=request.body.photo_url;
    let nationality= request.body.nationality;
    let inputId= parseInt(request.params.id);
    const newArr= [name, photo, nationality, inputId];

    const queryString= "UPDATE artist SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4";

    // const queryString= "UPDATE artist SET name= "+request.body.name+", photo_url= "+request.body.photo_url+", nationality= "+request.body.nationality+" WHERE id ="+inputId;
    console.log(queryString);

    pool.query(queryString, newArr, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("Error In Codes");
        }
        else {
            console.log("query result :", result);

            response.redirect("/artist/"+request.params.id);
        }
    })
})


// find all songs through artist id
app.get('/artist/:id/songs', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM songs WHERE artist_id = "+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("Artist not found. Try again.");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


app.get('/playlist/new', (request, response) => {

    response.render("playlist");
});


app.post('/playlist', (request, response) => {

    console.log(request.body);
    const inputName= [request.body.name];

    const queryString= "INSERT INTO playlists (name) VALUES ($1) RETURNING *";
    console.log(queryString);

    pool.query(queryString, inputName, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("query error");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


// SELECT playlist_song.playlist_id, songs.title
// FROM playlist_song
// INNER JOIN songs
// ON (songs.id = playlist_song.song_id)
// WHERE playlist_song.playlist_id = 1;




// work in progress. want to show up both playlist and song names
app.get('/playlist/:id', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    // const queryString= "SELECT * FROM playlists WHERE id="+inputId;
    const queryString= "SELECT playlist_song.playlist_id, songs.title FROM playlist_song INNER JOIN songs ON (songs.id = playlist_song.song_id) WHERE playlist_song.playlist_id ="+inputId;
    console.log(queryString);

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("No such Playlist");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


app.get('/playlist/:id/addsong', (request, response) => {

    let data= {
        id : parseInt(request.params.id)
    }
    response.render("addsong", data);
})


app.post('/playlist/:id', (request, response) => {

    console.log(request.body);
    let songId= request.body.song_id;
    let inputId= request.params.id;
    const newArr= [songId, inputId];

    const queryString= 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2)';
    console.log(queryString);

    pool.query(queryString, newArr, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("No such Thing");
        }
        else {
            console.log("query result: result");

            response.send(result.rows);
        }
    });
});

// render the form for registration
app.get('/register', (request, response) => {

    response.render("register");
});


// input the data of the registration(username and password) into the table
app.post('/register', (request, response)=>{
    console.log( request.body );

    let hashedPassword = sha256(request.body.password + SALT);

    const queryString = 'INSERT INTO register (name, password) VALUES ($1, $2) RETURNING *';

    const values = [
    request.body.name,
    hashedPassword
    ];

pool.query(queryString, values, (err, result) => {

    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    }
    else {
        console.log('query result:', result);

        response.send( result.rows );
    }
  });
});

// render the login page to input the name and password
app.get('/login', (request, response) => {

    response.render("login");
})


// function to check whether the inputted name and password matches the name and password in the table(register) in database
app.post('/login', (request, response)=>{
  let requestUsername = request.body.name;
  let requestPassword = request.body.password;

  // check in the database for a row with this user
  const queryString = "SELECT * from register WHERE name='"+requestUsername+"'";
  console.log( "db query", queryString );

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      console.log('query result:', result.rows);
      // if this user exists in the db
// if result is more than 0 than there is/are users with the same names
      if( result.rows.length > 0 ){

        let hashedRequestPassword = sha256( requestPassword + SALT );
        console.log( "hashed request password: "+ hashedRequestPassword );

        // check to see if the password in request.body matches what's in the db
        if( hashedRequestPassword === result.rows[0].password ){
          let user_id = result.rows[0].id

          let hashedCookie = sha256(SALT + user_id);

          response.cookie('user_id', user_id);
          response.cookie('hasLoggedIn', hashedCookie);

          // if it matches they have been verified, log them in, redirect them to home
          response.redirect('home');
        }else{

          response.status(403).send('wrong password');
        }

      }else{
        response.status(403).send('no username');

      }

    }
  });

});


app.get('/favourite', (request, response)=>{


  let user_id = request.cookies['user_id'];
  let hashedValue = sha256( SALT + user_id );

  // if there is a cookie that says hasLoggedIn yes, let them access this page
  if( request.cookies['hasLoggedIn'] === hashedValue ){
    response.render("addfavourite");

  }else{

    //otherwise, show them a message
    response.render("login");
  }

});

app.post('/favourite', (request, response) => {

    console.log(request.body);
    let song_id =  request.body.song_id;
    let user_id = request.cookies["user_id"];
    const newArr = [song_id, user_id];

    const queryString = 'INSERT INTO favourite (song_id, user_id) VALUES ($1, $2) RETURNING *';

    pool.query(queryString, newArr, (err, result) => {

    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    }
    else {
        console.log('query result:', result);

        response.send( result.rows );
    }
  });
});

app.get('/favourite/:id', (request, response) => {


    let inputId = parseInt(request.params.id);

    const queryString = 'SELECT register.name, songs.title, favourite.song_id FROM songs INNER JOIN favourite ON (favourite.song_id = songs.id) INNER JOIN register ON (register.id = favourite.user_id) WHERE favourite.user_id = '+inputId;
    pool.query(queryString, (err, result) => {

    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    }
    else {
        console.log('query result:', result);

        response.send( result.rows );
        };
    });
});

// SELECT register.name, songs.title, favourite.song_id
// FROM songs
// INNER JOIN favourite
// ON (favourite.song_id = songs.id)
// INNER JOIN register
// ON (register.id = favourite.user_id)
// WHERE favourite.user_id = 1;


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