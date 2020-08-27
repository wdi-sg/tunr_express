console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'clairetay',
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

app.get('/artists/', (request, response) => {
  let queryText = "SELECT * FROM artists"
  pool.query(queryText, (err, res)=>{
    if(err){
        console.log(err.message)
        response.send("error occured")
    } else {
        response.render('home', res)
    }
  })
});

app.get('/artists/new', (request, response) => {
  response.render('new');
});

app.post('/artists', (request, response) => {
  let queryText = "INSERT INTO artists(name,photo_url,nationality) VALUES($1,$2,$3)"
  let values = [request.body.artistName, request.body.photoURL, request.body.nationality]
  pool.query(queryText, values, (err, res)=>{
    if(err){
        console.log(err)
        response.send("Error occurred. Data not added.")
    } else {
        response.send("Artist created successfully! <a href='/artists/'>Back to homepage.</a>")
    }
  })

});

app.get('/artists/:id', (request, response) => {
  let artistId = [request.params.id]
  let queryText = "SELECT * FROM artists WHERE id=$1"
  pool.query(queryText, artistId, (err, res)=>{
    if(err){
        console.log(err)
        response.send("Error occurred.")
    } else {
        response.render('indivArtist', res)
    }
  })
});

app.get('/artists/:id/edit', (request, response) => {
  let artistId = [request.params.id]
  let queryText = "SELECT * FROM artists WHERE id=$1"
  pool.query(queryText, artistId, (err, res)=>{
    if(err){
        console.log(err.message)
        response.send("Error occurred")
    } else {
        response.render('edit', res)
    }
  })
});

app.put('/artists/:id', (request, response) => {
  let values = [request.body.artistName, request.body.photoURL, request.body.nationality, request.params.id]
  let queryText = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4"
  pool.query(queryText, values, (err, res)=>{
    if(err){
        console.log(err.message)
        response.send("Error occurred, artist not updated.")
    } else {
        response.send("Artist successfully updated. <a href='/artists/'>Back to homepage.</a>")
    }
  })

});

app.delete('/artists/:id', (request, response) => {
  let queryText="DELETE from artists WHERE id=$1"
  let artistId = [request.params.id]
  pool.query(queryText, artistId, (err, res)=>{
    if(err){
        console.log(err.message)
        response.send("Error occurred")
    } else {
        let queryText2 = "DELETE from songs WHERE artist_id=$1"
        pool.query(queryText2, artistId, (err, res)=>{
            response.send("Artist successfully deleted.<a href='/artists/'>Back to homepage.</a>" )
        })
    }
  })
});

app.get('/artists/:id/songs', (request, response)=>{
    let queryText = "SELECT * FROM songs INNER JOIN (SELECT id AS artist_ids, name AS artist_name FROM artists) AS artistB ON songs.artist_id=artistB.artist_ids WHERE artist_id=$1"
    let artistId = [request.params.id]
    pool.query(queryText, artistId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred")
        } else {
            if(res.rows.length==0){
                let artistnewSongURL = "/artists/" + request.params.id + "/songs/new"
                response.send(`No songs for this artist yet!  <a href=${artistnewSongURL}>Add a new song for this artist.</a>`)
            } else {
                response.render('artistSongs', res)
            }

        }
    })

})

app.get('/artists/:id/songs/new', (request, response)=>{
    let queryText = "SELECT * FROM artists WHERE id=$1"
    let artistId = [request.params.id]
    pool.query(queryText, artistId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("error occurred.")
        } else {
            response.render('newArtistSong', res)
        }
    })
})

app.get('/songs/', (request, response) => {
  let queryText = "SELECT * FROM songs"
  pool.query(queryText, (err, res)=>{
    if(err){
        console.log(err.message)
        response.send("error occured")
    } else {
        response.render('homeSongs', res)
    }
  })
});

app.get('/songs/new', (request, response) => {
    let queryText = "SELECT * FROM artists"
    pool.query(queryText, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred.")
        } else {
            response.render('newSongs', res);
        }
    })

});

app.post('/songs', (request, response) => {
  let queryText = "INSERT INTO songs(title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5)"
  let x = request.body
  let values = [x.songTitle, x.album, x.previewLink, x.artwork, x.artistID]
  pool.query(queryText, values, (err, res)=>{
    if(err){
        console.log(err)
        response.send("Error occurred. Data not added.")
    } else {
        response.send("Song created successfully! <a href='/artists/'>Back to homepage.</a>")
    }
  })

});

app.get('/songs/:id', (request, response) => {
  let songId = [request.params.id]
  let queryText = "SELECT * FROM songs INNER JOIN (SELECT id AS artist_ids, name AS artist_name FROM artists) AS artist on songs.artist_id=artist.artist_ids WHERE songs.id=$1"
  pool.query(queryText, songId, (err, res)=>{
    if(err){
        console.log(err)
        response.send("Error occurred.")
    } else {
        response.render('indivSong', res)
    }
  })
});

app.get('/songs/:id/edit', (request, response) => {
  let artistId = [request.params.id]
  let queryText = "SELECT * FROM songs WHERE songs.id=$1"
  pool.query(queryText, artistId, (err, res)=>{
    if(err){
        console.log(err.message)
        response.send("Error occurred")
    } else {
        let queryText2 = "SELECT * FROM artists"
        pool.query(queryText2, (err2, res2)=>{
            if(err2){
                console.log(err.message)
                response.send("Error occurred.")
            } else {
                res.artists = res2.rows
                response.render('editSongs', res);
            }
        })
    }
  })
});

app.put('/songs/:id', (request, response) => {
  let queryText = "UPDATE songs SET title=$1,album=$2,preview_link=$3,artwork=$4,artist_id=$5 WHERE id=$6"
  let x = request.body
  let values = [x.songTitle, x.album, x.previewLink, x.artwork, x.artistID, request.params.id]
  pool.query(queryText, values, (err, res)=>{
    if(err){
        console.log(err)
        response.send("Error occurred. Data not updated.")
    } else {
        response.send("Song edited successfully! <a href='/songs/'>Back to homepage.</a>")
    }
  })

});

app.delete('/songs/:id', (request, response) => {
  let queryText="DELETE from songs WHERE id=$1"
  let artistId = [request.params.id]
  pool.query(queryText, artistId, (err, res)=>{
    if(err){
        console.log(err.message)
        response.send("Error occurred")
    } else {
        response.send("Song successfully deleted.<a href='/songs/'>Back to homepage.</a>" )
    }
  })
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