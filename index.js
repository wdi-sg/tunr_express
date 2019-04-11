console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');

const app = express();


// Initialise postgres client
const configs = {
  user: 'shwj',
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



app.use(express.static(__dirname+'/public/'));

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


  /**
 * ===================================
 * REGISTER AND LOGIN STUFF
 * ===================================
 */

app.get('/register', (req,res)=>{

    res.render('loginRegister/register')
})
app.post('/register', (req,res)=>{
    const data = req.body;
    const hashPass = sha256(data.password);
    const queryAddUsers = `INSERT INTO users(username, password) VALUES ('${data.username}', '${hashPass}') RETURNING *`;

    pool.query(queryAddUsers, (errObj, result)=>{
            if(errObj!=undefined){
                console.error('query error:', errObj.stack);
                res.send( 'query error' );
            } else {

                let cookieUser = result.rows[0].username;
                let cookieHashed = result.rows[0].password;
                let cookieId = result.rows[0].id;

                res.cookie('username', cookieUser);
                res.cookie('loggedIn', cookieHashed);
                res.cookie('userId', cookieId);

                const queryString = `SELECT * FROM artists`;
                pool.query(queryString,(errObj, result)=>{
                if(errObj === undefined){

                    const data = result.rows;

                    res.render('home', {data});
                } else {
                    console.error('query error:', errObj.stack);
                    res.send( 'query error' );
                }
            })
        }
    })
})

app.get('/login',(req,res)=>{

    res.render('loginRegister/login')
})
app.post('/login',(req,res)=>{

    const data = req.body;
    const hashPass = sha256(data.password);
    console.log(data);
    const queryExistingUser = `SELECT password,id FROM users where username='${data.username}'`;

    pool.query(queryExistingUser, (errObj, result)=>{
        if(errObj!=undefined){
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        } else {


            console.log(result.rows[0]);
            if(result.rows[0].password == hashPass){
                const queryString = `SELECT * FROM artists`;
                pool.query(queryString,(errObj, result)=>{
                     if(errObj === undefined){

                    const data = result.rows;

                    let cookieUser = result.rows[0].username;
                    // let cookieHashed = result.rows[0].password;
                    let cookieHashed = 'Verified';
                    let cookieId = result.rows[0].id;

                    res.cookie('username', cookieUser);
                    res.cookie('loggedIn', cookieHashed);
                    res.cookie('userId', cookieId);

                    res.render('home', {data});
                    } else {
                    console.error('query error:', errObj.stack);
                    res.send( 'query error' );
                    }
                })
            } else {
                res.send('Entered Wrong Password');
            }
        }
    })
})



 /**
 * ===================================
 * ARTIST PATHS
 * ===================================
 */

//VIEW ALL ARTIST (INDEX PAGE)
app.get('/', (req, res) => {
  // query database for all pokemon
  const queryString = `SELECT * FROM artists`;
    pool.query(queryString,(errObj, result)=>{
        if(errObj === undefined){

            const data = result.rows;

            res.render('home', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
});

///VIEW INDIVIDUAL ARTIST PAGE (NOT DONE)
app.get('/artist/:id', (req,res)=>{

    res.send('VIEWING ARTIST ONLY');
})


//ADD ARTIST FORM & REQUEST
app.get('/new', (req, res) => {

    res.render('new');
});
app.post('/new/artistadded', (req,res)=>{
    let data = req.body;
    let artistName = req.body.name;
    let artistPhotoUrl = req.body.photo_url;
    let artistNationality = req.body.nationality;
    console.log('req.body');
    console.log(data);

    const queryString = `INSERT INTO artists
                        (name, photo_url, nationality)
                        VALUES
                        ('${artistName}','${artistPhotoUrl}','${artistNationality}')
                        RETURNING *`;

    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){

            const data = result.rows;

            res.render('addeditsuccess', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})


//EDIT ARTIST FORM & REQUEST
app.get('/artist/:id/edit', (req,res)=>{
    artistId = parseInt(req.params.id);

    const queryString = `SELECT * FROM artists WHERE id= ${artistId}`;
    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){
            const data = result.rows;
            res.render('editartist', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})
app.put('/artist/:id/', (req,res)=>{

    let id = req.params.id;
    let data = req.body;
    let artistName = data.name;
    let artistPhotoUrl = data.photo_url;
    let artistNationality = data.nationality;

    const queryString = `UPDATE artists
                         SET name = '${artistName}' , photo_url = '${artistPhotoUrl}' , nationality = '${artistNationality}'
                         WHERE id = ${id}
                         RETURNING *;`

    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){
            const data = result.rows;
            res.render('addeditsuccess', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})


//DELETE ARTIST FORM AND REQUEST
app.get('/artist/:id/delete', (req,res)=>{
    artistId = parseInt(req.params.id);

    const queryString = `SELECT * FROM artists WHERE id= ${artistId}`;
    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){

            const data = result.rows;

            res.render('deleteform', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})
app.delete('/artist/:id', (req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let artistName = data.name;
    let artistPhotoUrl = data.photo_url;
    let artistNationality = data.nationality;

    const queryString = `DELETE FROM artists
                         WHERE id=${id}`

    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){
            const data = result.rows;
            res.render('home', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})

/**
 * ===================================
 * SONG PATHS
 * ===================================
 */

//VIEW SONGS FROM SINGLE ARTIST
app.get('/artist/:id/songs', (req,res)=>{

    artistId = parseInt(req.params.id);

    const queryString = `SELECT * FROM songs WHERE artist_id = ${artistId}`;
    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){

            const data = result.rows;
            res.render('viewartist', {data});

        } else {

            console.error('query error:', errObj.stack);
            res.send( 'query error' );

        }
    })
})


//ADD SONG FORM & REQUEST FROM SINGLE ARTIST
app.get('/artist/:id/songs/new', (req,res) =>{
    let data = req.params.id;
    console.log('at add new song');
    console.log(data);
    res.render('newsong', {data});
})
app.post('/artist/:id/songs',(req,res)=>{
    let data = req.body;
    let songTitle = req.body.title;
    let songAlbum = req.body.album;
    let songPreview = req.body.preview_link;
    let songArtwork = req.body.artwork;
    let songArtistId = req.body.artist_id;


    const queryString = `INSERT INTO songs
                        (title, album, preview_link, artwork, artist_id)
                        VALUES
                        ('${songTitle}','${songAlbum}','${songPreview}', '${songArtwork}', '${songArtistId}')
                        RETURNING *`;

    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){

            const data = result.rows;

            res.render('addeditsuccess', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})


/**
 * ===================================
 * PLAYLIST PATHS
 * ===================================
 */


//LIST ALL PLAYLIST
app.get('/playlist', (req,res)=>{
    let queryString = `SELECT * FROM playlist;`

    pool.query(queryString,(errobj,result)=>{
        if(errobj === undefined){

            const data = result.rows;
            res.render('viewplaylist', {data})

        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})

//FORM FOR CREATING PLAYLIST
app.get('/playlist/new', (req,res)=>{

    const queryString = `SELECT * FROM songs;`
    pool.query(queryString,(errobj,result)=>{

            let data = result.rows;

          res.render('playlistform', {data} );
    })
})

//REQEST FOR CREATING NEW PLAYLIST
app.post('/playlist', (req,res)=>{

    const newPlayListTitle = req.body.title;
    const songIdToAdd = req.body.songs;

    const queryInsertPlayList = `INSERT INTO playlist (title) VALUES ('${newPlayListTitle}') RETURNING id;`
    pool.query(queryInsertPlayList,(errObj,result)=>{
        if(errObj!=undefined){
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        } else {
            const playlistId = result.rows[0].id;

            let queryInsertSongsToPL = `INSERT INTO playlist_songs (playlist_id , song_id) VALUES `;

            songIdToAdd.forEach((song,index)=>{
                queryInsertSongsToPL += `(${playlistId}, ${song}),`;
            })

            queryInsertSongsToPL = queryInsertSongsToPL.slice(0,-1);

            queryInsertSongsToPL = queryInsertSongsToPL + ` RETURNING *`;

            pool.query(queryInsertSongsToPL, (errObj, result)=>{
                if(errObj!=undefined){
                    console.error('query error:', errObj.stack);
                    res.send( 'query error' );
                } else {
                    const data = result.rows;
                    res.send('Playlist Added!');
                }
            })
        }
    })
})

//SHOWS SONGS INSIDE PLAYLIST
app.get('/playlist/:id', (req,res)=>{

    const playlistId = req.params.id;

    let queryString = `SELECT playlist_songs.playlist_id, songs.title, songs.id, songs.preview_link, songs.album, songs.artist_id
                       FROM songs
                       INNER JOIN playlist_songs
                       ON (playlist_songs.song_id = songs.id)
                       WHERE playlist_songs.playlist_id = ${playlistId};`

    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){
            const data = [result.rows,playlistId];
            console.log(data);

            res.render('songsfromplaylist', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})

//ADD SONGS TO PLAYLIST
app.post('/playlist/:id', (req,res)=>{

    let playlistId = req.params.id;
    let data = req.body;
    let songId = data.id;

    const queryString = `INSERT INTO playlist_songs
                        (playlist_id, song_id)
                        VALUES
                        ('${playlistId}', '${songId}' )
                        RETURNING *`;

    pool.query(queryString,(errObj,result)=>{
        if(errObj === undefined){

            const data = result.rows;
            res.render('addeditsuccess', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
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