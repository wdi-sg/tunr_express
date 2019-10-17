console.log("starting up!!");

//==========================================
//              Config
//==========================================
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

// Initialise postgres client
const configs = {
  user: 'ryan',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname+'/public/'));

app.use(methodOverride('_method'));

app.use(cookieParser());

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
//==========================================
//==========================================



//==========================================
//          Code starts here
//==========================================

const showAll = (request, response)=>{

    let queryText = "SELECT * FROM artists ORDER by id";

    pool.query(queryText, (err, results)=>{
        let data = {
            artists : results.rows
        };
        response.render('home', data);
    });

};

const showCreateForm = (request, response)=>{
    response.render('new');
};

const showNew = (request, response)=>{

    let name = request.body.name;
    let photo = request.body.photo_url;
    let nationality = request.body.nationality;
    let inputValues = [name, photo, nationality];
    let queryText = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(queryText, inputValues, (err, results)=>{
        response.redirect('/artists/');
    });

};

const showOne = (request, response)=>{

    let id = parseInt(request.params.id);
    let inputValues = [id];
    let queryText = "SELECT * FROM artists WHERE id = ($1)";

    pool.query(queryText, inputValues, (err, results)=>{
        if (results.rows[0] === undefined){
            response.render("noArtist");
        } else {
            response.render("showOne", results.rows[0]);
        };

    });

};

const showEditForm = (request, response)=>{

    let id = parseInt(request.params.id);
    let inputValues = [id];
    let queryText = "SELECT * FROM artists WHERE id = ($1)";

    pool.query(queryText, inputValues, (err,results)=>{
        response.render("showEditForm", results.rows[0]);
    });

};

const showUpdated = (request, response)=>{

    let name = request.body.name;
    let photo = request.body.photo_url;
    let nationality = request.body.nationality;
    let id = parseInt(request.params.id);
    let inputValues = [name, photo, nationality, id];
    let queryText = "UPDATE artists SET name=($1), photo_url=($2), nationality=($3) WHERE id=($4) RETURNING *";

    pool.query(queryText, inputValues, (err, results)=>{
        response.redirect('/artists/'+ id)
    });


};


const deleteArtist = (request, response)=>{

    let id = parseInt(request.params.id);
    let inputValues = [id];
    let queryText = "DELETE from artists WHERE id = ($1) RETURNING *";

    pool.query(queryText, inputValues, (err,results)=>{
        response.redirect('/artists/')
    })

}


const showArtistSongs = (request, response)=>{

    let id = parseInt(request.params.id);
    let inputValues = [id];
    let queryText = "SELECT * FROM songs WHERE artist_id = ($1)";

    pool.query(queryText, inputValues, (err, results)=>{
        let data = {
            songs: results.rows
        }
        if (results.rows[0] === undefined){
            response.render("noSongs");
        } else {
            response.render("showSongs", data);
        };

    });

};


const showAllSongs = (request, response)=>{

    let queryText = "SELECT title, album, preview_link FROM songs";

    pool.query(queryText, (err, results)=>{
        let data = {
            songs: results.rows
        }
        response.render("showAllSongs", data)
    });

};
//==========================================
//==========================================




//==========================================
//       Code starts here part 2
//==========================================

const showAllPlaylist = (request, response)=>{

    let queryText = "SELECT * FROM playlist ORDER BY id";

    pool.query(queryText, (err, results)=>{
        let data = {
            playlist : results.rows
        };
        response.render('allPlaylist', data);
    });


}

const createPlaylist = (request, response)=>{

    response.render('createPlaylist');

}

const showNewPlaylist = (request, response)=>{

    let name = request.body.name;
    let inputValues = [name];
    let queryText = "INSERT INTO playlist (name) VALUES ($1) RETURNING *";

    pool.query(queryText, inputValues, (err, results)=>{
        response.redirect('/playlist/');
    });

}

const showOnePlaylist = (request, response)=>{

    let playlistID = parseInt(request.params.id);
    let inputValues = [playlistID];
    let queryText = "SELECT songs.title, songs.album, songs.preview_link, songs.artwork, playlist.name, playlist_song.id FROM songs INNER JOIN playlist_song on (playlist_song.song_id = songs.id) INNER JOIN playlist on (playlist_song.playlist_id = playlist.id) WHERE playlist_song.playlist_id = ($1) ORDER BY playlist_song.id ";

    pool.query(queryText, inputValues, (err, results)=>{
        let data = {
            playlistNum : playlistID,
            titleName : results.rows
        }
        if (results.rows[0] === undefined){
            response.render("emptyPlaylist", data);
        } else {
            response.render("showOnePlaylist", data);
        }

    })

}


const addSongToPlaylist = (request, response)=>{

    let playlistID = parseInt(request.params.id);
    let queryText = "SELECT * FROM songs";

    pool.query(queryText, (err, results)=>{
        let data = {
            playID : playlistID,
            songs : results.rows
        };

        response.render("addSongToPlaylist", data);

    })

}

const showNewSongInPlaylist = (request, response)=>{

    let playlistID = parseInt(request.params.id);
    let songid = parseInt(request.body.song_id);
    let inputValues = [songid, playlistID];
    let queryText = 'INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *';

    pool.query(queryText, inputValues, (err, results)=>{
        response.redirect('/playlist/'+playlistID);
    })
}
//==========================================
//==========================================




