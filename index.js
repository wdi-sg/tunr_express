console.log("starting up!!");

const cookieParser = require('cookie-parser')
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');


// Initialise postgres client
const configs = {
  user: 'kwansing',
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

app.get('/', (request, response) => {
    const data = {
        loggedIn : false
    };

    if( request.cookies['logged in'] === 'true'){
        data.loggedIn = true;
    }
    // send response with some data (a string)
    response.render('home', data);
});

//Registration
app.get('/register', (request, response) => {
    response.render('register');
});

app.post('/register', (request, response) => {

    let registerQuery = "INSERT INTO users (name, password) VALUES ($1, $2) returning *";
    var hashedPassword = sha256(request.body.password);
    const values = [request.body.name, hashedPassword];

    pool.query(registerQuery, values, (error, result)=>{
        if( error ){
          console.log("ERRRRRRRRRROR");
          console.log(error);
        }
        console.log("YAAAYYYYY");
        response.cookie('logged in', 'true');
        response.cookie('username',result.rows[0].name)
        response.cookie('userid',result.rows[0].id)
        response.redirect('/playlist');
    })
});

app.get('/login', (request, response) => {
  // send response with some data (a string)
  response.render('login');
});

app.post('/login', (request, response) => {
  console.log(request.body)

  let getUserQuery = "SELECT * FROM users WHERE name=$1";
  const values = [request.body.name];
  pool.query(getUserQuery, values, (error, result)=>{
    if( error ){
      console.log("ERRRRRRRRRROR");
      console.log(error);
    }
    console.log("YAAAYYUUUUUUUYYYYYY");
    console.log("SELECT RESULT:")
    console.log(result.rows);

    // if there is a result in the array
    if( result.rows.length > 0 ){
      // we have a match with the name
      // response.send("heeeyyyy");heeeyyyy

        let requestPassword = request.body.password;

        if(sha256( requestPassword) === result.rows[0].password){
            response.cookie('logged in', 'true');
            response.cookie('username',result.rows[0].name)
            response.cookie('userid',result.rows[0].id)
            response.redirect('/playlist')
        }else{
            data={
                status: "pwwrong"
            }
             // nothing matched
            response.status(403);
            response.render('login',data)
        }
    }else{

        data={
                status: "userwrong"
        }
        response.status(403);
        response.render('login',data)
    }
  })
  // send response with some data (a string)
});

app.delete('/logout', (request, response)=>{
    response.clearCookie('logged in');
    response.redirect('/')
});

//favorites
app.get('/favorites')

//Artists
app.get('/artists', (request, response) => {
    const queryString = 'SELECT * from artists';

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error');
        } else {
            console.log('query result:', result);
            response.send(result.rows);
        }
    });
});

app.get('/songs', (request, response) => {
    const queryString = 'SELECT * from songs';

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:');
            response.send(result.rows);
        }
    });
});

//for Creating new artist
app.get('/playlist/:id/newsong', (req, res) => {
  res.render('playlist/');
});

app.post('/artistNew', (req,res) => {
  console.log(req.body);

  let queryText;
  let values;

  values = [req.body.name,req.body.photo_url,req.body.nationality];
  queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

  pool.query(queryText, values, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send('query error');
    } else {
      console.log('query result:', result);
      // redirect to home page
      res.redirect("/artists");
      console.log(result)
    }
  });
});

//Creating new playlist
app.get('/playlist/new/', (request, response) => {

    const whenQueryDone = (error, result) => {
        if(error){
            console.log("======ERROR======")
            console.log(error);
            response.send('db error');
        } else {
            // console.log(result)
            //insert songs into data
            response.render('playlistNew',result)
        }
    }
    const queryString="SELECT * from songs"
    pool.query(queryString, whenQueryDone)

});

//Each Playlist
app.get('/playlist', (request, response) => {

    var username = request.cookies['username'];
    var visits = request.cookies['visits'];
    if( visits === undefined ){
        visits = 1;
    }else{
        visits = parseInt( visits ) + 1;
    }
    response.cookie('visits', visits);

    const whenQueryDone = (queryError, result) => {
        if(queryError){
            console.log("======ERROR======")
            console.log(queryError);
            response.send('db error');
        } else {
            data = {
                rows: result.rows,
                visits: visits,
                username: username
            }
            response.render('playlist',data);
        }
    }

    const queryString="SELECT * from playlist"
    pool.query(queryString, whenQueryDone)

});

