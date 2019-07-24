console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'donc',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
  password: 'password'
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

//create a new artist
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    const queryString = 'SELECT * FROM artists';
    pool.query(queryString, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            const data = {
                artistList : res.rows
            };
            console.log(data);
            response.render('new', data);
        }
    });
});

app.post('/artists', (request, response) => {
    var artistData = request.body;
    console.log( artistData );
    const queryString = 'INSERT INTO artists (name, nationality, photo_url) VALUES ($1, $2, $3)';
    let values = [artistData.name, artistData.nationality, artistData.photo_url];
    pool.query(queryString, values, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            /*const data = {
                artist : res.rows[0]
            }
            console.log(data);*/
            response.send("Artist has been created!");
        }

    });
});

//edit an artist
app.get('/artists/:id/edit', (request, response) => {
    var inputId = parseInt(request.params.id);
    let queryString = "SELECT * FROM artists WHERE id = ($1)";
    var idVal = [inputId];
    console.log(idVal);
    pool.query(queryString, idVal, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            const data = {
                artist : res.rows[0]
            };
            console.log(data);
            response.render('editartist', data);
        }
    });
});

app.put('/artists/:id', (request, response) => {
    console.log("inside put req");
    let artistIdInt = parseInt(request.params.id);
    console.log(request.body);
    const queryString = "UPDATE artists SET name=($1), nationality=($2), photo_url=($3) WHERE id = ($4)";
    let values = [request.body.name, request.body.nationality, request.body.photo_url, artistIdInt];
    pool.query(queryString, values, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            const data = {
                artist : request.body
            }
            response.render('oneartist', data);
        }
    });
});

//delete an artist
app.get('/artists/:id/delete', (request, response) => {
    var inputId = parseInt(request.params.id);
    let queryString = "SELECT * FROM artists WHERE id = ($1)";
    var idVal = [inputId];
    console.log(idVal);
    pool.query(queryString, idVal, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            const data = {
                artist : res.rows[0]
            };
            //console.log(data);
            response.render('deleteartist', data);
        }
    });
});

app.delete('/artists/:id', (request, response) => {
    console.log("inside app delete");
    var inputId = parseInt(request.params.id);
    let queryString = "DELETE FROM artists WHERE id = ($1)";
    var idVal = [inputId];
    console.log(idVal);
    pool.query(queryString, idVal, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            //response.send('Yay! deleted!');
            response.redirect('/artists');
        }
    });
});

app.get('/artists/:id', (request, response) => {
    var inputId = parseInt(request.params.id);
    console.log(inputId);
    let queryString = "SELECT * FROM artists WHERE id = ($1)";
    var idVal = [inputId];
    console.log(idVal);
    pool.query(queryString, idVal, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            const data = {
                artist : res.rows[0]
            }
            response.render('oneartist', data);
        }
    });
});

//show all artists
app.get('/artists', (request, response) => {
  // query database for all artists
    const queryString = 'SELECT * FROM artists';
    pool.query(queryString, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            // iterate through all of your results:
            const data = {
                artistsData : res.rows
            }
            response.render('home', data);
        }
    });
  // respond with HTML page displaying all pokemon
  //response.render('home');
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