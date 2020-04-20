console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');

// Initialise postgres client
const configs = {
  user: 'thomasoh',
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

app.use(cookieParser());


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

//Show Song Index

app.get('/', (req, res) => {
  //cookie stuff
  var visits = req.cookies['visits'];
  if( visits === undefined ){
      visits = 1;
    }else{
        visits = parseInt( visits ) + 1;
    }
  res.cookie('visits', visits);


  const queryString = "SELECT * FROM artists"
  pool.query(queryString, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            let artistsArray = result.rows;
            const data = {artistsArray, visits}
            res.render('home', data);
        }
  })
});

//Add New Artist
app.get('/new', (request, response) => {
  const data = {visits: request.cookies['visits']};
  response.render('new', data);
});

//Get list of songs
app.get('/artists/:id/songs', (req, res) => {
    //Getting artist data first
    const firstValues = [req.params.id]
    const firstQueryString = "SELECT * FROM artists WHERE id = $1"
    let artistInfo;

    pool.query(firstQueryString, firstValues, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            artistInfo = result.rows[0];
            const secondValues = [req.params.id]
            const secondQueryString = "SELECT title FROM songs WHERE artist_id = $1";

            pool.query(secondQueryString, secondValues, (err, result) => {
                if (err){
                    console.error('query error', err.stack);
                    res.status(500);
                    res.send('query error');
                } else {
                    const songArray = []
                    for (let i = 0; i < result.rows.length; i++){
                        songArray.push(result.rows[i].title)
                    }
                    const data = {songArray, artistInfo, visits: req.cookies['visits']}
                    res.render('artistWithSongs', data);
                }
            })
        }
    })
});

//Create new song for artist
app.get('/artists/:id/songs/new', (req, res) => {
    const values = [req.params.id]
    const queryString = "SELECT * FROM artists WHERE id = $1"

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            const data = {artistInfo : result.rows[0], visits: req.cookies['visits']};
            res.render('newartistsong', data);
        }
    })
});

//POST request for adding new song for particular artist
app.post('/artists/:id/songs', (req, res) =>{
    const values = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];
    const queryString = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)";

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            res.redirect('/artists/' + req.params.id + '/songs')
        }
    })
});

//Form for editing songs
app.get('/artists/:id/edit', (req, res) => {
    //Getting artist data first
    const values = [req.params.id]
    const queryString = "SELECT * FROM artists WHERE id = $1"
    let artistInfo;

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            artistInfo = result.rows[0];
            const secondValues = [req.params.id]
            const secondQueryString = "SELECT title FROM songs WHERE artist_id = $1";
            const data = {artistInfo, visits: req.cookies['visits']};
            res.render('edit', data)
        }
    })
});

//POST request for adding new artist
app.post('/artists', (req, res) => {
    const values = [req.body.name, req.body.photo_url, req.body.nationality];
    const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            res.redirect('/artists/' + result.rows[0].id)
        }
    })
});

//PUT request for updating songs
app.put('/artists/:id', (req, res) => {
    const values = [req.body.name, req.body.photo_url, req.body.nationality, req.params.id]
    const queryString = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4"

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            res.redirect('/artists/' + req.params.id)
        }
    })
});

//DELETE request for updating songs
app.delete('/artists/:id', (req, res) => {
    const values = [req.params.id];
    const queryString = "DELETE from artists WHERE id=$1"

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            res.redirect('/')
        }
    })
});

//Display artist
app.get('/artists/:id', (req, res) => {
    const values = [req.params.id]
    const queryString = "SELECT * FROM artists WHERE id = $1"

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            const data = {artistInfo : result.rows[0], visits: req.cookies['visits']};
            res.render('artist', data);
        }
    })
});

//Form for creating new playlist
app.get('/playlist/new', (req, res) => {
    const data = {visits: req.cookies['visits']}
    res.render('newplaylist', data)
})

//POST request for adding new playlist
app.post('/playlist', (req, res) => {
    const values = [req.body.name];
    const queryString = "INSERT INTO playlist (name) VALUES ($1) RETURNING *";

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            res.redirect('/playlist/' + result.rows[0].id)
            //res.redirect('/artists/' + result.rows[0].id)
        }
    })
})

//Display user's playlist
app.get('/playlist/user', (req, res) => {
    const data = {songArray: JSON.parse(req.cookies['userPlaylist'])}
    res.render('userplaylist', data)
})

//Display playlist
app.get('/playlist/:id', (req, res) => {
    const values = [req.params.id]
    const queryString = "SELECT * FROM playlist WHERE id = $1"

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            const playlistInfo = result.rows[0];

            const secondQueryString = "SELECT songs.title, artists.name, songs.album FROM ((songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) INNER JOIN artists ON (songs.artist_id = artists.id))) WHERE playlist_song.playlist_id = $1"
            pool.query(secondQueryString, values, (err, result2) => {
                const songInfo = result2.rows;
                const data = {playlistInfo, songInfo, visits: req.cookies['visits']}
                res.render('playlist', data);
            })
        }
    })
})

//Form to add a song to the playlist
app.get('/playlist/:id/newsong', (req, res) => {
    const values = [req.params.id]
    const queryString = "SELECT * FROM playlist WHERE id = $1"

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            const secondQueryString = "SELECT songs.id AS songid, songs.title AS songtitle, songs.album AS albumname, artists.name AS artistname FROM songs INNER JOIN artists ON (songs.artist_id = artists.id)"
            pool.query(secondQueryString, (err, result2) => {
                if (err){
                    console.error('query error', err.stack);
                    res.status(500);
                    res.send('query error')
                } else {
                    const songInfoArray = result2.rows;
                    const playlistInfo = result.rows[0];
                    const data = {songInfoArray, playlistInfo, visits: req.cookies['visits']}
                    res.render('newsongforplaylist', data);
                }
            })


        }
    })
})

//POST request for adding a song to a playlist
app.post('/playlist/:id', (req, res) => {
    var body = req.body.songid.split(',')

    let userPlaylist = req.cookies['userPlaylist'];
    console.log(userPlaylist)
    if( userPlaylist === undefined ){
        userPlaylist = []
    } else {
        userPlaylist = JSON.parse(userPlaylist)
    }
    userPlaylist.push(body[1])
    res.cookie('userPlaylist', JSON.stringify(userPlaylist));

    const values = [body[0], req.params.id]
    const queryString = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2)"

    pool.query(queryString, values, (err, result) => {
        if (err){
            console.error('query error', err.stack);
            res.status(500);
            res.send('query error');
        } else {
            res.redirect('/playlist/' + req.params.id)
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