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

//  Initialize database
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
// use public folder
app.use(express.static('public'))


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

    const queryArtists = 'SELECT * FROM artists ORDER BY id';

    pool.query(queryArtists, (err, result) => {
        if (err) {
            console.log("query error: ", err.message);
            response.send("Query Error");

        } else {
            response.render('home', {artistInfo: result.rows});
        }
    });  // end of pool query

});  // end of app get /


app.get('/artist/new', (request, response) => {

    response.render('newArtist');

});  // end of get artist new


app.post('/artist', (request, response) => {

    const insertQuery = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(insertQuery, values, (err, result) => {
        if (err) {
            response.send("Query Error for Insert");

        } else {
            response.send("Add artist - Successful");
        }
    })
});  // end of /artist post


app.get('/artist/:id', (request, response) => {
    const artistId = parseInt(request.params.id);
    //const queryGetArtist = "SELECT * FROM artists WHERE id = '" + artistId + "'";
    const queryArtistSong = "SELECT * FROM songs WHERE artist_id = '" + artistId + "'";

    pool.query(queryArtistSong, (err, result) => {
        if (err) {
            console.log("query error: ", err.message);
            response.send("Query Error");

        } else {
            response.render('artistSongs', {artistSongs: result.rows}); // artist songs
        }

    })  // end of pool query

})  // end of app get artist/id


app.get('/artist/:id/edit', (request, response) => {
    const artistId = parseInt(request.params.id);

    const getArtistQuery = "SELECT * FROM artists WHERE id = '" + artistId + "'";

    pool.query(getArtistQuery, (err, result) => {
        if (err) {
            console.log("query error: ", err.message);
            response.send("Query Error for get artist to edit");

        } else {
            // since only one artist, can use this
            //response.send(result.rows[0])
            response.render('editArtist', result.rows[0]);
        }

    });  // end of pool query
});  // end of get for edit


//  update the recipe
app.put('/artist/:id', (request, response) => {
    const artistId = parseInt(request.params.id);
    const input = request.body;

    const updateQuery = `UPDATE artists SET name = '${input.name}', photo_url = '${input.photo_url}', nationality = '${input.nationality}' WHERE id = '${artistId}'`;

    pool.query(updateQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            response.send("Query Error for update");

        } else {
            response.send("Update artist - Successful");
        }
    })  // end of pool query
});  // end of put - when editing


//  to delete
app.delete('/artist/:id', (request, response) => {
    const artistId = parseInt(request.params.id);

    const deleteQuery = "DELETE FROM artists WHERE id = '" + artistId + "'";

    pool.query(deleteQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            response.send("Query Error for delete");

        } else {
            response.send("Delete artist - Successful");
        }

    })  // end of pool query

})  // end of delete


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