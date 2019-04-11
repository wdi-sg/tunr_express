
const pg = require('pg');
const express = require('express');
const methodOverride = require('method-override');


// Initialise postgres client
const configs = {
  user: 'asadullah',
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
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
//   response.render('home');
// });

const queryArtist = 'SELECT * FROM artist ORDER BY id';

pool.query(queryArtist, (err, result) => {
    if (err) {
        console.log("query error: ", err.message);
        response.send("Query Error");

    } else {
        response.render ('home', {artistInfo: result.rows});
    }
    });

});




app.get('/artist/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('newArtist');
});

app.post('/artist', (request, response) => {

    const insertQuery = 'INSERT INTO artist (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(insertQuery, values, (err, result) => {
        if (err) {
            response.send("Query Error for Insert");
        } else {
            response.send("Add artist - successful");
        }
    })
});



// 3


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