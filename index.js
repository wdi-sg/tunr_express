console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'eugene',
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
// home page to show all the particulars of the artists
app.get('/', (request, response) => {

    const queryString= "SELECT * FROM artist"

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("query error");
        }else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


// rendering the page to create a new artist
app.get('/artist/new', (request, response) => {

  response.render('new');
});

// putting the created new artist into the table
app.post('/artist', (request, response) => {

    console.log(request.body);
    const newArr= [request.body.name, request.body.photo_url, request.body.nationality];

    const queryString= "INSERT INTO artist (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(queryString, newArr, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("query error");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    })
})

// find artist through id
app.get('/artist/:id', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM artist WHERE id="+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("NO SUCH PERSON ON EARTH");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


app.get('/artist/:id/edit', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM artist WHERE id="+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("NO SUCH PERSON IN OUR DATABASE");
        }
        else {
            console.log("query result :", result.rows[0]);


            response.render("edit", result.rows[0]);
        }
    });
});


app.put('/artist/:id', (request, response) => {

    console.log(request.body);
    let name= request.body.name;
    let photo=request.body.photo_url;
    let nationality= request.body.nationality;
    let inputId= parseInt(request.params.id);
    const newArr= [name, photo, nationality, inputId];

    const queryString= "UPDATE artist SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4";

    // const queryString= "UPDATE artist SET name= "+request.body.name+", photo_url= "+request.body.photo_url+", nationality= "+request.body.nationality+" WHERE id ="+inputId;
    console.log(queryString);

    pool.query(queryString, newArr, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("Error In Codes");
        }
        else {
            console.log("query result :", result);

            response.redirect("/artist/"+request.params.id);
        }
    })
})


// find all songs through artist id
app.get('/artist/:id/songs', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    const queryString= "SELECT * FROM songs WHERE artist_id = "+inputId;

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("Artist not found. Try again.");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


app.get('/playlist/new', (request, response) => {

    response.render("playlist");
});


app.post('/playlist', (request, response) => {

    console.log(request.body);
    const inputName= [request.body.name];

    const queryString= "INSERT INTO playlists (name) VALUES ($1) RETURNING *";
    console.log(queryString);

    pool.query(queryString, inputName, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("query error");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


// SELECT playlist_song.playlist_id, songs.title
// FROM playlist_song
// INNER JOIN songs
// ON (songs.id = playlist_song.song_id)
// WHERE playlist_song.playlist_id = 1;




// work in progress. want to show up both playlist and song names
app.get('/playlist/:id', (request, response) => {

    let inputId= parseInt(request.params.id);
    console.log("id :", inputId);

    // const queryString= "SELECT * FROM playlists WHERE id="+inputId;
    const queryString= "SELECT playlist_song.playlist_id, songs.title FROM playlist_song INNER JOIN songs ON (songs.id = playlist_song.song_id) WHERE playlist_song.playlist_id ="+inputId;
    console.log(queryString);

    pool.query(queryString, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("No such Playlist");
        }
        else {
            console.log("query result :", result);

            response.send(result.rows);
        }
    });
});


app.get('/playlist/:id/addsong', (request, response) => {

    let data= {
        id : parseInt(request.params.id)
    }
    response.render("addsong", data);
})


app.post('/playlist/:id', (request, response) => {

    console.log(request.body);
    let songId= request.body.song_id;
    let inputId= request.params.id;
    const newArr= [songId, inputId];

    const queryString= 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2)';
    console.log(queryString);

    pool.query(queryString, newArr, (err, result) => {

        if(err) {
            console.error("query error", err.message);
            response.send("No such Thing");
        }
        else {
            console.log("query result: result");

            response.send(result.rows);
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