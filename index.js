const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'admin',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};
var sha256 = require('js-sha256');
const SALT = "Tunr assignment zomg";
let artistId = null;
let artistMatchingId = null;

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

const cookieParser = require('cookie-parser')
app.use(cookieParser());

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.static(__dirname + '/public'));
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

//Request for home page
app.get('/', (request, response) => {
    response.redirect('/artist');
});

//Request for all artists page
app.get('/artist', (request, response) => {
    let text = `select * from artists ORDER BY id ASC`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            const data = {
                artists: result.rows
            };

            response.render('home', data);
        }
    })
});

//Request to display single artist
app.get('/artist/:id', (request, response) =>{
    artistId = parseInt(request.params.id);
    let text = `select * from artists where id = '${artistId}'`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            artistMatchingId = result.rows.find(artists => parseInt(artists.id) === artistId);

            response.render('singleArtist', artistMatchingId);
        }
    });
});

//Request to create new artist
app.get('/new', (request, response) => {
    response.render('newArtist');
});

//Post to accept new artist
app.post('/new', (request, response) => {
    let text = `INSERT into artists (name, photo_url, nationality) VALUES ($1, $2, $3)`;
    let values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(text, values, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            const data = {
                added : request.body
            }
            response.render("addedPage", data);
        }
    });
});

//Request edit page
app.get ('/artist/:id/edit', (request, response) => {
    artistId = parseInt(request.params.id);

    let text = `select * from artists where id = '${artistId}'`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            artistMatchingId = result.rows.find(artists => parseInt(artists.id) === artistId);

            response.render('editPage', artistMatchingId);
        }
    });
});

//Put to accept edit
app.put('/artist/:id', (request, response) => {
    let editedArtist = request.body;

    let text = `UPDATE artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = '${artistId}'`;
    let values = [request.body.name, request.body.photo_url, request.body.nationality];


    pool.query(text, values, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            let index = result.rows.findIndex(artists => parseInt(artists.id) === artistId);
            result.rows[index] = editedArtist;

            const data = {
                updated : request.body
            }
            response.render("updatedPage", data);
        }
    });
});


//Request to delete artist
app.get('/artist/:id/delete', (request, response) =>{
    artistId = parseInt(request.params.id);

    let text = `select * from artists where id = '${artistId}'`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            artistMatchingId = result.rows.find(artists => parseInt(artists.id) === artistId);

            response.render('deletePage', artistMatchingId);
        }
    });
});

//Delete artist
app.delete('/artist/:id/', (request, response) =>{

    let text = `DELETE FROM artists WHERE id = '${artistId}'`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            let index = result.rows.findIndex(artists => parseInt(artists.id) === artistId);
            result.rows.splice(index, 1);

            const data = {
                deleted : request.body
            }
            response.render("deletedPage", data);
        }
    });
});


//Request to display songs of single artist
app.get('/artist/:id/songs', (request, response)=>{
    artistId = parseInt(request.params.id);
    let text = `select * from songs where artist_id = '${artistId}'`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            let songList = result.rows;

            //Find artist's name
            let text = `select * from artists where id = '${artistId}'`;
            pool.query(text, (err,result)=>{
                if (err) {
                    console.log("query error", err.message);
                }
                else {
                    const data = {
                        songs: songList,
                        artist: result.rows[0]
                    };
                    response.render('singleArtistSongs', data);
                }
            })
        }
    });
});


//Request to create new song via artist page
app.get('/artist/:id/songs/new', (request, response) => {
    artistId = parseInt(request.params.id);
    let text = `select * from artists where id = '${artistId}'`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
        artistMatchingId = result.rows.find(artists => parseInt(artists.id) === artistId);

            response.render('newSong', artistMatchingId);
        }
    });
});

//Request to create new song globally
app.get('/songs/new', (request, response) => {
    let text = `select * from artists ORDER BY name ASC`;

    pool.query(text, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            const data = {
                artists: result.rows
            };

            response.render('newSongGlobally', data);
        }
    });
});


//Post to accept new song via artist page
app.post('/artist/:id/songs/new', (request, response) => {
    let text = `INSERT into songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)`;
    let values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.params.id];

    pool.query(text, values, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            const data = {
                added : request.body
            }
            response.redirect('/artist/'+request.params.id+'/songs');
        }
    });
});


//Post to accept new song globally
app.post('/songs/new', (request, response) => {
    let text = `INSERT into songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)`;
    let values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id];

    pool.query(text, values, (err, result) =>{
        if (err) {
            console.log("query error", err.message);
        }
        else{
            response.redirect('/artist/'+request.body.artist_id+'/songs');
        }
    });
});

