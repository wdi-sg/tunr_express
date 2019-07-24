// psql -d tunr_db -U wilfredloh -f drop.sql
// psql -d tunr_db -U wilfredloh -f tables.sql
// psql -d tunr_db -U wilfredloh -f artist_data.sql
// psql -d tunr_db -U wilfredloh -f songs.sql

console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'wilfredloh',
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

app.get('/artists', (request, response) => {

    const queryString = "SELECT * FROM artists";
    pool.query(queryString, (err, result) => {
        let artists = {
            artists : result.rows
        }
        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );
        } else {
          response.render('artists', artists);
        }
    });
});

app.get('/artist/:id', (request, response) => {
    console.log('i am here 1')
    let id = request.params.id;
    const queryString = `SELECT * FROM artists WHERE id=${id}`;
    console.log('i am here 2')

    pool.query(queryString, (err, result) => {
        console.log('i am here 3')

        console.log('RESSSSULLLTTTT IS: ', result)
        console.log('RESSSSULLLTTTT RRROOWWWWWW IS: ', result.rows)
        let artist = {
            artist : result.rows[0],
            id: id
        }
        console.log('i am here 4')

        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );

        } else {
            console.log('i am here 5')

          response.render('indvArtist', artist);
        }
    console.log('i am here 6')

    });
    console.log('i am here 7')

});

app.get('/artists/new', (request, response) => {
  response.render('new');
});

app.post('/artists', (request, response) => {
    let newArtist = request.body;
    const queryString = `INSERT INTO artists (name, nationality, photo_url) VALUES ($1, $2, $3) RETURNING *`;
    const values =
    [newArtist.name, newArtist.nationality, newArtist['photo_url']];

    pool.query(queryString, values, (err, result) => {
        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );
        } else {
          console.log('new artist added!')
          response.redirect('/artists');
        }
    });
});

app.get('/artists/:id/edit', (request, response) => {
    let id = request.params.id;
    const queryString = `SELECT * FROM artists WHERE id=${id}`;
    pool.query(queryString, (err, result) => {
        let artist = {
            artist : result.rows[0],
            id: id
        }
        if (err) {
            console.log('query error:', err.stack);
            response.send( 'query error' );
        } else {
            response.render('edit', artist);
        }
    });
});

app.put('/artists/:id', (request, response) => {
    let id = request.params.id;
    let newArtist = request.body;
    const queryString = `UPDATE artists SET name=$1, nationality=$2, photo_url=$3 WHERE id = ${id}`;
    const values =
    [newArtist.name, newArtist.nationality, newArtist['photo_url']];

    pool.query(queryString, values, (err, result) => {
        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );
        } else {
          console.log(' artist edited!')
          response.redirect(`/artist/${id}`);
        }
    });
});

app.delete('/artists/:id', (request, response) => {
    let id = request.params.id;
    const queryString = `DELETE from artists WHERE id = ${id} RETURNING id`;

    pool.query(queryString, (err, result) => {
        if (err) {
          console.log('query error:', err.stack);
          response.send( 'query error' );
        } else {
          console.log(' artist deleted!')
          response.redirect(`/artists`);
        }
    });
});



app.get('/', (request, response) => {
  response.render('home');
});

app.get('*', (request, response) => {
  response.redirect('/');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 let port = 3111;
const server = app.listen(port, () => console.log('~~~ Tuning in to the waves of '+ port +' ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);


// 1. edit
// 2. delete
// 3. add songs under artists