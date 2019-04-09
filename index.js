console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'andyng',
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

// Show all artists
app.get('/artist', (request, response) => {
    // query database for all pokemon
    // After editing a data, it gets push to the bottom of the 'database'
    // we can sort them here by adding ORDER BY id**
    const queryString = "Select * FROM artists ORDER BY id";
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{},{}]
            // const artistsArr = result.rows;
            // we then need to pass the arr into an obj?
            const data = {artists : result.rows};
            response.render('home', data);
        }
    })
});

// Renders a form for 'creating' new artist
// ** This route should be before the show route. As they have similar link /artist/new fits /artist/:id
app.get('/artist/new', (request, response) => {
    response.render('new');
})

app.post('/artist', (request, response) => {
    const newArtist = request.body; // {}
    const queryString = `INSERT INTO artists
    (name, photo_url, nationality)
    VALUES
    ('${newArtist.name}', '${newArtist["photo_url"]}', '${newArtist.nationality}') RETURNING *`;
    // console.log(queryString);
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{}]
            const index = result.rows[0].id;
            response.redirect(`/artist/${index}`);
        }
    })
})

// Show a particular artist
app.get('/artist/:id', (request, response) => {
    const reqId = parseFloat(request.params.id);
    const queryString = `SELECT * FROM artists WHERE id = ${reqId}`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows is always an arr even if it's only 1 'result'
            const data = {artist : result.rows};
            response.render('show', data);
        }
    })
});

// Render a form for editing
app.get('/artist/:id/edit', (request, response) => {
    const reqId = parseFloat(request.params.id);
    const queryString = `SELECT * FROM artists WHERE id = ${reqId}`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows is always an arr even if it's only 1 'result'
            const data = {artist : result.rows};
            response.render('edit', data);
        }
    })
})

// Put route..
app.put('/artist/:id', (request, response) => {
    const reqId = parseFloat(request.params.id);
    const editedObj = request.body; // {} is from the edit form
    // console.log(editedObj);
    // We need to update =_=
    const queryString = `UPDATE artists SET name='${editedObj.name}', photo_url='${editedObj["photo_url"]}', nationality='${editedObj.nationality}' WHERE id = ${reqId}`;
    // console.log(queryString);
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            // result.rows [{}]
            // even though the order inside the 'database' get messed up after edit
            // referencing reqId will always bring us to the edited artist(in this case)
            response.redirect(`/artist/${reqId}`);
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