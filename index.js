console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'hockie2',
  password:'bhhorse2',
  host: '127.0.0.1',
  port: 5432,
  database: 'tunr_db',
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
app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  response.redirect('/artists');
});

////////////////////////////////////////////////////////////////////////////
app.get('/artists', (request, response) => {

    const queryText = 'SELECT * FROM artists ORDER BY id ASC';

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
        else {

            var data = {
              artists: result.rows
            }

            response.render('home',data);
        }
    })
});

////////////////////////////////////////////////////////////////////////////
app.get('/artists/new', (request, response) => {

    response.render("new");
})

////////////////////////////////////////////////////////////////////////////
app.post('/artists', (request, response) => {

    const queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3) RETURNING *';
    let arr = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(queryText, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            response.render('artist', data);
        }
    });
})

////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id', (request, response) => {

    const queryText = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);

    pool.query(queryText, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

            let data = {
                artists: result.rows[0]
            };
            response.render('artist', data);
        }
    });
});


////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id/edit', (request, response) => {

    const queryText = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);

    pool.query(queryText, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                artists: result.rows[0]
            };
            response.render('edit', data);
        }
    });
});


////////////////////////////////////////////////////////////////////////////
app.put('/artists/:id', (request, response) => {
    const queryText = 'UPDATE artists SET name=$1,nationality=$2,photo_url=$3 WHERE id =' + parseInt(request.params.id) + 'RETURNING *';
    let arr = [request.body.name, request.body.nationality, request.body.photo_url];
    pool.query(queryText, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                artists: result.rows[0]
            };

            response.render('artist', data);
        }
    });
})


////////////////////////////////////////////////////////////////////////////
app.delete('/artists/:id', (request, response) => {
    const queryText = 'DELETE FROM artists WHERE id=' + parseInt(request.params.id);
    pool.query(queryText, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

            response.redirect("/artists");
        }
    });
})

////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id/songs', (request, response) => {
    const queryText = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);
    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        else {
            const songText = 'SELECT * FROM songs WHERE artist_id=' + result.rows[0].id;

            pool.query(songText, (err, result2) => {

                if (err) {
                    console.error('query error:', err.stack);
                    response.send('query error');
                } else {
                    let data = {
                        songsList: result2.rows,
                        artists:result.rows[0]
                    }

                    response.render("songlist", data);
                }
            });
        }
    });
})
////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id/songs/new', (request, response) => {
    const queryText = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);
    pool.query(queryText, (err, result) => {

        let data={
            artists:result.rows[0]
        }

    response.render("songnew", data);
    })
})

////////////////////////////////////////////////////////////////////////////
app.post('/artists/:id/songs', (request, response) => {
    let id = parseInt(request.params.id);
    const queryText = 'INSERT INTO songs (title, album, preview_link, artwork,artist_id) VALUES ($1,$2,$3,$4,$5)';
    let arr = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id];
    pool.query(queryText, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

            response.redirect("/artists/" + id + "/songs");
        }
    });

})



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// let onClose = function(){

//   console.log("closing");

//   server.close(() => {

//     console.log('Process terminated');

//     pool.end( () => console.log('Shut down db connection pool'));
//   })
// };

// process.on('SIGTERM', onClose);
// process.on('SIGINT', onClose);
