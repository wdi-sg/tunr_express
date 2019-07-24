console.log("starting up!!");
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'bennychin',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

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
app.use(express.static(__dirname+'/public/'));
app.engine('jsx', reactEngine);


 /**
 * ======================================================
 *           Route - Index - Homepage - Show
 * ======================================================
 */

app.get('/', (request, response) => {
  // query database for all artists
    const queryString = 'SELECT * from artists'

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // redirect to home page
        response.render('home',result);
      }
    });
});

app.get('/artist', (request, response) => {
    response.redirect('/');
});

 /**
 * ======================================================
 *                  Route - Add Artist
 * ======================================================
 */
app.get('/artist/new', (request, response) => {
  // respond with HTML page with form to create new artist
    response.render('addArtist');
});

app.post('/artist', (request,response) => {
    console.log("request body is");
    console.log(request.body);

    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES($1, $2, $3);`

    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // console.log('query result:', result);
        // redirect to home page
        response.redirect('/');
      }
    });
});

 /**
 * ======================================================
 *         Route - Individual Artist - Show Songs
 * ======================================================
 */
app.get('/artist/:id/songs', (request, response) => {
  // query database for selected artist by id to show songs
    let queryString = `SELECT * FROM artists INNER JOIN songs ON artists.id=songs.artist_id WHERE artists.id=$1`;

    let values = [request.params.id];

    pool.query(queryString, values, (err, result) => {

            if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );

            } else {
                if (result.rows.length === 0) {
                    const newQuery = `SELECT * FROM artists WHERE id=$1`;

                    pool.query(newQuery, values, (err, newResult) => {
                        console.log(newResult);

                    response.render('artistPage',newResult);

                    })
                } else {
                // console.log('query result:', result);
                // render artist page
                response.render('artistPage',result);
                }
            }
    });
});

 /**
 * ======================================================
 *                Route - Artist - Edit/Delete
 * ======================================================
 */
app.get('/artist/:id/edit', (request, response) => {
  // query database for selected artist by id
    const queryString = "SELECT * FROM artists WHERE id = " + request.params.id;

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // console.log('query result:', result);


        response.render('editArtist',result);
        // response.send(result)
      }
    });
  //   console.log("?????");
  // response.send("hello tunr db");
});


app.put('/artist/:id', (request,response) => {
    console.log("EDITING");
    // console.log(request.body);

    const queryString = `UPDATE artists SET name='${request.body.name}', photo_url='${request.body.photo_url}', nationality='${request.body.nationality}' WHERE id='${request.params.id}';`


    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        console.log('query result:', result);

        // redirect to home page
        response.redirect('/');
      }
    });
});

app.delete('/artist/:id', (request,response) => {
    console.log("DELETING!!");
    // console.log(request.body);

    const queryString = 'DELETE FROM artists WHERE id=$1';

    let value = [request.params.id];

    pool.query(queryString, value, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        console.log("DELETED!!");

        // redirect to home page
        response.redirect('/');
      }
    });
});

 /**
 * ======================================================
 *            Route - Artist - Add New Songs
 * ======================================================
 */
app.get('/artist/:id/songs/new', (request, response) => {
  // query database for selected artist by id
    const queryString = `SELECT * FROM artists INNER JOIN songs ON artists.id=songs.artist_id WHERE artists.id=$1`;

    let values = [request.params.id];

    pool.query(queryString, values, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
            if (result.rows.length === 0) {
                const newQuery = `SELECT * FROM artists WHERE id=$1`;

                pool.query(newQuery, values, (err, newResult) => {

                    response.render('addSong',newResult);

                });

            } else {
                console.log('query result:', result);

                response.render('addSong',result);
                // response.send(result)
            }
      }
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






 /**
 * ======================================================
 *         Route - Individual Artist - Show Songs
 * ======================================================
 */
// app.post('/artist/:id', (request,response) => {
//     console.log("request body is");
//     console.log(request.body);

//     const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES($1, $2, $3);`

//     const values = [request.body.name, request.body.photo_url, request.body.nationality];

//     pool.query(queryString, values, (err, result) => {

//         if (err) {
//         console.error('query error:', err.stack);
//         response.send( 'query error' );

//         } else {
//         console.log('query result:', result);

//         // redirect to home page
//         response.render('editArtist',result);
//       }
//     });
// });