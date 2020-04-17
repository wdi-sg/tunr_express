console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'chanosborne',
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

//Home
app.get('/artists/', (request, response) => {
    response.render('home');
});

//List of all Artists
app.get('/artists/list', (request, response) => {
    const queryString = 'SELECT * FROM artists ORDER BY id ASC';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when displaying list of artists 😢');
        } else {
            const data = {
                list: result.rows
            }

        response.render('list', data);
        }
    })
});

//Create new artist
app.get('/artists/new', (request, response) => {
    response.render('new');
});

app.post('/artists', (request, response) => {
    const newArtist = request.body;

    let values = [newArtist.name, newArtist.photo_url, newArtist.nationality];
    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log('dbQuery Error', err.stack);
            response.send('An error occurred when creating new artist 😢');
        } else {
            const data = {
                name: newArtist.name,
                photo_url: newArtist.photo_url,
                nationality: newArtist.nationality
            }

        response.render('artist', data);
        }
    })
});

//Display all songs of an artist
app.get('/artists/:id/songs', (request, response) => {

    let id = request.params.id;
    let querySongString = 'SELECT * FROM songs WHERE artist_id=' + id;
    //let queryString = 'SELECT songs.id, songs.title, songs.preview_link, songs.artwork, song.artist_id, artists.id', artists.name, artists.photo_url, artists.nationality FROM songs INNER JOIN artists ON (songs.artist_id = artists.id)

    pool.query(querySongString, (err, result) => {
        if (err) {
            console.log('Query Error', err.stack);
            response.send("An error occurred when displaying artist's songs 😢");
        } else {
            let songs = result.rows;
            let queryArtistString = 'SELECT * FROM artists WHERE id=' + id;

            pool.query(queryArtistString, (err, result) => {
                const data = {
                    songs: songs,
                    artist: result.rows
                }
            response.render('songs', data);
            });
        }
    });
})

//Edit artist details
app.get('/artists/:id/edit', (request, response) => {

    let id = request.params.id;
    let queryString = 'SELECT * FROM artists WHERE id=' + id;

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('Query Error', err.stack);
            response.send("An error occurred when displaying artist's page 😢");
        } else {
            const data = {
                artist: result.rows
            }
        response.render('edit', data);
        }
    });
})

app.put('/artists/:id', (request, response) => {
    const update = request.body;
    const queryString = "UPDATE artists SET name='" + update.name + "', photo_url='" + update.photo_url + "', nationality='" + update.nationality + "' WHERE id=" + request.params.id;

    pool.query(queryString, (err, result) => {
        let updatedArtistPage = '/artists/' + request.params.id;
        response.redirect(updatedArtistPage);
    })
})

app.delete('/artists/:id', (request, response) => {
    const queryString = 'DELETE FROM artists WHERE id=' + request.params.id;
    console.log('queryString:', queryString)

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('Query Error', err.stack);
            response.send('An error occurred when deleting artist information 😢');
        } else {
            response.redirect('/artists/list');
        }
    });
})

//Show individual artist
app.get('/artists/:id', (request, response) => {
    const queryString = 'SELECT * FROM artists ORDER BY id ASC';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.log('Query Error', err.stack);
            response.send('An error occurred when displaying artist information 😢');
        } else {
            result.rows.forEach(row => {
                let index = result.rows.indexOf(row)

                if (parseInt(request.params.id) === row.id) {
                    const data = {
                        id: result.rows[index].id,
                        name: result.rows[index].name,
                        photo_url: result.rows[index].photo_url,
                        nationality: result.rows[index].nationality
                    }

                response.render('show', data);
                }
            })
        }
    });
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