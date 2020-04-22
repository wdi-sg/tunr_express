console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');


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

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));
app.use(express.static('public'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Log in and registration
 * ===================================
 */

app.get('/home', (req, res) => {
    res.render('home');
})
app.get('login-page', (req, res) => {
    res.render('login-page');
})

app.get('/register', (req, res) => {
    if(req.cookie && req.cookies.loggedIn) {
        const loggedIn = req.cookies.loggedIn;
        res.render('/login', {'loggedIn' : loggedIn});
    }
        res.cookie('loggedIn', 'false');
        res.render('register', {'loggedIn' : 'false'});
})

app.get('/login', (req, res) => {
    if(req.cookie && req.cookies.loggedIn) {
        const loggedIn = req.cookies.loggedIn;
        res.render('/login', {'loggedIn' : loggedIn});
    }
        res.cookie('loggedIn', 'false');
        res.render('login', {'loggedIn' : 'false'});
})

//STORES USER'S DETAILS IF SUCCESS. Redirect to login page for user to login.
app.post('/register', (req, res) => {

    const registerQuery = "INSERT INTO users(name, password) VALUES($1, $2) RETURNING *";

    const hashedPassword = sha256(req.body.password);
    const values = [req.body.name, hashedPassword];

    pool.query(registerQuery, values, (queryError, result) => {
        if(queryError) {
            console.log("Query ERROR AT REGISTRATION");
            console.log(queryError);
        }

        console.log("REGISTRATION SUCCESS!");
        res.render('login-page');
    })
})

app.post('/login', (req, res) => {

    const name = req.body.name;
    const password = sha256(req.body.password);

    const queryString = "SELECT * FROM users WHERE name=$1";

    const values = [name, password];

    pool.query(queryString, [name], (queryError, result) => {
        if(queryError) {
            console.log("ERRRROR LOGGING IN");
            console.log(queryError);
        }

        console.log(result.rows[0])

        if(result.rows[0]) {
            let hash = result.rows[0].password;

            if(hash === password) {
                res.cookie('loggedIn', 'true');
                res.redirect(302, 'home');
            }
        } else {
            res.send("Wrong password");
        }
    })


})







/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, res) => {
  res.render('login-page');
});

app.get('/favorites', (req, res) => {
    res.render('favorites');
})

app.post('/favorites', (req, res) => {

    const song_id = parseInt(req.body.songId);

    const queryString = "INSERT INTO favorites(song_id) VALUES($1) RETURNING *";

    const values = [song_id];

    pool.query(queryString, values, (queryError, result) => {
        if(queryError) {
            console.log("ERRRRRRROROROROROROR");
            console.log(queryError);
        }
        console.log("FAVORITED A SONG!");

        const favoritesString = "SELECT songs.title FROM songs INNER JOIN favorites ON (favorites.song_id = songs.id) WHERE favorites.song_id=" + song_id;

        pool.query(favoritesString, (queryError, favoritesSongs) => {

            if(queryError) {
            console.log("ERRRRRRROROROROROROR");
            console.log(queryError);
            }
            const data = {
                songs: favoritesSongs
            }
            res.render('favorites');
        })
    })

})

app.get('/artists', (req, res) => {
// get the currently set cookie
  var visits = req.cookies['visits'];

  // see if there is a cookie
  if(visits === undefined) {
    //set default value if it doesn't exist
    visits = 1;
  } else {
    //if a cookie exists, make a value thats 1 bigger
    visits = parseInt(visits) + 1;

      //set the cookie
      res.cookie('visits', visits);

    const data = {
        cookieCount: visits
    }
    res.render('home', data);
  }
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

app.get("/playlist-index", (req, res) => {

    const whenQueryDone = (queryError, playlistResult) => {
        if (queryError) {
            console.log('ERROOOOR');
            console.log(queryError);
            res.status(500);
            res.send("DB ERROR");
        } else {
          console.log("OVER HEREEEEEE");
          console.log(playlistResult.rows[0]);

            // get the currently set cookie
          var visits = req.cookies['visits'];
          // see if there is a cookie
          if(visits === undefined) {
            //set default value if it doesn't exist
            visits = 1;
            } else {
            //if a cookie exists, make a value thats 1 bigger
            visits = parseInt(visits) + 1;
              //set the cookie
              res.cookie('visits', visits);
            }
            const data = {
                playlists: playlistResult.rows,
                cookieCount: visits
            }
                res.render('playlist-index', data);
        }

        }





    const queryString = "SELECT * FROM playlist";
    pool.query(queryString, whenQueryDone);
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

            var playlistId = parseInt(req.params.id);
            //Make second query
            const songs = "SELECT * FROM songs";

            pool.query(songs, (queryError, allSongs) => {
                if(queryError) {
                    console.log("QUERY ERROR where request for all SONGS made");
                } else {
                      console.log("SENDING PLAYLIST AND SONGS DATA");
                 // get the currently set cookie
                  var visits = req.cookies['visits'];
                  // see if there is a cookie
                  if(visits === undefined) {
                    //set default value if it doesn't exist
                    visits = 1;
                    } else {
                    //if a cookie exists, make a value thats 1 bigger
                  visits = parseInt(visits) + 1;
                    //set the cookie
                    res.cookie('visits', visits);
            }
                const data = {
                playlistIndex: playlistId,
                songs: allSongs.rows,
                playlistTitle: result.rows[0].name,
                cookieCount: visits
            }
                res.render('new-song', data);
                }


        })
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
            const queryJoinString = "SELECT songs.title, songs.artist_id, songs.id FROM songs INNER JOIN artists ON(artists.id = songs.artist_id) WHERE artists.id ="+req.params.id;
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

app.get('/display-artists', (req, res) => {
    const whenQueryDone = (queryError, artistResult) => {
        if(queryError) {
            console.log("ERROR: COULD NOT ADD SONG TO ARTIST!");
            console.log(queryError);
            res.status(500);
            res.send("ALL ARTISTS " + artistResult);
        } else {
           const data = {
            artists: artistResult.rows
           }
           res.render('display-artists', data);
        }
    }
    const queryString = "SELECT * FROM artists";

    pool.query(queryString, whenQueryDone);
})

app.get('/new', (req,res) => {
    res.render('new');
})

app.post("/artist/new", (req, res) => {

 const whenQueryDone = (queryError, artistResult) => {
        if(queryError) {
            console.log("ERROR: COULD NOT ADD SONG TO ARTIST!");
            console.log(queryError);
            res.status(500);
            res.send("NEW ARTIST IN THE HOUSE: " + artistResult);
        } else {
            console.log("SONG ADDED" + artistResult);
            res.redirect("/artists/" + parseInt(req.body.songId));
        }
    }

    const queryString = "INSERT INTO songs(title, album, artist_id) VALUES($1, $2, $3) RETURNING *";
    const insertValues = [req.body.title, req.body.album, req.body.songId];
    pool.query(queryString, insertValues, whenQueryDone);

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