//Select playlist
app.get('/playlist/:id', (request, response) => {
    //console.log(request.body)
    var visits = request.cookies['visits'+request.params.id];
    if( visits === undefined ){
        visits = 1;
    }else{
        visits = parseInt( visits ) + 1;
    }
    response.cookie('visits'+request.params.id, visits);

    const whenQueryDone = (queryError, result) => {
        if(queryError){
            console.log("======ERROR======")
            console.log(queryError);
            response.send('db error');
        }
        else{
            const whenQueryDone = (queryError, result2) => {
                if(queryError){
                    console.log("======ERROR======")
                    console.log(queryError);
                    response.send('db error');
                } else {
                    data = {
                        id:request.params.id,
                        rows:result.rows,
                        name:request.body.name,
                        visits:visits,
                        playlist:result2.rows[0].name
                    }
                        console.log(result2.rows)
                        response.render('playlistID',data)
                }
            }
            values = [request.params.id];
            const queryString = "SELECT * FROM playlist where id = $1";
            pool.query(queryString, values, whenQueryDone)
        }
    }
    let values = [request.params.id]
    const queryString="SELECT * FROM songs "+
    "WHERE songs.id IN(SELECT song_id FROM "+
    "playlist INNER JOIN playlist_song ON "+
    "(playlist.id = playlist_id) WHERE playlist_id = $1)"
    pool.query(queryString, values, whenQueryDone)
});

//Adding new song to existing playlist
app.post('/playlist/:id/newsong', (request, response) => {

    const whenQueryDone = (queryError, result) => {
        if(queryError){

            console.log("======ERROR======")
            console.log(queryError);
            response.send('db error');
        }
        else {
            console.log("testing 12321341234124313")
            data = {
                rows: result.rows,
                id: request.params.id
            }
            response.render('playlistAddSong',data)
        }
    }
    const queryString = "SELECT * FROM songs"
    pool.query(queryString, whenQueryDone)
})

app.post('/addtoexistplaylist/:id', (request,response) => {
    let songList = request.body.song


    if(songList.length > 1) {

        songList.forEach ((element) => {

            const whenQueryDone = (queryError, result) => {
                if( queryError ){
                    console.log("======ERROR======");
                    console.log(queryError);
                    response.send('db error');
                } else {
                    console.log(result.rows[0]);
                    //let playlist_id = result.rows[0].id;
                    //response.send(result.rows)
                }
            }
            console.log("=====adding songs======")
            const queryString = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *";
            const insertValues = [element,request.params.id];
            pool.query(queryString, insertValues, whenQueryDone )
        })
        response.redirect('/playlist')
    } else {
        const whenQueryDone = (queryError, result) => {
                if( queryError ){
                    console.log("======ERROR======");
                    console.log(queryError);
                    response.send('db error');
                } else {
                    console.log(result.rows[0]);
                    //let playlist_id = result.rows[0].id;
                    response.redirect('/playlist')
                }
            }
            console.log("=====adding songs======")
            const queryString = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *";
            const insertValues = [songList,request.params.id];
            pool.query(queryString, insertValues, whenQueryDone )
    }
})



//Add songs to new playlist
app.post('/addtoplaylist', (request,response) => {

    //response.send(request.body)
    let songList = request.body.song;
    let playListName = request.body.name;
    console.log(request.body.song)

    const whenQueryDone = (queryError, result) => {
        if( queryError ){
            console.log("======ERROR======");
            console.log(queryError);
            response.send('db error');
        }else{
            console.log(result.rows[0]);
            let playlist_id = result.rows[0].id;


            songList.forEach ((element, index) => {

                const whenQueryDone = (queryError, result) => {
                    if( queryError ){
                        console.log("======ERROR======");
                        console.log(queryError);
                        response.send('db error');
                    } else {
                        console.log(result.rows[0]);
                        let playlist_id = result.rows[0].id;
                    }
                }

                console.log("=====adding songs======")
                const queryString = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *";
                const insertValues = [element,playlist_id];
                console.log(songList)
                pool.query(queryString, insertValues, whenQueryDone )
            })

            console.log("=====playlistadded=====")
            //response.send("PlaylistName: "+playlist_id)
            response.redirect("playlist")
        }
    };
    const queryString = "INSERT INTO playlist (name) VALUES ($1) RETURNING *";
    const insertValues = [playListName];
    pool.query(queryString, insertValues, whenQueryDone )
})





//For Creating new artist
app.get('/artists/new', (req, res) => {
  res.render('artistNew');
});

app.post('/artistNew', (req,res) => {
  console.log(req.body);

  let queryText;
  let values;

  values = [req.body.name,req.body.photo_url,req.body.nationality];
  queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

  pool.query(queryText, values, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      res.send('query error');

    } else {
      console.log('query result:', result);
      // redirect to home page
      res.redirect("/artists");
      console.log(result)

    }
  });
});

//Selecting a specific artist
app.get('/artists/:id', (req, res) => {
    values = [req.params.id]
    console.log(values);
    queryText = 'SELECT * FROM artists WHERE id = $1';
    pool.query(queryText, values, (err, result) => {

        if (err) {
          console.error('query error:', err.stack);
          res.send( 'query error' );
        } else {
          console.log('query result:', result);
          res.send(result.rows);
        }
    });
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