console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');


// Initialise postgres client
const configs = {
  user: 'home',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

var sha256 = require('js-sha256');

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

let queryString;

/**
 * ===================================
 * Routes
 * ===================================
 */

//HOME PAGE

app.get('/', (request,response)=>{
    response.render('landing')
})

//    _____ _____________________.___  ____________________
//   /  _  \\______   \__    ___/|   |/   _____/\__    ___/
//  /  /_\  \|       _/ |    |   |   |\_____  \   |    |
// /    |    \    |   \ |    |   |   |/        \  |    |
// \____|__  /____|_  / |____|   |___/_______  /  |____|
//         \/       \/                       \/


app.get('/artists', (request, response) => {

    queryString = "SELECT name,id FROM artists"
     pool.query(queryString, (err, result) => {
        console.log(queryString)

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            console.log('query result:', result);

            const data = {
                list: result.rows
            }
              response.render('home', data);
          }
    });

});

//NEW ARTIST FORM
app.get('/artists/new', (request, response) => {
  response.render('new');
});

//ADD NEW ARTIST
app.post('/artists/', (request, response) => {

let art = request.body
const array = [art.name,art.photo,art.nationality]


queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

    pool.query(queryString, array, (err, result) => {


          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {


            response.send( result.rows );

        }
    });
})

//SHOW ARTIST
app.get('/artists/:id', (request, response) => {
    let identifier = parseInt(request.params.id)

    queryString = `SELECT * FROM artists WHERE id = '${identifier}'`

     pool.query(queryString, (err, result) => {


          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {


            const data = {
                artist: result.rows[0]
            }
            response.render('artist',data)
          }
    });
});


// __________.____       _____ _____.___.____    .___  ____________________
// \______   \    |     /  _  \\__  |   |    |   |   |/   _____/\__    ___/
//  |     ___/    |    /  /_\  \/   |   |    |   |   |\_____  \   |    |
//  |    |   |    |___/    |    \____   |    |___|   |/        \  |    |
//  |____|   |_______ \____|__  / ______|_______ \___/_______  /  |____|
//                   \/       \/\/              \/           \/


app.get('/playlists', (request,response)=>{
    response.send('UNDER MAINTENANCE')
})

app.get('/playlists/new', (request,response)=>{
    response.render('newplaylist')
});

app.post('/playlists', (request,response)=>{

    console.log(request.body.name)

    queryString = `INSERT INTO playlist (name) VALUES ('${request.body.name}') RETURNING *`

    pool.query(queryString, (err, result) => {
        console.log(queryString)

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            response.send( result.rows );
        }
    });
})

app.get('/playlists/:id', (request, response) => {
    let identifier = parseInt(request.params.id)

        queryString =  `SELECT playlist.name, songs.title, songs.album
    FROM playlist
    INNER JOIN playlist_songs ON (playlist_songs.playlist_id=playlist.id)
    INNER JOIN songs ON (playlist_songs.song_id=songs.id)
    WHERE playlist_songs.playlist_id = '${identifier}'`


     pool.query(queryString, (err, result) => {


          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {

            const data = {
                playlist: result.rows
            }
            response.render('playlist',data)
          }
    });
});

app.get('/playlists/:id/newsong',(request,response)=> {

    const data = {
        playlist: request.params.id
    }

    response.render('addsong', data)
})

app.post('/playlists/:id', (request,response)=>{
    let songName = request.body.name
    let playlistId = request.body.playlistid



    queryString = `SELECT id FROM songs WHERE title = '${songName}'`

    pool.query(queryString, (err, result) => {


          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {

                    let songId = result.rows[0].id

                    let array = [playlistId, songId]
                    queryString = 'INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2) RETURNING *'


                    pool.query(queryString, array, (err,result)=>{
                        if (err){
                            console.error('query error:', err.stack);
                            response.send('query error');
                        } else{

                            response.send('Song added to playlist')
                        }

                    })

        }
    });
})



//   _________________    _______    ________
//  /   _____/\_____  \   \      \  /  _____/
//  \_____  \  /   |   \  /   |   \/   \  ___
//  /        \/    |    \/    |    \    \_\  \
// /_______  /\_______  /\____|__  /\______  /
//         \/         \/         \/        \/


//ADD SONG FORM
app.get('/artists/:id/songs/new',(request,response)=> {
    let identifier = parseInt(request.params.id)

      queryString = `SELECT name FROM artists WHERE id = '${identifier}'`

        pool.query(queryString, (err,result)=>{
            if (err){
                    console.error('query error:', err.stack);
                    response.send( 'query error' );
            } else{

                const data = {
                artist: request.params.id,
                name: result.rows[0].name
                }

                response.render('newsong', data)
            }
        })
})

