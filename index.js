const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'admin',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};
let artistId = null;
let artistMatchingId = null;

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

//Request for home page
app.get('/', (request, response) => {
  response.send('Hello World');
});

//Request for all artists page
app.get('/artists', (request, response) => {
    let text = `select * from artists ORDER BY id ASC`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            const data = {
                artists: result.rows
            };

            response.render('home', data);
        }
    })
});

//Request for single artist
app.get('/artists/:id', (request, response) =>{
    artistId = parseInt(request.params.id);
    let text = `select * from artists where id = '${artistId}'`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            artistMatchingId = result.rows.find(artists => parseInt(artists.id) === artistId);

            response.render('singleArtist', artistMatchingId);
        }
    });
});

//Request to create new artist
app.get('/new', (request, response) => {
    response.render('new');
});

//Post new artist
app.post('/new', (request, response) => {
    let text = `INSERT into artists (name, photo_url, nationality) VALUES ($1, $2, $3)`;
    let values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(text, values, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
        response.send("New artist added!");
        }
    });
});

//Request edit page
app.get ('/artists/:id/edit', (request, response) => {
    artistId = parseInt(request.params.id);

    let text = `select * from artists where id = '${artistId}'`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            artistMatchingId = result.rows.find(artists => parseInt(artists.id) === artistId);

            response.render('editPage', artistMatchingId);
        }
    });
})

//Put to accept edit
app.put('/artists/:id', (request, response) => {
    let editedArtist = request.body;
     console.log(editedArtist);
     console.log(artistId);

    let text = `UPDATE artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = '${artistId}'`;
    let values = [request.body.name, request.photo_url, request.body.nationality];



    pool.query(text, values, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            let index = result.rows.findIndex(artists => parseInt(artists.id) === artistId);
            result.rows[index] = editedArtist;

            response.send(`${editedArtist.name} has been updated!`);
        }
    });
})

/**
 * ===================================
 * Listen to requests on port 8080
 * ===================================
 */
const server = app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);