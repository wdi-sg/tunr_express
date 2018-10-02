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

// create new artist
app.post('/artists/new', (req, res) => {

  let addArtist = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)";

  let values = [req.body.name,req.body.photo_url, req.body.nationality];

  pool.query(addArtist, values, (error, result) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {
      res.redirect('/artists/');
    }
  })

})

// new artist form
app.get('/artists/new', (req, res) => {

  res.render('artists/new');
});

// update artist
app.put('/artists/:id', (req, res) => {

  let id = req.params.id;
  let name = req.body.name;
  let photo_url = req.body.photo_url;
  let nationality = req.body.nationality;

  let editArtist = `UPDATE artists
  SET name='${name}', photo_url='${photo_url}', nationality='${nationality}' WHERE id = ${id};`;

  pool.query(editArtist, (error, result) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {
      res.redirect(`/artists/${id}`);
    }
  })
})

// delete artist
app.delete('/artists/:id', (req, res) => {

  let id = req.params.id;

  let deleteArtist = `DELETE FROM artists WHERE id = ${id}`;

  pool.query(deleteArtist, (error, result) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {
      res.redirect(`/artists/`);
    }
  })
})

// edit artist form
app.get('/artists/:id/edit', (req, res) => {

  let id = req.params.id;

  let findArtist = `SELECT * FROM artists WHERE id = ${id};`;

  pool.query(findArtist, (error, artistResult) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {
      let artist = artistResult.rows[0];

      res.render('artists/edit', {artist: artist});
    }
  })
})

// show artist
app.get('/artists/:id', (req, res) => {

  let id = req.params.id;

  let findArtist = `SELECT * FROM artists WHERE id = ${id};`;

  pool.query(findArtist, (error, artistResult) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {

      res.render('artists/artist', {artist: artistResult.rows[0]});
    }
  })
})

// index all artists
app.get('/artists/', (req, res) => {

  let listArtists = "SELECT * FROM artists ORDER BY id ASC";

  pool.query(listArtists, (error, result) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {
      res.render('home', {artists: result.rows});
    }
  })
});

// index all songs by an artist
app.get('/artists/:id/songs/', (req, res) => {

  let id = req.params.id;

  let findArtist = `SELECT * FROM artists WHERE id = ${id};`;

  pool.query(findArtist, (error, artistResult) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {

      let artist = artistResult.rows[0];

      let findSongs = `SELECT * FROM songs WHERE artist_id = ${id};`;

      pool.query(findSongs, (error, songsResult) => {

        if (error) {
          console.log("Error: ", error);
          res.status(500).send("Something went wrong.");
        } else {

          res.render('songs/list', {artist: artist, songs: songsResult.rows});
        }
      })
    }
  })
})

// show song
app.get('/artists/:id/songs/:sid', (req, res) => {

  let id = req.params.id;
  let idSong = req.params.sid;

  let findSong = `SELECT * FROM songs WHERE id = ${idSong} AND artist_id = ${id};`;

  pool.query(findSong, (error, songResult) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {

      let findArtist = `SELECT * FROM artists WHERE id = ${id}`;

      pool.query(findArtist, (error, artistResult) => {

        if (error) {
          console.log("Error: ", error);
          res.status(500).send("Something went wrong.");
        } else {

          res.render('songs/song', {artist: artistResult.rows[0], song: songResult.rows[0]});
        }
      })
    }
  })
})

// edit song form
app.get('/artists/:id/songs/:sid/edit', (req, res) => {

  let id = req.params.id;
  let idSong = req.params.sid;

  let findArtists = `SELECT * FROM artists;`;

  pool.query(findArtists, (error, artistsResult) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {

      let findSong = `SELECT * FROM songs WHERE id = ${idSong} AND artist_id = ${id};`;

      pool.query(findSong, (error, songResult) => {

        if (error) {
          console.log("Error: ", error);
          res.status(500).send("Something went wrong.");
        } else {

          res.render(`songs/editsong`, {artist_id: id, artists: artistsResult.rows, song: songResult.rows[0]});
        }
      })
    }
  })
})

// update song
app.put('/artists/:id/songs/:sid', (req, res) => {

  let idSong = req.params.sid;
  let title = req.body.title;
  let album = req.body.album;
  let preview_link = req.body.preview_link;
  let artwork = req.body.artwork;
  let artist_id = req.body.artist_id;

  let editSong = `UPDATE songs
  SET title='${title}', album='${album}', preview_link='${preview_link}', artwork='${artwork}', artist_id=${artist_id} WHERE id = ${idSong};`;

  pool.query(editSong, (error, result) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {
      res.redirect(`/artists/${artist_id}/songs/${idSong}`);
    }
  })
})

// delete song
app.delete('/artists/:id/songs/:sid', (req, res) => {

  let sid = req.params.sid;

  let deleteSong = `DELETE FROM songs WHERE id = ${sid}`;

  pool.query(deleteSongs, (error, result) => {

    if (error) {
      console.log("Error: ", error);
      res.status(500).send("Something went wrong.");
    } else {
      res.redirect(`/artists/${req.params.id}/songs/`);
    }
  })
})

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// server.on('close', () => {
//   console.log('Closed express server');
//
//   db.pool.end(() => {
//     console.log('Shut down db connection pool');
//   });
// });
