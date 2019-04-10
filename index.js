console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'Chris',
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

app.get('/', (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  // response.render('home');
  response.send('hello its me');
});

// app.get('/new', (request, response) => {
//   // respond with HTML page with form to create new pokemon
//   response.render('new');
// });



app.get('/artists/add', (request, response) => {
    const queryString = 'SELECT * FROM artists ORDER BY id DESC LIMIT 1';
    console.log(queryString);
    pool.query(queryString, (err, result) => {

        // console.log( err, result );
        if (err === undefined ) {
            const data = {data: result.rows}
            // console.log(data);
            response.render('new', data);
        } else {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
    });
});

app.post('/artists/:id', (request, response) => {
    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';
    const values = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(queryString, values, (err, result) => {

        // console.log( err, result );
        if (err === undefined ) {
            const data = {artists: result.rows}
            response.render('home', data);
        } else {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
    });
});

app.get('/artists', (request, response) => {
    const queryString = 'SELECT * FROM artists';
    pool.query(queryString, (err, result) => {

        // console.log( err, result );
        if (err === undefined ) {
            const data = {artists: result.rows }
            response.render('home', data );
        } else {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
    });
});

app.get('/artists/:id', (request, response) => {
    const queryString = 'SELECT * FROM artists WHERE id=' + request.params.id;
    pool.query(queryString, (err, result) => {

        // console.log( err, result );
        if (err === undefined ) {
            const data = {artists: result.rows}
            response.render('home', data );
        } else {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
    });
});

app.get('/artists/:id/edit', (request, response) => {

    let index = request.params.id;
    const queryString = `SELECT * FROM artists WHERE id=${index}`;

    pool.query(queryString, (err, result) => {

    if (err) {
        console.log('query error', err.stack);
        response.send('query error');
    } else {
        console.log('query result', result.rows);
        const data = result.rows;
        response.render('edit', {artists: data});
    }

    })
})


app.put('/artists/:id', (request, response) => {

   let index = request.params.id;

   const queryString = `UPDATE artists SET name='${request.body.name}', photo_url='${request.body.photo_url}', nationality='${request.body.nationality}' WHERE id=${index} RETURNING *`;

       pool.query(queryString, (err, result) => {

            if (err) {
                console.log('query error', err.stack);
                response.send('query error');
            } else {
                let data = result.rows;
                response.render('artists', {artists: data});
            }
        })

});

app.get('/artists/:id/delete', (request, response) => {

    let index = request.params.id;
   const queryString = `SELECT * FROM artists WHERE id=${index}`;

    pool.query(queryString, (err, result) => {

            if (err) {
                console.log('query error', err.stack);
                response.send('query error');
            } else {
                const data = result.rows;
                response.render('delete', {artists: data});
            }
    })

})

app.delete('/artists/:id', (request, response) => {

    let index = request.params.id;
    const queryString = `DELETE FROM artists WHERE id=${index}`;

    pool.query(queryString, (err, result) => {

            if (err) {
                console.log('query error', err.stack);
                response.send('query error');
            } else {
                response.send("Deleted!");
            }
    })

})

app.get('/artist/:id/songs', (request, response) => {
    const queryString = 'SELECT * FROM songs WHERE artist_id = '+ request.params.id +';';
    pool.query(queryString, (err, result) => {

            if (err) {
                console.log('query error', err.stack);
                response.send('query error');
            } else {
                const data = {songs:result.rows};
                response.render("songs", data);
            }
    })
})

app.get('/artist/:id/songs/add', (request, response) => {
    const queryString = 'SELECT * FROM songs ORDER BY id DESC LIMIT 1;';
    pool.query(queryString, (err, result) => {

            if (err) {
                console.log('query error', err.stack);
                response.send('query error');
            } else {
                const data = {artistId: request.params.id};
                response.render("newsong", {artistId: request.params.id});
            }
    })
});

app.get('/artist/:id/songs', (request, response) => {
    const queryString = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5);';
    const values = [request.body.title, request.body.album, request.body.artwork, request.body.artist_id];
    pool.query(queryString, values, (err, result) => {

            if (err) {
                console.log('query error', err.stack);
                response.send('query error');
            } else {
                const data = {songs: result.rows};
                response.render("songs", data);
            }
    })
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(555, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
