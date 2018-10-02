console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const configs = {
  user: 'liangxin',
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

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Utilities
 * ===================================
 */

const trim = arr => {
  return arr.map(str => str.trim());
};

/**
 * ===================================
 * Routes: nested
 * ===================================
 */

app.get('/artists/:id/songs', (request, response) => {
  let sql = `SELECT * FROM songs WHERE artist_id = ${request.params.id} ORDER BY title`;
  pool.query(sql, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.render('ArtistsShowSongs', { songs: res.rows });
    }
  });
});

/**
 * ===================================
 * Routes: artists
 * ===================================
 */

app.get('/artists/new', (request, response) => {
  response.render('ArtistsNew');
});

app.get('/artists/:id/edit', (request, response) => {
  const sql = `SELECT * FROM artists WHERE id = ${request.params.id}`;
  pool.query(sql, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.render('ArtistsEdit', res.rows[0]);
    }
  });
});

app.get('/artists/:id', (request, response) => {
  const sql = `SELECT * FROM artists WHERE id = ${request.params.id}`;
  pool.query(sql, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.render('ArtistsShow', res.rows[0]);
    }
  });
});

app.get('/artists', (request, response) => {
  const sql = 'SELECT * FROM artists ORDER BY id';
  pool.query(sql, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.render('Artists', { artists: res.rows });
    }
  });
});

app.post('/artists', (request, response) => {
  const sql = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
  const values = trim(Object.values(request.body));
  pool.query(sql, values, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.redirect(`/artists/${res.rows[0].id}`);
    }
  });
});

app.put('/artists/:id', (request, response) => {
  const sql = `UPDATE artists SET name = ($1), photo_url = ($2), nationality = ($3) WHERE id = ${request.params.id}`;
  const values = trim(Object.values(request.body));
  pool.query(sql, values, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.redirect(`/artists/${request.params.id}`);
    }
  });
});

app.delete('/artists/:id', (request, response) => {
  const sql = `DELETE from artists WHERE id = ${request.params.id}`;
  pool.query(sql, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.redirect('/artists');
    }
  });
});

/**
 * ===================================
 * Routes: songs
 * ===================================
 */

app.get('/songs/:id/edit', (request, response) => {
  let sql = `SELECT * FROM songs WHERE id = ${request.params.id}`;
  pool.query(sql, (err, songRes) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      sql = 'SELECT * FROM artists';
      pool.query(sql, (err, artistsRes) => {
        if (err) {
          console.log('query err:', err.message);
          response.status(500).send('Error');
        } else {
          response.render('SongsEdit', { song: songRes.rows[0], artists: artistsRes.rows });
        }
      })
    }
  });
});

app.get('/songs/new', (request, response) => {
  const sql = 'SELECT * FROM artists ORDER BY name';
  pool.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      response.status(500).send('Error');
    } else {
      response.render('SongsNew', { artists: res.rows });
    }
  });
});

app.get('/songs/:id', (request, response) => {
  const sql = `SELECT * FROM songs WHERE id = ${request.params.id}`;
  pool.query(sql, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.render('SongsShow', res.rows[0]);
    }
  });
});

app.get('/songs', (request, response) => {
  const sql = 'SELECT * FROM songs ORDER BY id';
  pool.query(sql, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.render('Songs', { songs: res.rows });
    }
  });
});

app.post('/songs', (request, response) => {
  const sql = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING id';
  const values = trim(Object.values(request.body));
  values[4] = parseInt(values[4]);
  pool.query(sql, values, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.redirect(`/songs/${res.rows[0].id}`);
    }
  });
});

app.put('/songs/:id', (request, response) => {
  const sql = `UPDATE songs SET title = ($1), album = ($2), preview_link = ($3), artwork = ($4), artist_id = ($5) WHERE id = ${request.params.id}`;
  const values = trim(Object.values(request.body));
  values[4] = parseInt(values[4]);
  pool.query(sql, values, (err, res) => {
    if (err) {
      console.log('query err:', err);
      response.status(500).send('Error');
    } else {
      response.redirect(`/songs/${request.params.id}`);
    }
  });
});

app.delete('/songs/:id', (request, response) => {
  const sql = `DELETE from songs WHERE id = ${request.params.id}`;
  pool.query(sql, (err, res) => {
    if (err) {
      console.log('query err:', err.message);
      response.status(500).send('Error');
    } else {
      response.redirect('/songs');
    }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
