console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser')
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

app.use(cookieParser());
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
//REGISTER PAGE
app.get('/register', (req,res)=>{

    res.render('loginRegister/register')
})
//REGISTER FORM
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

//LOGIN PAGE
app.get('/login',(req,res)=>{

    res.render('loginRegister/login')
})
//LOGIN FORM
app.post('/login',(req,res)=>{

    const dataForm = req.body;
    const hashPass = sha256(dataForm.password);
    //SEND QUERY TO CHECK IF USER NAME EXIST, AND IF YES, RETRIEVE HASHED PASSWORD IN DB
    const queryExistingUser = `SELECT password,id FROM users where username='${dataForm.username}'`;

    pool.query(queryExistingUser, (errObj, result)=>{

        if(errObj!=undefined){
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        } else {
            if(result.rows.length == 0){

                res.send('You have entered incorrect login details!');

            } else if(result.rows[0].password == hashPass){

                let cookieUser = dataForm.username;
                let cookieHashed = 'Verified';
                let cookieId = result.rows[0].id;

                res.cookie('username', cookieUser);
                res.cookie('loggedIn', cookieHashed);
                res.cookie('userId', cookieId);
                //CHECKS IF USER ENTERED PASSWORD(HASHED) MATCHES DB PASSWORD(HASHED)
                const queryString = `SELECT * FROM artists`;

                pool.query(queryString,(errObj, result)=>{

                     if(errObj === undefined){
                    //IF PASSWORD MATCH
                    const data = result.rows;
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

    res.render('artist/new');
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
            res.render('artist/editartist', {data});
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

            res.render('artist/deleteform', {data});
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
            res.render('artist/viewartist', {data});

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
    res.render('song/newsong', {data});
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
            res.render('playlist/viewplaylist', {data})

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

          res.render('playlist/playlistform', {data} );
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
                    //TO EXPAND UPON. RENDER SOMETHING WITH RESULTS
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

            const data = [ result.rows , playlistId ];


            res.render('song/songsfromplaylist', {data});
        } else {
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        }
    })
})

//ADD SONGS TO PLAYLIST ( ONE BY ONE)
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
 * FAVOURITES PATHS
 * ===================================
 */

//CREATE FORM FOR USER TO SELECT SONGS TO FAVOURITE
app.get('/favourites/new', (req,res)=>{

    const queryString = `SELECT * FROM songs;`
    pool.query(queryString,(errObj,result)=>{
        if(errObj!=undefined){
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        } else {
            let cookies = req.cookies
            let dataSongs = result.rows;
            let data = {dataSongs , cookies};

            res.render('favourite/favouriteform', {data});
        }
    })
})

// { userId: '1', songs: [ '247', '248' ] }
app.post('/favourites', (req,res)=>{

    const songIdToAdd = req.body.songs;
    const userId = req.body.userId;

    let queryInsert = `INSERT INTO favourites (user_id, song_id) VALUES`;

    songIdToAdd.forEach((song,index)=>{
        queryInsert += `(${userId}, ${song}),`;
    })

    queryInsert = queryInsert.slice(0,-1);
    queryInsert = queryInsert + ` RETURNING *`;

    pool.query(queryInsert,(errObj,result)=>{
        if(errObj!=undefined){
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        } else {
            const data = result.rows;
            //EXPAND USING DATA TO RENDER
            res.send('Playlist Added!');
        }
    })
})

app.get('/favourites', (req,res)=>{

    const userId = req.cookies.userId;
    let queryString = `SELECT favourites.user_id, songs.title, songs.id, songs.preview_link, songs.album, songs.artist_id
                       FROM songs
                       INNER JOIN favourites
                       ON (favourites.song_id = songs.id)
                       WHERE favourites.user_id = ${userId};`

    pool.query(queryString,(errObj,result)=>{
        if(errObj!== undefined){
            console.error('query error:', errObj.stack);
            res.send( 'query error' );
        } else {
            // const data = [result.rows.playlistId];
             const data = [ result.rows , userId ];


            res.render('favourite/songsfromfavourite', {data});
            // res.render('song/songsfromplaylist', {data});
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