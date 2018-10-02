const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const configs = {
  user: 'chanleyou',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// ROUTES

// CREATE, SONGS BY AN ARTIST
app.post('/artists/:id/songs', (req, res) => {

  res.redirect('/artists/:id');
})

// SHOW, SONGS BY THE ARTIST
app.get('/artists/:id', (req, res) => {

  let id = req.params.id;

  let findArtist = `SELECT * FROM artists WHERE id = ${id};`;

  pool.query(findArtist, (error, artistResult) => {

    if (error) {
      console.log("Error: ", error);
      response.status(500).send("Something went wrong.");
    } else {

      let artist = artistResult.rows[0];

      let findSongs = `SELECT * FROM songs WHERE artist_id = ${id};`;

      pool.query(findSongs, (error, songsResult) => {

        if (error) {
          console.log("Error: ", error);
          response.status(500).send("Something went wrong.");
        } else {

          res.render('artists/artist', {artist: artist, songs: songsResult.rows});
        }
      })
    }
  })
})


// INDEX, SHOW ALL ARTISTS
app.get('/artists/', (req, res) => {

  let listArtists = "SELECT * FROM artists";

  pool.query(listArtists, (error, result) => {

    if (error) {
      console.log("Error: ", error);
      response.status(500).send("Something went wrong.");
    } else {
      res.render('home', {artists: result.rows});
    }
  })
});

// NEW, FORM TO SHOW NEW ARTIST
app.get('/artists/new', (req, res) => {

  res.render('artists/new');
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// server.on('close', () => {
//   console.log('Closed express server');
//
//   db.pool.end(() => {
//     console.log('Shut down db connection pool');
//   });
// });

// GET '/artists/1/songs' - get songs
// POST '/artists/1/songs' create songs
