console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'wongjoey',
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

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render('home');
});

////////////////////////////////////////////// ARTISTS //////////////////////////////////////////////

app.get('/artists', (req,res) => {
  let text = 'SELECT * FROM Artists';
  console.log('hi');
  pool.query( text, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      console.log(result.rows);
    }
    res.send(result.rows);
  })
})

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artists', (req,res) => {

  let name = req.body.artistName;
  let img_url = req.body.imageUrl;
  let nationality = req.body.artistNationality;

  console.log(name, img_url, nationality);

  let text = 'INSERT INTO Artists (name, photo_url, nationality) VALUES ($1, $2, $3);'

  let values = [name, img_url, nationality];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.send(req.body);
    }
  })
})

app.get('/artists/:id', (req,res) => {
  
  let  singleArtist = req.params.id;

  let text = 'SELECT * FROM Artists WHERE id = $1';
  let values = [singleArtist];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.render('artist', result.rows);
    }
  })
})

app.delete('/artists/:id', (req,res) => {

  let  singleArtist = req.params.id;

  let text = `DELETE FROM Artists WHERE id = $1`

  let values = [singleArtist];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.send('Deleted')
    }
  })
})

app.get('/artists/:id/edit', (req,res) => {

  let  singleArtist = req.params.id;

  let text = 'SELECT * FROM Artists WHERE id = $1';
  let values = [singleArtist];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.render('edit_artist', result.rows);
    }
  })
})

app.put('/artists/:id', (req,res) => {

  let name = req.body.artistName;
  let img_url = req.body.imageUrl;
  let nationality = req.body.artistNationality;
  let singleArtist = req.params.id;

  console.log(name, img_url, nationality);

  let text = 'UPDATE Artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = $4';

  let values = [ name, img_url, nationality, singleArtist ];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.send(req.body);
    }
  })
})

app.get('/artists/:id/songs', (req,res) => {

  let singleArtist = req.params.id;

  let text = 'SELECT Songs.*, Artists.* FROM Songs INNER JOIN Artists ON Songs.artist_id = Artists.id WHERE artist_id = $1'

  let values = [singleArtist];

  pool.query(text, values, (err,result) => {
    res.send(result.rows);
  })
})

/////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////// SONGS ////////////////////////////////////////////////

app.get('/songs', (req,res) => {

  let text = 'SELECT * FROM Songs';

  pool.query( text, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      console.log(result.rows);
    }
    res.send(result.rows);
  })
})

app.get('/songs/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/songs', (req,res) => {

  let title = req.body.title;
  let album = req.body.album;
  let preview_link = req.body.preview_link;
  let artwork = req.body.artwork;
  let artistName = req.body.artistName;

  console.log(title, album, preview_link, artwork, artistName);

  let text = 'INSERT INTO Songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, (SELECT id FROM Artists WHERE lower(name) = lower($5)))'

  let values = [title, album, preview_link, artwork, artistName];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.send(req.body);
    }
  })
})

app.get('/songs/:id', (req,res) => {
  
  let  singleSong = req.params.id;

  let text = 'SELECT * FROM Songs WHERE id = $1';
  let values = [singleSong];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.render('song', result.rows);
    }
  })
})

app.delete('/songs/:id', (req,res) => {

  let  singleSong = req.params.id;

  let text = `DELETE FROM Songs WHERE id = $1`

  let values = [singleSong];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.send('Deleted')
    }
  })
})

app.get('/songs/:id/edit', (req,res) => {

  let  singleSong = req.params.id;

  let text = 'SELECT * FROM Songs WHERE id = $1';
  let values = [singleSong];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.render('edit_song', result.rows);
    }
  })
})

app.put('/songs/:id', (req,res) => {

  let title = req.body.title;
  let album = req.body.album;
  let preview_link = req.body.preview_link;
  let artwork = req.body.artwork;
  let artistName = req.body.artistName;
  let singleSong = req.params.id;

  console.log(title, album, preview_link, artwork, artistName);

  let text = 'UPDATE Songs SET title = $1, album = $2, preview_link = $3, artwork = $4 WHERE id = $5'

  let values = [title, album, preview_link, artwork, singleSong];

  pool.query(text, values, (err,result) => {
    if (err) {
      console.log('error', err.message);
    }
    else {
      res.send(req.body);
    }
  })
})




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