//SUBMIT NEW SONG FORM
app.post('/artists/:id/songs', (request,response)=>{

    console.log(request.body)

    let array = [request.body.song, request.body.album, request.body.id]
    queryString = `INSERT INTO songs (title, album, artist_id) VALUES ($1, $2, $3)`

    pool.query(queryString, array, (err, result) => {


          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            response.send(`${request.body.song} added`)

        }
    });
})

//DISPLAY SONGS BY AN ARTIST
app.get('/artists/:id/songs', (request, response) => {
    let identifier = parseInt(request.params.id)

    queryString = `SELECT name FROM artists WHERE id = '${identifier}'`
    pool.query(queryString, (err,result)=>{
        if (err){
                console.error('query error:', err.stack);
                response.send( 'query error' );
        } else{

            var name = result.rows[0].name

             queryString = `SELECT title,album FROM songs WHERE artist_id = '${identifier}'`

            pool.query(queryString, (err, result) => {


                      if (err) {
                        console.error('query error:', err.stack);
                        response.send( 'query error' );
                      } else {


                        const data = {
                            songs: result.rows,
                            name: name
                        }

                    response.render('songs',data)

                    }
            });
        }
    })
});


// .____    ________    ________.___ _______
// |    |   \_____  \  /  _____/|   |\      \
// |    |    /   |   \/   \  ___|   |/   |   \
// |    |___/    |    \    \_\  \   /    |    \
// |_______ \_______  /\______  /___\____|__  /
//         \/       \/        \/            \/

let SALT = "meowmeow357"

app.get ('/register', (request,response)=>{
    response.render('register')
})

app.post('/register', (request,response)=>{

    console.log(request.body)

    let hashedPw = sha256(request.body.password)
    console.log(hashedPw)
    let array = [request.body.username, hashedPw]

    queryString = `SELECT * FROM users WHERE username = '${request.body.username}'`
    console.log(queryString)
    pool.query(queryString, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {

                if(result.rows[0]!= undefined && result.rows[0].username === request.body.username){
                    response.send("Be more creative - that one's been taken.")
                } else {
                        queryString = 'INSERT INTO users (username, pw) VALUES ($1, $2)'

                        pool.query(queryString, array, (err, result) => {
                          if (err) {
                            console.error('query error:', err.stack);
                            response.send( 'query error' );
                          } else {
                            response.redirect('/login')

                            }
                        });
                }
        }
    });
})

app.get('/login', (request,response)=>{
    response.render('login')
})

app.post('/bananas', (request,response)=>{

    let user = request.body.username
    let password = request.body.password
    let hashedPw = sha256(request.body.password)
    console.log(user, password, hashedPw)

   queryString = `SELECT * FROM users WHERE username = '${user}'`

    pool.query(queryString, (err, result) => {
        console.log(result.rows[0])

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            if (user === result.rows[0].username && hashedPw === result.rows[0].pw){

            let userId = result.rows[0].id
            let user = result.rows[0].username


            let cookieHash = sha256(SALT + userId)

            response.cookie('loggedin', cookieHash);
            response.cookie('userid',userId);
            response.cookie('username', user)
            console.log(request.body)
            response.redirect('/bananas')
            } else {
                response.send ('nope')
            }

        }
    })
})


app.get('/bananas', (request,response)=>{

    console.log(request.cookies)

    let id = request.cookies['userid']
    let logged = sha256(SALT + id)
    console.log(request.cookies['loggedin'])
    console.log(logged)

    if (request.cookies['loggedin'] === logged){
        response.render('banana')
    } else {
        response.redirect ('/login')
    }

})


// ____________________   ____________ __________._________________________
// \_   _____/  _  \   \ /   /\_____  \\______   \   \__    ___/\_   _____/
//  |    __)/  /_\  \   Y   /  /   |   \|       _/   | |    |    |    __)_
//  |     \/    |    \     /  /    |    \    |   \   | |    |    |        \
//  \___  /\____|__  /\___/   \_______  /____|_  /___| |____|   /_______  /
//      \/         \/                 \/       \/                       \/

app.get('/favorites/new', (request,response)=>{
    response.render('favorite')
})

app.post('/favorites', (request,response)=>{
    let song = request.body.favorite

    queryString = `SELECT * FROM songs WHERE title = '${song}' `

     pool.query(queryString, (err, result) => {
        console.log(result.rows[0])

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {

                if (result.rows[0]=== undefined){
                    response.send("This song does not exist.")
                } else{
                    let songid = result.rows[0].id;
                    let title = result.rows[0].title
                    let array = [songid, request.cookies.userid]
                    queryString = `INSERT INTO favorites (song_id,user_id) VALUES ($1, $2)`
                    pool.query(queryString, array, (err,result)=>{
                        if (err){
                            console.error('query error:', err.stack);
                            response.send( 'query error' );
                        } else {
                            response.send(title + " has been added to your favorites")
                        }
                    })
                }
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