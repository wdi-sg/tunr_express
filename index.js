console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'datguyrhy',
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

//front page
app.get('/', (request, response) => {
   response.render("home");
});
// see all artists index///
app.get('/artists/all', (req, res) => {
  console.log("Showing artist list");
   let queryString = "SELECT * FROM artists;";
   pool.query(queryString, (err, result) => {
       if (err) {
           console.error('query error:', err.message);
           res.send('query error');
       } else {
           res.send(result.rows);
       }
   });
});
//display form for a new single artist//
app.get('/artists/new', (req, res) => {
  console.log("rendering new artist form!");
      response.render('form');
});
//Create new artist//
app.post('/artists', (req, res) => {
  console.log("adding new artist!");

    const addArtist = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING*;';
    let newArtistArr = [req.body.name, req.body.photo_url, req.body.nationality];

    pool.query(queryString, newArtistArr, (err, result) => {
        if (err) {
            console.error('query error:', err.message)
            res.send('query error')
        } else {
            console.log('query result:', result)
            // redirect to home page
            res.send(result.rows)
        }
    })
});
//See single artist//
app.get('/artists/:id', (req, res) => {
  console.log("searching for matches~~");
  console.log("baking a pie");
     let id = req.params.id;
     const queryString = `SELECT * FROM artists WHERE id = ${id}`

     pool.query(queryString, (err, result) => {
         if (err) {
             console.error('query error:', err.message);
             res.send('query error');
         } else {
             console.log("Found artist & baked a cake");
             console.log(result.rows);
             res.send(result.rows);
         }
     })
});
//display form for editing artist//
// app.get('/artists/:id/edit', (req, res) => {
//
// });
//
//

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
