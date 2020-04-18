// init an express app
const express = require('express');
const app = express();

// let forms override methods with "?_method=put"
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// create and use react engine
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

// lets you do form parsing in req.body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// mount ./static onto virt path / (for subfolders)
app.use('/', express.static('./static'));
let options = {
  root: ('static'),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

// create postgres-node connection pool
const pg = require('pg');
const configs = {
  user: 'dwu',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// generic SQL query helper function
const makeQuery = async function (query, values) {
  try {
    let results = await pool.query(query, values);
    return results.rows;
  }
  catch (err) {
    return err;
  }
};

// routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/artists', async function (req, res) {
  let artistQuery = "SELECT * FROM artists ORDER BY id";
  let artists = await makeQuery(artistQuery);
  res.render('artistlist', {artistlist: artists});
});

app.get('/artists/new', (req, res) => {
  let data = {
    id: 0,
    name: "",
    photo_url: "",
    nationality: "",
    new: true
  };
  res.render('artistform', data);
});

app.post('/artists/new', async function (req, res) {
  let newArtistValues = [
    req.body.name,
    req.body.photo_url,
    req.body.nationality
  ];
  let insertArtist =
      "INSERT INTO artists (name, photo_url, nationality) " +
      "VALUES ($1, $2, $3) " +
      "RETURNING id";
  let newArtistId = await makeQuery(insertArtist, newArtistValues);

  res.redirect(`/artists/${newArtistId[0].id}`);
});

app.get('/artists/:id', async function (req, res) {
  let artistId = [req.params.id];
  let getArtist =
      "SELECT * FROM artists " +
      "WHERE id >= $1 " +
      "ORDER BY id LIMIT 2";
  let artistResult = await makeQuery(getArtist, artistId);

  let prevArtistQuery =
      "SELECT * FROM artists " +
      "WHERE id < $1 " +
      "ORDER BY id DESC LIMIT 1";
  let prevArtistResult = await makeQuery(prevArtistQuery, artistId);

  console.log(artistResult);
  console.log(prevArtistResult);

  let prevArtist = prevArtistResult.length === 0 ? 0 : prevArtistResult[0].id;
  let nextArtist = artistResult.length === 1 ? 0 : artistResult[1].id;

  let data = {
    artist: artistResult[0],
    prevArtistId: prevArtist,
    nextArtistId: nextArtist
  };

  console.log(data);

  res.render('artistview', data);
});

app.get('/artists/:id/edit', async function (req, res) {
  let artistId = [req.params.id];
  let getArtist =
      "SELECT * FROM artists " +
      "WHERE id = $1";
  let artistResult = await makeQuery(getArtist, artistId);
  let data = {
    id: artistResult[0].id,
    name: artistResult[0].name,
    photo_url: artistResult[0].photo_url,
    nationality: artistResult[0].nationality,
    new: false
  };

  res.render('artistform', data);
});

app.put('/artists/:id', async function (req, res) {
  let artistInfo = [
    Number(req.body.id),
    req.body.name,
    req.body.photo_url,
    req.body.nationality
  ];

  let updateQuery =
      "UPDATE artists " +
      "SET (name, photo_url, nationality) = " +
      "($2, $3, $4) " +
      "WHERE id = $1";

  await makeQuery(updateQuery, artistInfo);
  res.redirect(`/artists/${req.body.id}`);
});

app.delete('/artists/:id', async function (req, res) {
  let artistInfo = [
    Number(req.params.id),
  ];

  let deleteQuery =
      "DELETE FROM artists " +
      "WHERE id = $1";

  let deleteResult = await makeQuery(deleteQuery, artistInfo);
  if (deleteResult.name === "error") {
    let data = {
      errorinfo: deleteResult
    };
    res.render('errorpage', data);
    return;
  }

  res.redirect('/artists');
});

// start server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port " + PORT));
