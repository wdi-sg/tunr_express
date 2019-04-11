console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'll',
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

//index
app.get('/artist', (request, response) => {
    const queryString = 'SELECT * from artists';
    pool.query(queryString, (errorObj, result) => {
        if (errorObj === undefined) {
            console.log('query result:', result.rows);
            const data = { artists : result.rows};
            response.render('home', data);
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
    });
})

//create
app.get('/artist/new', (request, response) => {
    response.render('new');
})

app.post('/artist', (request,response)=> {
    console.log(request.body)
    const queryString = 'INSERT INTO artists(name, photo_url, nationality) VALUES ($1,$2,$3) RETURNING *';
    const value = [request.body.name, request.body.photo_url,request.body.nationality]
    pool.query(queryString, value, (errorObj)=> {
        if (errorObj === undefined) {
            response.redirect('/artist');
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
    })
})

//show
app.get('/artist/:id', (request, response) => {
    const queryString = 'SELECT * from artists WHERE id =' + request.params.id;
    pool.query(queryString, (errorObj, result) => {
        if (errorObj === undefined) {
            console.log('query result:', result.rows);
            const data = {  artists : result.rows};
            response.render('show', data);
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
    });
})

//edit
app.get('/artist/:id/edit', (request, response) => {
    const queryString = 'SELECT * from artists WHERE id =' + request.params.id;
    pool.query(queryString, (errorObj, result) => {
        if (errorObj === undefined) {
            console.log('query result:', result.rows);
            const data = { artists : result.rows};
            response.render('edit', data);
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
    });
})

app.put('/artist/:id', (request,response)=> {
    const queryString = 'UPDATE artists SET name = ($1), photo_url = ($2), nationality= ($3) WHERE id =' + request.params.id;
    const value = [request.body.name, request.body.photo_url,request.body.nationality]
    pool.query(queryString, value, (errorObj)=> {
        if (errorObj === undefined) {
            response.redirect('/artist');
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
    });
})

//delete

//get songs from artist
app.get('/artist/:id/songs', (request, response) => {
    console.log(request.params.id);
    const queryString = 'SELECT * FROM songs WHERE artist_id =' + request.params.id;
    pool.query(queryString, (errorObj, result) => {
        if (errorObj === undefined) {
            console.log('query result:', result.rows);
            const data = {  songs : result.rows};
            response.render('artistsongs', data);
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
        }
    });
})

//artist new song
app.get('/artist/:id/songs/new', (request, response) => {
    let data = {data:request.params.id};
    response.render('artistSongNew',data);
})

app.post('/artist/:id/songs', (request,response)=> {
    console.log(request.body)
    const queryString= 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const value = [request.body.title, request.body.album,request.body.preview_link,request.body.artwork,request.body.artist_id]
    pool.query(queryString, value, (errorObj)=> {
        if (errorObj === undefined) {
            response.redirect('/artist');
        } else {
            console.error('query error:', errorObj.stack);
            response.send( 'query error' );
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