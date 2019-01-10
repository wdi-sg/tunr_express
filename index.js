console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'sean',
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

// this line sets css files path
app.use(express.static('public'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/artists', (req, res) => {
    pool.query('SELECT * FROM artists ORDER BY id ASC', (err, result) =>{
        let artists = result.rows;

        res.render('artisthome', {list:artists});
    })
});

app.get('/artists/artist/new', (req, res) => {
    res.render('artistnew');
});

app.post('/artists/artist/add', (req, res) => {
    let name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    let photo = req.body.photo;
    let nat = req.body.nat.toUpperCase();
    let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';
    const values = [name, photo, nat];
    pool.query(queryText, values, (err, result) =>{
        let artists =  values;

        res.render('artistadd', {list:artists});
    })
});

app.get('/artists/artist/:id', (req, res) => {
    let id = req.params.id;
    pool.query('SELECT * FROM artists WHERE id = ' + id, (err, result) =>{
        let artists =  result.rows;

        res.render('artist', {list:artists});
    })
});

app.get('/artists/artist/edit/:id', (req, res) => {
    let id = req.params.id;
    pool.query('SELECT * FROM artists WHERE id = ' + id, (err, result) =>{
        let artists =  result.rows;

        res.render('artistedit', {list:artists});
    })
});

app.put('/artists/edit/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    let photo = req.body.photo;
    let nat = req.body.nat.toUpperCase();
    let queryText = `UPDATE artists SET name = '${name}', photo_url = '${photo}', nationality = '${nat}' WHERE id = ${id}`;
    pool.query(queryText, (err, result) =>{
        res.redirect('/artists');
    })
});

app.delete('/artists/artist/delete/:id', (req, res) => {
    let id = req.params.id;
    let queryText = `ALTER TABLE songs DROP CONSTRAINT IF EXISTS songs_artist_id_fkey; DELETE from artists WHERE id = ${id}`;
    pool.query(queryText, (err, result) =>{
        res.redirect('/artists');
    })
});

// app.get('/new', (request, res) => {
//   // respond with HTML page with form to create new pokemon
//   res.render('new');
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