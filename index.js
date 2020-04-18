const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'rachelik',
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

const express = require('express');

// Init express app
const app = express();

// tell app to use module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// For PUT or DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// Sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
//tells express where to look for the view files
app.set('views', __dirname + '/views');
// sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//ALL VARIABLES
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// '/artists'
// GET
// - allArtistsQ (All artists data query)
// - allArtistsResult (All artists data)
// POST
// - newArtistProfile
// - newArtistValues
// - newArtistId

// '/artists/:id'
// - artistProfile
// - artistProfileResult

// '/artists/:id/edit'
// - editArtistProfile
// - editArtistProfileErr
// - editArtistProfileResult


// '/' MAIN (HOME PAGE)
//jsx: home

//------------------------------------------------------
// INDEX. List out all ARTIST in HTML.
// - DONE (to artists.jsx) -
//------------------------------------------------------
app.get('/artists', (req, res) => {
    // query database for all artists
    const allArtistsQ = 'SELECT * from artists';
    const whenQueryDone = (queryError, allArtistsResult) => {
        if (queryError) {
            console.log(queryError);
            res.status(500);
            res.send('db error');
        } else {
            res.render('artists', allArtistsResult);
        }
    }
    pool.query(allArtistsQ, whenQueryDone);
});

//------------------------------------------------------
// FORM to get user input for NEW ARTIST
// - DONE (to new-artist.jsx) -
//------------------------------------------------------
app.get('/artists/new', (req, res) => {
    //FORM to add new artists
    res.render('new-artist')
});

//------------------------------------------------------
// Save NEW ARTIST
// - DONE (from new-artist.jsx redirect to /artists/:id) -
//------------------------------------------------------
app.post('/artists', (req, res) => {
    // console.log(req.body);
    const whenQueryDone = (queryError, newArtistResult) => {
        if (queryError) {
            res.status(500);
            res.send('db error');
        } else {
            let newArtistId = newArtistResult.rows[0].id;
            // console.log(newArtistId);
            res.redirect('/artists/'+newArtistId);
        };
    };
    const newArtistProfile = "INSERT INTO artists (name, photo_url, nationality) values ($1, $2, $3) RETURNING *";
    const newArtistValues = [req.body.name, req.body.photo_url, req.body.nationality];
    pool.query(newArtistProfile, newArtistValues, whenQueryDone);
});

//------------------------------------------------------
// SHOW ARTIST by ID
// - DONE (to show-artist.jsx) -
//------------------------------------------------------
app.get('/artists/:id', (req, res) => {
    const artistProfile = 'SELECT * FROM artists WHERE id ='+req.params.id;
    pool.query(artistProfile, (artistProfileErr, artistProfileResult) => {
        if (artistProfileErr) {
            console.log(artistProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            // console.log('query result:', artistResult);
            // show info about artist selected.
            const data = {
                artist : artistProfileResult.rows[0]
            };
            console.log(data);
            res.render('show-artist', data);
        };
    });
});



//?????????????????????????????????????????????????????????????????????
// EDIT FORM
// - on-going -
//
app.get('/artists/:id/edit', (req, res) => {
    const editArtistProfile = 'SELECT * FROM artists WHERE id ='+req.params.id;
    pool.query(editArtistProfile, (editArtistProfileErr, editArtistProfileResult) => {
        if (editArtistProfileErr) {
            console.log(editArtistProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            const data = {
                artist : editArtistProfileResult.rows[0]
            };
            // console.log(data);
            res.render('edit-artist', data);
        };
    });
});

//?????????????????????????????????????????????????????????????????????
// EDIT (UPDATE) Artist
// - on-going -
//
app.put('/artists/:id', (req, res) => {
    const putArtistProfile = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id='+req.params.id;

    const putArtistValues = [req.body.name, req.body.photo_url, req.body.nationality];

    pool.query(putArtistProfile, putArtistValues, (putArtistProfileErr, putArtistProfileResult) => {
        if (putArtistProfileErr) {
            console.log(putArtistProfileErr);
            res.status(500);
            res.send('ERR');
        } else {
            res.redirect('/artists/'+req.params.id);
        };
    });

});



//------------------------------------------------------
// HOME
// - DONE (to home.jsx) -
//------------------------------------------------------
app.get('/', (req, res) => {
        res.render('home');
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
