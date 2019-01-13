console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jasonw',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
  password: '1234'
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

// Get form for entering new artist
app.get('/artists/new',(req,res) => {
    res.render('new')
});


//Build the index feature for artists
app.get('/artists', (req, res) => {

// Get all the artists, output in object view
    const queryText = `SELECT * FROM artists ORDER BY id ASC`;

   pool.query(queryText,(err, queryResult) => {
        if (err) {
            console.log('Error: ', error);
        } else {
            console.log("Result: ", queryResult.rows);
            //console.log(queryResult.rows);
             res.render('home', {artists: queryResult.rows});
         };
    });
});

//Build the show feature for an artist
app.get('/artists/:id', (req, res) => {

    let id = req.params.id;
    const queryText = `SELECT * FROM artists WHERE id = '${id}'`;

   pool.query(queryText,(err, queryResult) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("result", queryResult.rows);
            res.render("displaySingleArtist", {artists: queryResult.rows});
        };

 //response.render('home');
    });
});


app.post('/artist', (request, response) => {
  //let id = request.params.id;
  let queryText = 'INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3)';
  const values = [request.body.name,request.body.photo_url,request.body.nationality];

  pool.query(queryText, values, (err, queryResult) => {
            if (err) {
                console.log('Error', err);
            }
            console.log("result", queryResult.rows);
            response.render("new", queryResult.rows);
  });
});

// gets the ID for the editing of artist in edit form?
app.get('/artists/:id/edit', (request, response) => {
    let id = (request.params.id) -1;
    const queryText = `SELECT * FROM artists WHERE id = '${id}'`;

    pool.query(queryText,(err, queryResult) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("result", queryResult.rows);
            response.render("editArtist", {artists: queryResult.rows});
        };

    });
            //let searchedArtist = obj.artists[id];
});


app.get('/artists/:id/delete', (request, response) => {
    let id = (request.params.id) -1;
    const queryText = `SELECT * FROM artists WHERE id = '${id}'`;

    pool.query(queryText,(err, queryResult) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("result", queryResult.rows);
            response.render("deleteArtist", {artists: queryResult.rows});
        };

    });
            //let searchedArtist = obj.artists[id];
});

//Build a feature that allows a user to edit an existing artist in the database
app.put('/artists/:id/', (req, res) => {

    let id = (req.params.id) -1;
    let queryText = `UPDATE artists SET (name,photo_url,nationality) VALUES ($1,$2,$3) WHERE id ='${id}'`;
     const values = [req.body.name,req.body.photo_url,req.body.nationality];

    //let artistId = parseInt(req.params.id) -1;
    //let artists;
    pool.query(queryText, values, (err, queryResult) => {
        if (err) {
            console.log("Error", err);
        } else {
            res.render('home', {artist:queryResult.rows});
        }
        //res.send(queryResult.rows);
    });
});

//Build a feature that allows users to delete an existing artist from the database.
app.delete('/artists/:id', (req, res) => {
    let id = (request.params.id) -1;
    let queryText = `DELETE from artists WHERE id = '${id}'`;

    pool.query(queryText, (err, queryResult) => {
        if (err) {
            console.log("Error", err);
        } else {
            res.redirect('/artists');
        }
    });
});

//========================================//
//       TUNR RELATIONSHIPS --------------//
//=======================================//

app.get('/artists/:id/songs', (req, res) => {

    let id = req.params.id; // artist ID
    const queryText = `SELECT * FROM songs  WHERE id = '${id}'`;

   pool.query(queryText,(err, queryResult) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("result", queryResult.rows);
            res.render("displayArtistSongs", {songs: queryResult.rows});
        };

 //response.render('home');
    });
});

app.post('/artist/:id/songs', (request, response) => {
  //let id = request.params.id;
  let queryText = 'INSERT INTO songs (title, album, preview_link, artwork ) VALUES ($1,$2,$3,$4)';
  const values = [request.body.title,request.body.album,request.body.preview_link, request.body.artwork];

  pool.query(queryText, values, (err, queryResult) => {
            if (err) {
                console.log('Error', err);
            }
            console.log("result", queryResult.rows);
            response.render("addSongs", queryResult.rows);
  });
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


/*app.get('/artists/:name', (req, res) => {

    let name = req.params.name;
    console.log(name);
    const queryText = `SELECT * FROM artists WHERE name ='${name}'`;
    console.log(queryText);

   pool.query(queryText,(err, queryResult) => {
        console.log(err);
        console.log("result", queryResult.rows);

        res.send(queryResult.rows);
 //response.render('home');
    });
});*/