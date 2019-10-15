console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'eugene',
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
// home page to show all the particulars of the artists
app.get('/', (request, response) => {

    const queryString= "SELECT * FROM artist"

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("query error");
        }else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


// rendering the page to create a new artist
app.get('/artist/new', (request, response) => {

  response.render('new');
});

// putting the created new artist into the table
app.post('/artist', (request, response) => {

    console.log(request.body);
    const newArr= [request.body.name, request.body.photo_url, request.body.nationality];

    const queryString= "INSERT INTO artist (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(queryString, newArr, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("query error");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    })
})

// find artist through id
app.get('/artist/:id', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM artist WHERE id="+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("NO SUCH PERSON ON EARTH");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


app.get('/artist/:id/edit', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM artist WHERE id="+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("NO SUCH PERSON IN OUR DATABASE");
        }
        else {
            console.log("query result :", result.rows[0]);


            response.render("edit", result.rows[0]);
        }
    });
});


// find all songs through artist id
app.get('/artist/:id/songs', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM songs WHERE artist_id = "+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("Artist not found. Try again.");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
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