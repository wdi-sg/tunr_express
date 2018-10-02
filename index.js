const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const PORT = process.env.PORT || 80;

// Initialise postgres client
const configs = {
  user: 'lamesensei',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

app.post('/artists', async (appReq, appRes) => {
  const values = [appReq.body.name, appReq.body.photourl, appReq.body.nationality];
  const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3)';
  await pool.query(queryString, values, (insError, insRes) => {
    appRes.redirect('/artists');
  });
});

app.put('/artists/:id', async (appReq, appRes) => {
  console.log(appReq.body, appReq.params.id);
  const values = [
    appReq.params.id,
    appReq.body.name,
    appReq.body.photourl,
    appReq.body.nationality,
  ];
  const queryString = 'UPDATE artists SET (name, photo_url, nationality) = ($2,$3,$4) WHERE id = ($1)';
  await pool.query(queryString, values, (updError, updRes) => {
    if (updError) console.log('hello', updError.stack);
    appRes.redirect(`/artists/${appReq.params.id}`);
  });
});

app.delete('/artists/:id', async (appReq, appRes) => {
  const values = [appReq.params.id];
  const queryString = 'DELETE FROM artists WHERE id = ($1)';
  await pool.query(queryString, values, (updError, updRes) => {
    if (updError) console.log('hello', updError.stack);
    appRes.redirect('/artists');
  });
});

app.get('/artists/new', (appReq, appRes) => {
  appRes.render('create');
});

app.get('/artists/:id/edit', async (appReq, appRes) => {
  const values = [appReq.params.id];
  const queryString = 'SELECT * FROM artists WHERE id = ($1)';
  await pool.query(queryString, values, (artistError, artistRes) => {
    appRes.render('update', { artist: artistRes.rows });
  });
});

app.get('/artists/:id', async (appReq, appRes) => {
  const values = [appReq.params.id];
  const queryString = 'SELECT * FROM artists WHERE id = ($1)';
  await pool.query(queryString, values, (artistError, artistRes) => {
    appRes.render('profile', { artist: artistRes.rows });
  });
  // queryString = 'SELECT (album) WHERE artists_id = ($1)';
  // await pool.query(queryString, values, (songError, songRes) => {
  //   songs = songRes.rows;
  // });
});

app.get('/artists', async (appReq, appRes) => {
  const queryString = 'SELECT * FROM artists';
  await pool.query(queryString, (queryError, queryResponse) => {
    if (queryError) return appRes.send(queryError.stack);
    return appRes.render('artists', { artists: queryResponse.rows });
  });
});

app.get('/', (req, res) => {
  res.redirect('/artists');
});

app.listen(PORT);
