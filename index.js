console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'marcykay',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(express.static(__dirname + '/public/'));
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

app.get('/artists/:id/edit', (request, response) => {
    console.log(request.params.id);
    //response.render('edit', request.params.id);
    const queryString = `SELECT * from artists WHERE id=${request.params.id}`;
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                artists: result.rows
            }
            response.render('edit', data);
        }
    });
});

app.get('/artists/:id/delete', (request, response) => {
    console.log(request.params.id);
    //response.render('edit', request.params.id);
    const queryString = `SELECT * from artists WHERE id=${request.params.id}`;
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                artists: result.rows
            }
            response.render('delete', data);
        }
    });
});

app.put('/artist/:id', (request, response) => {
    let artistInfo = request.body;
    console.log(artistInfo);
    const queryString = `UPDATE artists SET name='${artistInfo.name}', photo_url='${artistInfo.photo_url}', nationality='${artistInfo.nationality}' WHERE id=${request.params.id}`;
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            response.redirect('/artists');
        }
    });
})

app.delete('/artist/:id', (request, response) => {
    let artistId = request.params.id;
    console.log(artistId);
    const queryString = `DELETE FROM artists WHERE id=${artistId}`;
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            response.redirect('/artists');
        }
    });

});

app.post('/artist', (request, response) => {
    let newArtist = request.body;
    console.log(newArtist);
    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${newArtist.name}','${newArtist.photo_url}', '${newArtist.nationality}') `;
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            response.redirect('/artists');
        }
    });

});



app.get('/artists/new', (request, response) => {

    response.render('new');

});

app.get('/artists', (request, response) => {

    const queryString = 'SELECT * from artists ORDER BY id ASC';
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                artists: result.rows
            }

            response.render('home', data);
        }
    });

});

app.get('/artists/:id', (request, response) => {

    const queryString = 'SELECT * from songs WHERE artist_id = ' + request.params.id;
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                songs: result.rows
            }

            response.render('songs', data);
        }
    });
});

app.get('/new', (request, response) => {

    response.render('new');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
