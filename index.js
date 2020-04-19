console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

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
  response.send("Hello World");
});

//Artists
app.get('/artists', (request, response) => {
    const queryString = 'SELECT * from artists';

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
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

// Each Playlist
app.get('/playlist', (request, response) => {

    const whenQueryDone = (queryError, result) => {
        if(queryError){
            console.log("======ERROR======")
            console.log(queryError);
            response.send('db error');
        } else {
            response.render('playlist',result);
            //console.log(result)
        }
    }
    const queryString="SELECT * from playlist"
    pool.query(queryString, whenQueryDone)

});

//Select playlist
app.get('/playlist/:id', (request, response) => {

    const whenQueryDone = (queryError, result) => {
        if(queryError){
            console.log("======ERROR======")
            console.log(queryError);
            response.send('db error');
        } else {
            //console.log('playlist',result.rows);
            //response.send(result.rows)
            //console.log(result.rows[0].song_id)
            response.render('playlistID',result)
        }
    }
    let values = [request.params.id]
    const queryString= "SELECT * FROM songs "+
    "WHERE songs.id IN(SELECT song_id FROM "+
    "playlist INNER JOIN playlist_song ON "+
    "(playlist.id = playlist_id) WHERE playlist_id = $1)"
    pool.query(queryString, values, whenQueryDone)

});




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

    // songList.foreach ((element, index) => {

    //     const insertValues = [songList[index]];
    //     const queryString = "INSERT INTO (name) VALUES ($1) RETURNING *";
    //     pool.query(queryString, insertValues, whenQueryDone )

    // })
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