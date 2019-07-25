console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'apooshoo',
  password: 'neilgaiman1',
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

//index page, link to home
app.get('/', (request, response) => {
    let queryString = `SELECT * FROM artists ORDER BY id ASC`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            let info = result.rows;
            let data = {
                artistsData: info
            };
            response.render('home', data);
        }
    })

});

//show page, link to each-artist
app.get('/artist', (request, response) => {
    //search artists by id
    let id = parseInt(request.query.search);
    console.log(id);

    let queryString = `SELECT * FROM artists WHERE id = ${id}`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else {
            response.render('each-artist', result.rows);
        }
    })

})

//create an artist, link to create-artist
app.get('/artist/new', (request, response) => {

    response.render('create-artist');
});

//create an artist, get info from create-artist, redirect to home?
app.post('/artist/new', (request, response) => {
    let artist = request.body;
    let queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *`;
    let values = [artist.name, artist.photo_url, artist.nationality];
    pool.query(queryString, values, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            console.log(result.rows[0]);
            response.redirect('/');
        }
    })

})

//edit an artist, get id info from home, link to edit-artist
app.get('/artist/edit', (request, response) => {
    let id = parseInt(request.query.edit);
    let queryString = `SELECT * FROM artists WHERE id = ${id}`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            let data = result.rows[0];
            response.render('edit-artist', data);
        }
    })

})

app.put('/artist/edit', (request, response) => {
    let data = request.body;
    let id = parseInt(request.body.id);
    let queryString = `UPDATE artists SET name = '${data.name}', photo_url = '${data.photo_url}', nationality = '${data.nationality}' WHERE id = ${id} RETURNING *`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            // console.log(result.rows[0]);
            response.redirect('/');
        }
    })

})

app.delete('/artist/delete', (request, response) => {
    let id = parseInt(request.body.delete);
    let queryString = `DELETE FROM artists WHERE id = ${id}`;
    pool.query(queryString, (err, result) => {
        if (err){
            console.log(err.stack);
        } else{
            response.redirect('/');
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