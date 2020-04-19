console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'ianfoo',
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

app.get('/', (req, res) => {
  res.render('new');
});

app.get('/artists', (req, res) => {

    res.render('home');
})

//###########################################################
//################### MANY TO MANY #############################
app.get('/playlists/new', (req, res) => {
    res.render('new-playlist');
})

app.post('/playlists/newsong', (req, res) => {

     const whenQueryDone = (queryError, result) => {
        if(queryError) {
        console.log("ERRORRRR, SHOW PLAYLIST");
        console.log(queryError);
        res.status(500);
        res.send("DATABASE ERROR");
    } else {
        console.log("Added song to playlist!");


        //Playlist id that will display all the songs for that particular playlist.
        let playlistId = result.rows[0].playlist_id;

        const queryString = "SELECT playlist_song.song_id, playlist.name, songs.title FROM songs INNER JOIN playlist_song ON(playlist_song.song_id = songs.id) INNER JOIN playlist ON(playlist_song.playlist_id = playlist.id) WHERE playlist_song.playlist_id =" + playlistId;

        pool.query(queryString, (queryError, songListing) => {
             if(queryError) {
                    console.log("QUERY ERROR where request for song listing");
                }

                const data = {
                    playlistName: songListing.rows[0].name,
                    songsByPlaylist: songListing.rows
                }
            res.render('playlist-songs', data);
        })


    }
}
    const queryString = "INSERT INTO playlist_song(song_id, playlist_id) VALUES($1, $2) RETURNING *";

    const insertValues = [req.body.song_id, req.body.playlist_id];

    pool.query(queryString, insertValues, whenQueryDone);


})

app.get('/playlists/:id', (req, res) => {

    const whenQueryDone = (queryError, result) => {
            if(queryError) {
                console.log("ERRORRRR, SHOW PLAYLIST");
                console.log(queryError);
                res.status(500);
                res.send("DATABASE ERROR");
            } else {
                console.log("DISPLAYED PLAYLIST!");

            var playlistId = req.params.id;
            //Make second query
            const songs = "SELECT * FROM songs";

            pool.query(songs, (queryError, allSongs) => {

                if(queryError) {
                    console.log("QUERY ERROR where request for all SONGS made");
                }

                console.log("SENDING PLAYLIST AND SONGS DATA");
                const data = {
                playlistIndex: playlistId,
                songs: allSongs.rows,
                playlistTitle: result.rows[0].name

            }
                res.render('new-song', data);
            });

        }
        }


            const showPlaylist = "SELECT * FROM playlist WHERE id="+ req.params.id;

    pool.query(showPlaylist, whenQueryDone);
})

//Add new playlist.
app.post('/playlists/new', (req, res) => {

    const whenQueryDone = (queryError, result) => {
        if(queryError) {
            console.log("ERRORRRR, COULDNT ADD PLAYLIST");
            console.log(queryError);
            res.status(500);
            res.send("DATABASE ERROR");
        } else {
            console.log("Playlist added!");
            res.send("New Playlist added! " + result.rows[0].id);
        }

    }
    const addPlaylist = "INSERT INTO playlist(name) VALUES($1) RETURNING *";
    const insertValues = [req.body.playlist];

    pool.query(addPlaylist, insertValues, whenQueryDone);

})







//###########################################################
//################### 1 TO MANY #############################

//###########################################################
//################# SHOWS ARTIST INFO BASED ON ID selected ###########################################
app.get("/artists/:id", (req, res) => {

    const whenQueryDone = (queryError, artistResult) => {
        if(queryError) {
            console.log("ERROR");
            console.log(queryError);
            res.status(500);
            res.send("DATABASE ERROR");
        } else {



            const queryJoinString = "SELECT songs.title FROM songs INNER JOIN artists ON(artists.id = songs.artist_id) WHERE artists.id ="+req.params.id;

            pool.query(queryJoinString, (songQueryError, songResult) => {

                if(songQueryError) {
                    console.log(songQueryError);
            }
                    const data = {
                    songs: songResult.rows,
                    artists: artistResult.rows
                }

                res.render('show', data);
            });
          }
        };
    //Allows for selected artist info to be displayed based on artist id
    let index = parseInt(req.params.id);
    const queryString = "SELECT * FROM artists WHERE id="+index+"";

    pool.query(queryString, whenQueryDone);
})
//########################################################
//########################################################
//############### Creates a new artist in the database #######################################################
app.post("/artists", (req, res) => {
    console.log(req.body);

    const whenQueryDone = (queryError, result) => {
        if(queryError) {
            console.log("ERROR");
            console.log(queryError);
            res.status(500);
            res.send("DATABASE ERROR");
        } else {
            console.log("NEW ARTISTS: " + result.rows[0].id);
            res.send("HEY NEW ARTIST IN THE HOUSE::: " + result.rows[0].id);

        }
    }
            const queryString = "INSERT INTO artists(name, photo_url, nationality) VALUES($1, $2, $3) RETURNING *";
            const insertValues = [req.body.name, req.body.photo_url, req.body.nationality];

            pool.query(queryString, insertValues, whenQueryDone);
})


//########################################################
//########################################################

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(4000, () => console.log('~~~ Tuning in to the waves of port 4000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);