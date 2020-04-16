const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'chelseaee',
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
app.use(express.static(__dirname + "/public/"));


app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

 /**
 * =========================================================
 * =========================================================
 * |###########          ROUTES - ARTISTS        ##########|
 * =========================================================
 * =========================================================
 */

/**
 * -------------------
 * CREATE A NEW ARTIST
 * -------------------
 */

app.get(`/artists/new`, (req, res) => {
  res.render("new-artist");
});

/**
 * -------------------
 * DISPLAY FORM FOR EDITING A SINGLE ARTIST
 * -------------------
 */

app.get(`/artists/:id/edit`, (req, res) => {
  const query = parseInt(req.params.id);

  let command = `SELECT * FROM artists WHERE id = ${query}`;

  pool.query(command, (err, result) => {
    if (err) {
      console.log(`Error in query!!!`, err);
    } else {
      const foundArtist = result.rows[0];
      const data = {
        artistData: foundArtist,
      };
      res.render("edit-artist", data);
    }
  });
});

/**
 * -------------------
 * DISPLAY A SINGLE ARTIST
 * -------------------
 */

app.get(`/artists/:id`, (req, res) => {
  const query = parseInt(req.params.id);

  let command = `SELECT * FROM artists WHERE id = ${query}`;

  pool.query(command, (err, result) => {
    if (err) {
      console.log(`Error in query!!!`, err);
    } else {
      const foundArtist = result.rows[0];

      const data = {
        artistData: foundArtist,
      };

      res.render("artist", data);
    }
  });
});


/**
 * -------------------
 * GET ALL SONGS FROM ONE ARTIST
 * -------------------
 */

app.get(`/artists/:id/songs`, (req, res) => {
  const query = parseInt(req.params.id);

  let command = `SELECT songs.id, songs.title, artists.name AS artist_name FROM songs INNER JOIN artists ON songs.artist_id = artists.id WHERE artists.id = ${query}`;

  pool.query(command, (err, result) => {
    if (err) {
      console.log(`Error in query!!!`, err);
    } else {
      const foundSongs = result.rows;
      const data = {
        songs: foundSongs,
      };
      res.render("artists-songs", data);
    }
  });
});


/**
 * -------------------
 * UPDATE AN ARTIST
 * -------------------
 */


app.put(`/artists/:id`, (req, res) => {
  const query = parseInt(req.params.id);

  let command = `UPDATE Artists SET name='${req.body.name}', photo_url='${req.body.photo_url}', nationality='${req.body.nationality}' WHERE id = ${query} RETURNING *`;

  pool.query(command, (err, result) => {
    if (err) {
      console.log(`Error in query!!!`, err);
    } else {
      res.redirect(`/artists/${query}`);
    }
  });
});


/**
 * -------------------
 * DELETE AN ARTIST
 * -------------------
 */

