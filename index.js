console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'changhaoteo',
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
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));
app.use(cookieParser());


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
  // query database for all artists
  const queryString = 'SELECT * FROM artists';
  // respond with HTML page displaying all pokemon

pool.query(queryString, (errorObj, result) => {
    // console.log(result.rows);
    // errorObj is not null if there's an error
    if (!errorObj) {
      // console.log('query resulttttttt:', result.rows);
      const data = {ccb : result.rows};
      // console.log(data);
      // response.send(data);
      response.render('home', data);
    } else {
      console.log(errorObj,"fedv");
      console.error('query error:');
      // res.send( 'query error' );

    }
  });

  // response.render('home');
});

app.get('/cookie', (request, response) => {

  console.log( request.cookies );

  // st a cookie
  response.cookie('banana', 1);

  response.send('hgello');
});



app.get('/artist/new', (request, response) => {

      response.render("artistnew");

});

app.post('/artist/new', (request, response) => {
      console.log(request.body);
      let id = request.body.id;
      let name = request.body.name;
      let nationality = request.body.nationality;
      let photo = request.body.photo_url;
      console.log(id);
      console.log(name);
      console.log(nationality);
      console.log(photo);

      const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${name}', '${photo}', '${nationality}')`;
      console.log(queryString);
      response.send("HARRO");
    pool.query(queryString, (errorObj, result) => {
    // errorObj is not null if there's an error

        // if (!errorObj) {
        //   // console.log('query resulttttttt:', result.rows);
        //   // console.log(data);
        //   // response.send(data);
        //   response.send("artist created!");
        // } else {
        //   console.log(errorObj,"fedv");
        //   console.error('query error:');
        //   // res.send( 'query error' );

        // }
  });


});

app.get('/artist/delete', (request, response) => {
      console.log(request.body);
      response.render("artistdelete");

});

app.post('/artist/delete', function(request, response) {
      console.log(request.body);
      let id = request.body.id;
      const queryString = `DELETE FROM artists WHERE id ='${id}'`;

    pool.query(queryString, (errorObj, result) => {
    // errorObj is not null if there's an error
    if (!errorObj) {
      response.send('Artist Deleted!');
    } else {
      console.log(errorObj,"fedv");
      console.error('query error:');
    }
  });
});

app.get('/artist/edit', (request, response) => {
      console.log(request.body);
      response.render("artistedit");

});

app.post('/artist/edit', (request, response) => {
      console.log(request.body);
      let id = request.body.id;
      let name = request.body.name;
      let nationality = request.body.nationality;
      let photo = request.body.photo_url;
      response.send("artistedit");
      const queryString = `UPDATE artists SET name='${name}', nationality='${nationality}', photo_url='${photo}' WHERE id=${id}`;

          pool.query(queryString, (errorObj, result) => {
    // errorObj is not null if there's an error
    if (!errorObj) {
      response.send('Artist Changed!');
    } else {
      console.log(errorObj,"fedv");
      console.error('query error:');
    }
  });


});




app.get('/artist/:id', (request, response) => {
  console.log(request.params.id);
  let artistId = request.params.id;
  // SELECT * FROM songs where artist_id = 4 ORDER BY id  LIMIT 5;
  const queryString = `SELECT * FROM artists where id = ${artistId}`;
  // const queryString = `SELECT title FROM songs where artist_id = ${artistId} ORDER BY id LIMIT 5`;

  pool.query(queryString, (errorObj, result) => {
    console.log(result.rows);
    // errorObj is not null if there's an error
    if (!errorObj) {
      // console.log('query resulttttttt:', result.rows);
      const data = {ccb : result.rows};
      // console.log(data);
      // response.send(data);
      response.render('artist', data);
    } else {
      console.log(errorObj,"fedv");
      console.error('query error:');
      // res.send( 'query error' );

    }
  });

});


app.get('/artist/:id/songs', (request, response) => {
  console.log(request.params.id);
  let artistId = request.params.id;
  // SELECT * FROM songs where artist_id = 4 ORDER BY id  LIMIT 5;
  const queryString = `SELECT * FROM songs where artist_id = ${artistId} ORDER BY id LIMIT 15`;
  // const queryString = `SELECT title FROM songs where artist_id = ${artistId} ORDER BY id LIMIT 5`;

  pool.query(queryString, (errorObj, result) => {
    console.log(result.rows);
    // errorObj is not null if there's an error
    if (!errorObj) {
      // console.log('query resulttttttt:', result.rows);
      const data = {ccb : result.rows};
      // console.log(data);
      // response.send(data);
      response.render('artistsongs', data);
    } else {
      console.log(errorObj,"fedv");
      console.error('query error:');
      // res.send( 'query error' );

    }
  });

});

app.get('/artist/:id/songs/new', (request, response) => {
  let artistId = request.params.id;
  response.render("artistsongnew");

});

app.post('/artist/:id/songs/new', (request, response) => {
  // console.log(request.params.id);
  let artistId = request.params.id;
  console.log(request.body);
  let title = request.body.title;
  let album = request.body.album;
  let preview = request.body.preview_link;
  let artwork = request.body.artwork;
  // let id = artistId;
  let id = request.body.artist_id
  const queryString = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ('${title}', '${album}', '${preview}', '${artwork}', ${id})`;
  console.log(queryString);

    pool.query(queryString, (errorObj, result) => {
    // errorObj is not null if there's an error
    if (!errorObj) {
      response.send('Song Added!');
    } else {
      console.log(errorObj,"fedv");
      console.error('query error:');
    }
  });

});

app.get('/register', (request, response) => {
  response.render('register');
});

app.post('/register', (request, response) => {
  console.log(request.body);
  let username = request.body.username;
  let password = request.body.password;

  const queryString = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  console.log(queryString);

      pool.query(queryString, (errorObj, result) => {
    // errorObj is not null if there's an error
    if (!errorObj) {
          response.cookie('username', username);
          response.cookie('loggedIn', true);
      response.send('USER CREATED!!');
    } else {
      console.log(errorObj,"fedv");
      console.error('query error:');
    }
  });
});


// app.get('/new', (request, response) => {
//   response.render('new');
// });


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