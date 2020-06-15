console.log("starting up!!");
const cookieParser = require('cookie-parser');

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

var sha256 = require('js-sha256');

const SALT = "saltprotector";

// Initialise postgres client
const configs = {
  user: 'eunicelok',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

//starting up for index.js?
pool.on('error', function (error) {
  console.log('idle client error', error.message, error.stack);
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

app.use(cookieParser());


/**
 * ===================================
 * Routes
 * ===================================
 */

//21-1-2020
/**
.*. ===================================================================================
 * ┬┌┐┌┬┌┬┐┬┌─┐┬      ┬─┐┌─┐┬ ┬┌┬┐┌─┐
 * │││││ │ │├─┤│      ├┬┘│ ││ │ │ ├┤
 * ┴┘└┘┴ ┴ ┴┴ ┴┴─┘    ┴└─└─┘└─┘ ┴ └─┘
.*. ===================================================================================
*/

app.get('/', (request, response) => {
    response.render('home');
});

/**
 * ====================================================================================
 * ┌─┐┌─┐┌┬┐       ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┌─┐┌─┐┬─┐┌┬┐
 * │ ┬├┤  │   ───  │  ├┬┘├┤ ├─┤ │ ├┤   ├┤ │ │├┬┘│││
 * └─┘└─┘ ┴        └─┘┴└─└─┘┴ ┴ ┴ └─┘  └  └─┘┴└─┴ ┴
 * ====================================================================================
 */

//Display the form for a single artist
//Build a feature that creates a new artist in the database.
//path working
app.get('/artists/new', (request, response) => {
    response.render('new');
});

/**
 * =================================================================================
.*.┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐
.*.│  ├┬┘├┤ ├─┤ │ ├┤
.*.└─┘┴└─└─┘┴ ┴ ┴ └─┘
 * =================================================================================
 */

//Receives data from CREATE FORM and update into DB
//path working
app.post('/artists', (request, response) => {

    let insertQueryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';

    const values = [
    request.body.name,
    request.body.photo_url,
    request.body.nationality
    ];

    pool.query(insertQueryText, values, (error, result)=> {
        console.log("INSERT query callback");

        if( error ) {
            console.log("ERREEERRRRRR", error);
            response.send("errorr")
        } else {
            console.log("DONE", result.rows, 'You have added ' + request.body.name);
            const newlyAdded = {
            name: request.body.name,
            photo_url: request.body.photo_url,
            nationality: request.body.nationality
        };
            const data = {
            newArtist : newlyAdded
            };
      // response.send("we're done, you manage to add " + request.body.name);
            response.render('createdNew', data);
    }
  });
});


/**
 * ================================================================================
.*.┌─┐┬ ┬┌─┐┬ ┬  ┌─┐┌─┐┌─┐┌┬┐┬ ┬┬─┐┌─┐
.*.└─┐├─┤│ ││││  ├┤ ├┤ ├─┤ │ │ │├┬┘├┤
.*.└─┘┴ ┴└─┘└┴┘  └  └─┘┴ ┴ ┴ └─┘┴└─└─┘
 * ================================================================================
 */

//Build the show feature for an artist
//path working
app.get('/artists/:id',(request, response)=>{
    let query = "SELECT * FROM artists WHERE id=$1";
    let value = [parseInt(request.params.id)];
    pool.query (query, value, (error, result) => {
        if (error) {
            console.log("ERRRR", error);
            response.status(500).send("error")
        } else {
            console.log("RESULT")
            console.log( result.rows);
            let artist = result.rows;
            const data = {
            selectedArtist: artist[0]
            };
      // response.send(result.rows);
            response.render('show', data);
        }
    })
});



/**
 * ===================================================================================
.*. ┌┬┐┬┌─┐┌─┐┬  ┌─┐┬ ┬  ┌─┐┌─┐┌┐┌┌─┐┌─┐  ┌─┐┌─┐┬─┐  ┌┬┐┬ ┬┬┌─┐  ┌─┐┬─┐┌┬┐┬┌─┐┌┬┐
.*.  │││└─┐├─┘│  ├─┤└┬┘  └─┐│ │││││ ┬└─┐  ├┤ │ │├┬┘   │ ├─┤│└─┐  ├─┤├┬┘ │ │└─┐ │
.*. ─┴┘┴└─┘┴  ┴─┘┴ ┴ ┴   └─┘└─┘┘└┘└─┘└─┘  └  └─┘┴└─   ┴ ┴ ┴┴└─┘  ┴ ┴┴└─ ┴ ┴└─┘ ┴
 * ===================================================================================
 */

app.get('/artists/:id/songs',(request, response) => {
  // let query = "SELECT * FROM "+tableName;
    let query = "SELECT * FROM artists WHERE id=$1";
    let value = [parseInt(request.params.id)];
    pool.query(query, value, (error, result) => {
        if (error) {
            console.log("ERRRR", error);
            response.status(500).send("error")
        } else {
      // if result is not empty
                let artist_id = result.rows[0].id;
                let songsQuery = "SELECT * FROM songs WHERE artist_id="+artist_id;
                pool.query(songsQuery, (songsErr, songsResult) => {
                    console.log( "SONGSSSSS",songsResult);
                    console.log("RESULT")
                    let songs = '';
                    for ( let i = 0; i < songsResult.rows.length; i++) {
                        let songName = songsResult.rows[i].title;
                        console.log(songName + " hey this is songName!!!!!");
                        songs = songs + " , " +  songName;
                        console.log("hey is songs!!!!");
                    }
                    console.log(songsResult + " hey this is songsResultyeehaw");
                    console.log(result.rows[0].name + " hey this is result dot rows dot name yo"); //returns the selected artist
                    console.log(songs);
                    let songList = songsResult.rows;
                    const data = {
                        song: songList
                    }
                    response.render('displaySongsForArtist', data);
                });
        }
    })
});

/**
 * ===================================================================================
 * ┌─┐┌┬┐┬┌┬┐  ┌─┐┌─┐┬─┐┌┬┐
 * ├┤  │││ │   ├┤ │ │├┬┘│││
 * └─┘─┴┘┴ ┴   └  └─┘┴└─┴ ┴
 * ===================================================================================
 */

 /**
 * ===================================================================================
 * ┬ ┬┌─┐┌┬┐┌─┐┌┬┐┌─┐
 * │ │├─┘ ││├─┤ │ ├┤
 * └─┘┴  ─┴┘┴ ┴ ┴ └─┘
 * ===================================================================================
 */

 /**
 * ===================================================================================
 * ┌┬┐┌─┐┬  ┌─┐┌┬┐┌─┐  ┌─┐┌─┐┬─┐┌┬┐
 *  ││├┤ │  ├┤  │ ├┤   ├┤ │ │├┬┘│││
 * ─┴┘└─┘┴─┘└─┘ ┴ └─┘  └  └─┘┴└─┴ ┴
 * ===================================================================================
 */

/**
 * ===================================================================================
 * ┌┬┐┌─┐┬  ┌─┐┌┬┐┌─┐
 *  ││├┤ │  ├┤  │ ├┤
 * ─┴┘└─┘┴─┘└─┘ ┴ └─┘
 * ===================================================================================
 */


/**
 * ===================================================================================
.* ┌─┐┌─┐┬─┐┌┬┐  ┬┬
.* ├─┘├─┤├┬┘ │   ││
 * ┴  ┴ ┴┴└─ ┴   ┴┴
 * ===================================================================================
 */

//22-1-2020

//Create a form: /playlists/new
//GET /playlist/new - render the form to create a new playlist
app.get('/playlist/new', (request, response) => {
    response.render('newPlaylist');
});

//Create an app.post to take in the POST and create a record of a playlist
//POST /playlist - create a new playlist
app.post('/playlist', (request, response) => {

    let insertQueryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING id';

    const values = [
        request.body.name
    ];

    pool.query(insertQueryText, values, (error, result)=> {
        console.log("INSERT query callback");

        if( error ) {
            console.log("ERREEERRRRRR", error);
            response.send("errorr")
        } else {
            console.log("DONE", result.rows, 'You have added ' + request.body.name);
            const newlyAdded = {
            name: request.body.name,
            };
            const data = {
            newArtist : newlyAdded
            };
      // response.send("we're done, you manage to add " + request.body.name);
            response.render('createdNewPlaylist', data);
        }
    });
});

//Create a show route /playlists/:id => /playlists/1
//Build the show feature for playlist
app.get('/playlist/:id',(request, response)=>{
    let query = "SELECT * FROM playlist WHERE id=$1";
    let value = [parseInt(request.params.id)];
    pool.query(query,value, (error, result) => {
        if(error){
        console.log("ERRRR", error);
        response.status(500).send("error")
        } else {
        console.log("RESULT")
        console.log( result.rows + " hey this is result dot rows");
        let playlist = result.rows;
        const data = {
            selectedPlaylist: playlist[0]
        };
      response.render('showPlaylist', data);
    }
    })
});

//Create a form to add a song to a playlist /playlist/1/newsong
//GET /playlist/:id/newsong - render the form to add a song to the playlist
app.get('/playlist/:id/newsong', (request, response) => {
    let index = parseInt[request.params.id];
    let text = 'SELECT * FROM songs';
    pool.query(text, (error, result) => {
        console.log('this is adding new song to selected playlist de query');
        if (error) {
            console.log('ERREEERRRRRR', error);
            response.send("error")
        } else {
            console.log("RESULT")
            console.log(result.rows);
            let playlist = result.rows;
            const data = {
                id: index,
                selectedPlaylist: playlist
        };
            response.render('addSongToPlaylist', data);
        }
    })
});

//TODO: Create an app.post to take in the POST request and add a song to the selected playlist.
// app.post('/playlist/:id', (request, response) => {
//     //how to get the playlist_id? smth needs to be done before hand?
//     let insertQueryText = 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING id';
//     //the request.params.id de id is playlist de id
//     const values = [request.body.id,request.params.id];
//     //need to add
//     pool.query(insertQueryText, values, (error, result)=> {
//         console.log("INSERT query callback");
//         if( error ) {
//             console.log("ERREEERRRRRR", error);
//             response.send("errorr")
//         } else {
//             console.log("DONE", result.rows, 'You have added ' + request.body.title);
//             const newlyAdded = {
//             title: request.body.title,
//             };
//             const data = {
//             newArtist : newlyAdded
//             };
//             response.render('createdNewPlaylist', data);
//         }
//     });
// });


//GET /playlist/:id - show all the song titles inside this playlist

//POST /playlist/:id - for this playlist, put a single song on the playlist


/**
 * ===================================================================================
.* ┌─┐┌─┐┬─┐┌┬┐  ┬┬┬
.* ├─┘├─┤├┬┘ │   │││
 * ┴  ┴ ┴┴└─ ┴   ┴┴┴
 * ===================================================================================
 */

//23-1-2020

//CREATE A REGISTER PAGE
app.get('/register', (request, response) => {
    response.render('register');
});

//ENSURE DATA IS BEING ADDED INTO THE USER TABLE
app.post('/register', (request, response) => {
// check if the username is unique in the system
// if they are, insert the record
    let insertQueryText = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
    //hashing the password
    let hashedPw = sha256(request.body.password + SALT);
    const values = [request.body.name, hashedPw];

    pool.query(insertQueryText, values, (error,result) => {
        console.log("insert query callback")

        if (error) {
            console.log("Error", error);
            response.send("error");
        } else {
            console.log("Done", result.rows)
            // response.send("You have successfully created an account!");
            let user_id = result.rows[0].id;
            let hashedUser = sha256(user_id+SALT);
            response.cookie('username', request.body.name);
            response.cookie('loggedIn', hashedUser);
            response.cookie('userId', user_id);
            response.redirect('/');
        }
    })
});

//CREATE A USER'S LOGIN PAGE
app.get('/login', (request, response) => {
    response.render('login');
});


//TO VALIDATE A USER'S LOGIN INFO BEFORE ALLOWING THEM TO LOGIN
app.post('/login', (request, response) => {
    let query = 'SELECT * FROM users WHERE name=$1'
    let values = [request.body.name];
    console.log('My Query: ' + query)
    pool.query(query, values, (error, result) => {
        if (error) {
            console.log('Errr', error);
            response.status(500).send('error')
        } else {
            if (result.rows.length === 0) {
                response.send('Empty Result');
            } else {
                let hashedRequestPw = sha256(request.body.password + SALT);
                if (result.rows[0] === 0) {
                    response.send('Empty Result');
                } else {
                    // let hashedRequestPw = sha256(request.body.password + SALT);
                        if (result.rows[0].password === hashedRequestPw) {
                            let user_id = result.rows[0].id;
                            let hashedUser = sha256(user_id+SALT);
                            response.cookie('username', request.body.name);
                            response.cookie('loggedIn', hashedUser);
                            response.cookie('userId', user_id);
                            response.redirect('/');
                        } else {
                            response.send("Incorrect Password!")
                        }
                }
            }
        }
    })
});

//create a route that renders a form for the user to enter the song they want to favorite. This form can just be a normal input where the user enters the id of a song they want to favorite.
//GET /favorites/new
app.get('/favorites/new', (request, response) => {
    let insertQueryText = "SELECT * FROM songs";
    pool.query(insertQueryText, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (result.rows[0].length === 0 ) {
                response.send("currently no songs");
            }
            // console.log(result.rows);
            const data = {
                selectedPlaylist: result.rows
            }
            response.render('addSongToFav', data);
        }
    })
});




//use the user id cookie mentioned above and the request.body to create the record in the DB
app.post('/favorites', (request, response) => {
    let user_Id = request.cookies.userId;
    let hashedCookie = sha256(user_Id + SALT);
    console.log(request.body.song_id); //EMPTY OBJECT

    if (request.cookies.loggedIn === hashedCookie) {
        let insertQueryText = 'INSERT INTO favorites (song_id, user_id) VALUES ($1, $2) RETURNING *';
        let values = [request.body.song_id, request.cookies.userId];
        pool.query(insertQueryText, values, (error, result)=> {
            console.log("INSERT query callback");
            if (error) {
                console.log("Errorrr", error)
            } else {
                response.redirect('/favorites');
            }
        });
    } else {
        response.send("Not logged in");
    }
});

app.get('/favorites', (request, response) => {
    response.send("Song favorites");
});



// app.get('/logout', (request, response) => {
//   response.clearCookie("loggedIn");
//   response.clearCookie("userId");

//   response.send('we logged you out')
// });

// app.get('/favorites/new', (request, response) => {
//   // check to see if a user is logged in
//     let user_id = request.cookies.userId;
//     let hashedCookie = sha256(user_id+SALT);
//     if( request.cookies.loggedIn === hashedCookie) {
//     // SELECT about user based on id
//         let text = 'SELECT * FROM songs';
//         pool.query(text, (error, result) => {
//         console.log('this is adding new song to selected playlist de query');
//         if (error) {
//             console.log('ERREEERRRRRR', error);
//             response.send("error")
//         } else {
//             if(result.rows[0].length === 0) {
//                 response.send("currently no songs");
//             }
//             console.log("RESULT")
//             console.log(result.rows);
//             let playlist = result.rows;
//             const data = {
//                 selectedPlaylist: playlist
//             }
//             response.render('addSongToFav', data);
//         }
//     })
//     } else {
//         response.send('You are not logged in!');
//   }
// });




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