app.delete(`/artists/:id`, (req, res) => {

    const query = parseInt(req.params.id)

    const command = `DELETE FROM Artists WHERE id = ${query} RETURNING *`

    pool.query(command, (err, result) => {

        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/artists`);
        }

    })

})

/**
 * -------------------
 * CREATE AN ARTIST
 * -------------------
 */

app.post(`/artists`, (req, res) => {
  let values = [req.body.name, req.body.photo_url, req.body.nationality];

  let command = `INSERT INTO Artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`;

  pool.query(command, values, (err, result) => {
    if (err) {
      console.log(`Error in query!!!`, err);
    } else {
      res.redirect(`/artists/${result.rows[0].id}`);
    }
  });
});

/**
 * -------------------
 * DISPLAY ALL ARTISTS
 * -------------------
 */


app.get(`/artists`, (req, res) => {

    let command = `SELECT * FROM artists`

    pool.query(command, (err, result) => {

        if (err) {
            console.log(`There was an error.`);
            console.log(err.message)
        } else {
            const artistArr = result.rows;
            const artistData = {
                artists: artistArr
            }

            res.render('all-artists', artistData)

        }
    })
})


 /**
 * =========================================================
 * =========================================================
 * |###########          ROUTES - SONGS        ############|
 * =========================================================
 * =========================================================
 */

/**
 * -------------------
 * DISPLAY FORM FOR ADDING A NEW SONG.
 * -------------------
 */

app.get(`/songs/new`, (req, res) => {
    let command = `SELECT id, name FROM artists`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            const data = {
                artistData: result.rows,
            };
            res.render("new-song", data);
        }
    });
});

/**
 * -------------------
 * DISPLAY FORM FOR EDITING A SONG.
 * -------------------
 */
app.get(`/songs/:id/edit`, (req, res) => {
    const query = parseInt(req.params.id);

    let getSongAndArtistName = `SELECT songs.*, artists.name AS artist_name FROM songs INNER JOIN artists ON songs.artist_id = artists.id WHERE songs.id = ${query}`;

    pool.query(getSongAndArtistName, (err, result) => {
        if (err) {
          console.log(`There was an error.`);
          console.log(err.message);
        } else {
          let data = {
            songData: result.rows[0],
          };

          pool.query(
            `SELECT id, name FROM artists ORDER BY id ASC`,
            (err, result) => {
              if (err) {
                console.log(`There was an error.`);
                console.log(err.message);
              } else {
                data.artistsData = result.rows;
                res.render("edit-song", data);
              }
            });
        }
      });
});

/**
 * -------------------
 * DISPLAY A SONG.
 * -------------------
 */
app.get(`/songs/:id`, (req, res) => {
    const query = parseInt(req.params.id);
    let command = `SELECT songs.*, artists.name AS artist_name FROM songs INNER JOIN artists ON songs.artist_id = artists.id WHERE songs.id = ${query}`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`There was an error.`);
            console.log(err.message);
        } else {
            const foundSong = result.rows[0];
            const data = {
                songData: foundSong,
            };

            res.render("song", data);
        }
    });
});

/**
 * -------------------
 * UPDATE A SONG.
 * -------------------
 */

app.put(`/songs/:id`, (req, res) => {
    const query = parseInt(req.params.id);

    let command = `UPDATE songs SET title = '${req.body.title}', album = '${req.body.album}', preview_link = '${req.body.preview_link}', artwork = '${req.body.artwork}', artist_id = ${req.body.artistId} WHERE id=${query} RETURNING`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/songs/${result.rows[0].id}`);
        }
    });

});

/**
 * -------------------
 * DELETE A SONG.
 * -------------------
 */
app.delete(`/songs/:id`, (req, res) => {
  const query = parseInt(req.params.id);

  let command = `DELETE FROM songs WHERE id = ${query}`;

  pool.query(command, (err, result) => {
      if (err) {
          console.log(`Error in query!!!`, err);
      } else {
          res.redirect(`/songs`);
      }
  });
});

/**
 * -------------------
 * DISPLAY ALL SONGS.
 * -------------------
 */
app.get(`/songs`, (req, res) => {
    let command = `SELECT * FROM songs`;

    pool.query(command, (err, result) => {
        if (err) {
            console.log(`There was an error.`);
            console.log(err.message);
        } else {
            const songData = result.rows;
            const data = {
                songs: songData,
            };

            res.render("all-songs", data);
        }
    });
});


/**
 * -------------------
 * CREATE A SONG.
 * -------------------
 */
app.post(`/songs`, (req, res) => {

    const values = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artistId];

    let command = `INSERT INTO Songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    pool.query(command, values, (err, result) => {
        if (err) {
            console.log(`Error in query!!!`, err);
        } else {
            res.redirect(`/songs/${result.rows[0].id}`);
        }
    });

})

/**
 * ===================================
 * |||||||||| HOME ROUTE |||||||||||||
 * ===================================
 */

app.get('/', (request, response) => {
    response.render('home');
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);