console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'aliciawong',
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
    response.redirect("/artist");
});

//index for artists

app.get('/artist', (request, response) => {
    console.log('showing artists index');

    let queryString = "SELECT id, name FROM artists ORDER BY id ASC";

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result);

        const data = {
            artists : result.rows
        };
        console.log("what this");
        console.log(data.artists);

        response.render('home', data);
        }
    });
});

//create new artist
app.get('/artist/new', (request, response) => {
  console.log('getting form');
  response.render('new');
});

app.post('/artist/new', (request, response) => {
    console.log('sending info');

    console.log(request.body);

    let queryString = "insert into artists (name, photo_url, nationality) values ($1, $2, $3)";

    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
            console.log('query result:', result);

            response.redirect("/artist");
        }
    });
});

//display each artist
app.get('/artist/:id', (request, response) => {
    console.log('showing each artist by id');

    let Id = parseInt(request.params.id);
    console.log(Id);
    let queryString = "select * from artists where id="+Id;

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result);

        const data = {
            artistId : result.rows[0].id,
            artistName : result.rows[0].name,
            artistImg : result.rows[0].photo_url,
            artistNat : result.rows[0].nationality
        };
        console.log(data);
        response.render('artist', data);
        }
    });
});

//edit artist
app.get('/artist/:id/edit', (request, response) => {
  console.log('getting form');

  let Id = parseInt(request.params.id);
    console.log(Id);

    let queryString = "SELECT * from artists WHERE id="+Id;

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result);

        const data = {
            artistId : result.rows[0].id,
            artistName : result.rows[0].name,
            artistImg : result.rows[0].photo_url,
            artistNat : result.rows[0].nationality
        };
        response.render('edit', data);
        }
    });
});


app.put('/artist/:id/edit', (request, response) => {
    console.log('editing artist info');

    let Id = parseInt(request.params.id);
    console.log(Id);

    console.log('rb', request.body);

    let edits = request.body;
    console.log(edits);

    let queryString = "UPDATE artists SET photo_url = edits.photo_url, nationality = edits.nationality FROM edits WHERE id="+Id;

    console.log('don uds why cannot');

    pool.query(queryString, (err, result) => {
        console.log('don')
        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result.rows);

        response.redirect("/artist/:id");
        }
    });
});

//delete artist
app.delete('/artist/:id', (request, response) => {
    console.log('deleting artist');

    let Id = parseInt(request.params.id);
    console.log(Id);

    let queryString = "DELETE from artists WHERE id="+Id;

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result);

        response.redirect("/artist");
        }
    });
});


//display list of songs by the artist
app.get('/artist/:id/songs', (request, response) => {
    console.log('showing all songs by artist');

    let Id = parseInt(request.params.id);
    console.log(Id);
    let queryString = "SELECT songs.title, artists.name FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) WHERE artist_id="+Id;

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result);

        const data = {
            artistSongs : result.rows
        };
        console.log('getting data');
        console.log(data);
        response.render('songs', data);
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