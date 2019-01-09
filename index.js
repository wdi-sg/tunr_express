console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  password: 'postgres',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

// sudo -u postgres createdb todolist
// psql -d todolist -U postgres -f tables.sql;

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

let text = "";

const showArtist =  ( text, response ) => {
  pool.query(text,(err, res) => {
    let artists = {};
    artists.list=[];
    for(let i = 0; i < res.rows.length; i++){
            artists.list.push(res.rows[i]);
        }
    response.render('artists', artists);
  });
}

const showSong =  ( text, response ) => {
  pool.query(text,(err, res) => {
    let songs = {};
    songs.list=[];
    for(let i = 0; i < res.rows.length; i++){
            songs.list.push(res.rows[i]);
        }
    response.render('songs', songs);
  });
}


app.get('/', (request, response) => {
  text = 'SELECT * from artists';
  showArtist(text, response);
});

app.get('/songs', (request, response) => {
  text = 'SELECT * from songs';
  showSong(text, response);
});

app.get('/artist/:id', (request, response) => {
  text = `SELECT * from artists WHERE id= ${request.params.id}`;
  showArtist(text, response);
});

app.get('/song/:id', (request, response) => {
  text = `SELECT * from songs WHERE id= ${request.params.id}`;
  showSong(text, response);
});

app.get('/artist/:id/songs', (request, response) => {
  text = `SELECT * from songs WHERE artist_id= ${request.params.id}`;
  showSong(text, response);
});

app.get('/create/artist', (request, response) => {
  response.render('createArtist');
});

app.post('/create/newArtist', (request, response) => {
  text = `INSERT INTO artists(name, photo_url, nationality) VALUES ('${request.body.name}', '${request.body.photo_url}', '${request.body.nationality}') RETURNING *`;
  showArtist(text, response);
});

// SELECT artist_id FROM songs WHERE id=${request.params.id}
// name = res.row[0];
// SELECT name FROM artists WHERE id={name}

//pending search function
//pending create artist function
//pending create song function
//pending edit function for artist and song


app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
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