//Request to register new user
app.get('/register',(request, response)=>{
  response.render('register');
})

//Post to register new user
app.post('/register', (request, response)=>{

    const queryString = `SELECT * from users where name = $1`;
    const value = [request.body.name]

    pool.query(queryString, value, (err, result) => {
        if (err) {
            console.log("query error", err.message);
        }
        else{

            if (result.rows.length>0){
                response.render('usernameTaken')

            } else {
                let hashedPassword = sha256( request.body.password + SALT );

                const queryString = "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";

                const values = [request.body.name, hashedPassword];

                pool.query(queryString, values, (err, result) => {

                    if (err) {
                        console.log("query error", err.message);

                    } else{

                        var user_id = result.rows[0].id;

                        let loggedInCookie = sha256( user_id + 'logged_id' + SALT );

                        response.cookie('user_name', request.body.name);
                        response.cookie('loggedIn', loggedInCookie);
                        response.cookie('user_id', user_id);

                        response.redirect('/artist');
                    }
              });
            }
        }
    });
});


//Request to login user
app.get('/login',(request, response)=>{
  response.render('login');
})


//Post to register new user
app.post('/login', (request, response)=>{

    const queryString = `SELECT * from users where name = $1`;
    const value = [request.body.name]

    pool.query(queryString, value, (err, result) => {

        if (err) {
            console.log("query error", err.message);

        } else{
            let hashedPassword = sha256( request.body.password + SALT );

            if(result.rows[0].password === hashedPassword){

                var user_id = result.rows[0].id;

                let loggedInCookie = sha256( user_id + 'logged_id' + SALT );

                response.cookie('user_name', request.body.name);
                response.cookie('loggedIn', loggedInCookie);
                response.cookie('user_id', user_id);

                response.redirect('/artist');


            } else {
                response.render('wrongPwd')
            }
        };
    });
});


//Request to add songs to favorites
app.get('/favorites/new',(request, response)=>{

    if( request.cookies.loggedIn === undefined || request.cookies.loggedIn === "nahh"){
        response.render('plsLogin');

    }else{

        let user_id = request.cookies.user_id;

        let loggedInCookie = sha256( user_id + 'logged_id' + SALT );

        if( loggedInCookie === request.cookies.loggedIn ){
            let text = `select * from songs order by title asc`;

            pool.query(text, (err, result) =>{
                if (err) {
                    console.log("query error", err.message);
                }
                else{
                    const data = {
                        songs: result.rows
                    };
                    response.render('AddToFavorites', data);
                }
            });
        }
    }
});

//Post to add songs to user's favorites
app.post('/favorites/new', (request, response) => {

    var choosenSongs = request.body.favorite_song;
    console.log(choosenSongs);

    if (typeof(choosenSongs) === "string"){
        let text = `INSERT into favorites (user_id, song_id) VALUES ($1, $2)`;
        let values = [request.cookies.user_id, choosenSongs];

        pool.query(text, values, (err, result) =>{
            if (err) {
                console.log("query error", err.message);
            }
            else{
                response.redirect('/favorites');
            }
        });
    }
    else if (choosenSongs.length>1){
        for (var i = 0; i<choosenSongs.length; i++){

            let text = `INSERT into favorites (user_id, song_id) VALUES ($1, $2)`;
            let values = [request.cookies.user_id, choosenSongs[i]];

            pool.query(text, values, (err, result) =>{
                if (err) {
                    console.log("query error", err.message);
                }
                else{
                    console.log(`Added ${result.rows[i]} to favorites`)
                }
            });
        } response.redirect('/favorites');
    }
});

//Request to display user's favorites
app.get('/favorites', (request, response) => {

    if( request.cookies.loggedIn === undefined || request.cookies.loggedIn === "nahh" ){
        response.render('plsLogin');

      }else{

        let user_id = request.cookies.user_id;

        let loggedInCookie = sha256( user_id + 'logged_id' + SALT );

        if( loggedInCookie === request.cookies.loggedIn ){

            let text = 'select favorites.song_id, songs.title from favorites inner join songs on (favorites.song_id = songs.id) where favorites.user_id = $1';
            let values = [request.cookies.user_id];


            pool.query(text, values, (err, result) =>{
                if (err) {
                    console.log("query error", err.message);
                }
                 else {
                    const data = {
                        favorites : result.rows
                    }

                    response.render('favorites', data);
                }
            });
        }
    }
});


//Request to logout
app.get('/logout',(request, response)=>{
  response.cookie('loggedIn', "nahh");
  response.redirect('/artist')
})


/**
 * ===================================
 * Listen to requests on port 8080
 * ===================================
 */
const server = app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);