//==========================================
//       Code starts here part 3
//==========================================


const SALT = "xiangjiao"


const register = (request, response)=>{

    response.render("register");

};



const redirectToLogin = (request, response)=>{

    let hashedPassword = sha256(request.body.password + SALT);
    let inputValues = [request.body.name, hashedPassword];

    let queryText = "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";

    pool.query(queryText, inputValues, (err, results)=>{
        console.log("The results are "+results.rows);

        response.redirect("/login");

    })

};



const login = (request, response)=>{

    response.render("login");

};


const redirectToHome = (request, response)=>{

    let requestUsername = request.body.name;
    let requestPassword = request.body.password;

    let queryText = "SELECT * FROM users WHERE name = '" +requestUsername+"'";

    pool.query(queryText, (err, results)=>{
        console.log(results.rows)
        if (results.rows.length > 0){
            let hashedRequestPassword = sha256(requestPassword + SALT);

            if(hashedRequestPassword === results.rows[0].password){
                let user_id = results.rows[0].id;
                let username = results.rows[0].name;
                let hashedCookie = sha256(SALT + user_id);

                response.cookie('user_id', user_id);
                response.cookie("username", username);
                response.cookie("hasLoggedIn", hashedCookie);

                response.redirect("/favorites");
            } else {
                response.status(403).render("errorLogin");
            };

        } else {
            response.status(403).render("errorLogin");
        }

    });


};

// app.get('/special', (request, response)=>{


//   let user_id = request.cookies['user_id'];
//   let hashedValue = sha256( SALT + user_id );

//   // if there is a cookie that says hasLoggedIn yes, let them access this page
//   if( request.cookies['hasLoggedIn'] === hashedValue ){
//     response.send('you can do stuff');

//   }else{

//     //otherwise, show them a message
//     response.send('go awayyyy');
//     // response.redirect('/login');

//   }



// });


const favorites = (request, response)=>{

    let user_id = request.cookies['user_id'];
    let username = request.cookies['username'];
    let hashedValue = sha256( SALT + user_id );

    // if there is a cookie that says hasLoggedIn yes, let them access this page
    if( request.cookies['hasLoggedIn'] === hashedValue ){

        let inputValues = [user_id];

        let queryText = "SELECT album, preview_link, title, song_id, name FROM favorites INNER JOIN users on (favorites.user_id = users.id) INNER JOIN songs on (favorites.song_id = songs.id) WHERE favorites.user_id = ($1) ORDER BY songs.id ";

        pool.query(queryText, inputValues, (err, results)=>{

            let data = {
                favoriteSongs: results.rows
            };

            response.render("favorites", data);

        });

    }else{

        response.redirect('/login');

    };


};

const favoritesNew = (request, response)=>{

    let user_id = request.cookies['user_id'];
    let username = request.cookies['username'];
    let hashedValue = sha256( SALT + user_id );

    // if there is a cookie that says hasLoggedIn yes, let them access this page
    if( request.cookies['hasLoggedIn'] === hashedValue ){


        let queryText = "SELECT * FROM songs";

        pool.query(queryText, (err, results)=>{

            let data = {
                username: username,
                songs: results.rows
            }

            response.render("favoritesNew", data);

        });

    }else{

        response.redirect('/login');

    };


};


const songsFavorited = (request, response)=>{

    let user_id = request.cookies['user_id'];
    let username = request.cookies['username'];
    let hashedValue = sha256( SALT + user_id );

    // if there is a cookie that says hasLoggedIn yes, let them access this page
    if( request.cookies['hasLoggedIn'] === hashedValue ){


        let songid = parseInt(request.body.song_id);
        console.log("songid = "+songid);
        console.log("user_id = "+user_id);
        let inputValues = [songid, user_id];
        let queryText = 'INSERT INTO favorites (song_id, user_id) VALUES ($1, $2) RETURNING *';

        pool.query(queryText, inputValues, (err, results)=>{

            response.redirect('/favorites');

        });

    }else{

        response.redirect('/login');

    };


};



//==========================================
//==========================================





//==========================================
//          Restful Routes 3
app.get('/register', register);
app.post('/register', redirectToLogin);
app.get('/login', login);
app.post('/login', redirectToHome);

app.get('/favorites/new', favoritesNew);
app.get('/favorites', favorites);
app.post('/favorites', songsFavorited);
//==========================================
//==========================================



//==========================================
//          Restful Routes
//==========================================
app.get('/artists/', showAll);
app.get('/artists/new', showCreateForm);
app.get('/artists/songs', showAllSongs);
app.post('/artists', showNew);
app.get('/artists/:id', showOne);
app.get('/artists/:id/songs', showArtistSongs);
app.get('/artists/:id/edit', showEditForm);
app.put('/artists/:id', showUpdated);
app.delete('/artists/:id', deleteArtist);
//==========================================
//          Restful Routes Part 2
//==========================================
app.get('/playlist/', showAllPlaylist);
app.get('/playlist/new', createPlaylist);
app.post('/playlist', showNewPlaylist);
app.get('/playlist/:id/newsong', addSongToPlaylist);
app.get('/playlist/:id', showOnePlaylist);
app.post('/playlist/:id', showNewSongInPlaylist)
// app.delete('/playlist/:id', deletePlaylist);







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