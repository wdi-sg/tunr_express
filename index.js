console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'nausheen',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
 //Configurations and set up

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

// Routes

//welcome page
app.get('/', (request, response) => {

  response.render('home');
});

//display all arists
app.get('/artists/',(request,response)=>{
    const queryString = 'SELECT name from artists';
    pool.query(queryString, (err, indexResult) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', indexResult);
        //response.send(indexResult.rows);
        const indexData = {
            artists: indexResult.rows
        };
        response.render('index',indexData);


      }
    })

});

//create form for adding new artist
app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new song
  response.render('new');
});

//list single artist by id
app.get('/artists/:id',(request,response)=>{
    const queryString = 'SELECT * from artists WHERE id=' + request.params.id;
    pool.query(queryString, (serr, singleResult) => {

      if (serr) {
        console.error('query error:', serr.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', singleResult);
        //response.send(singleResult.rows);
        const singleData = {
            name: singleResult.rows[0].name,
            photo_url: singleResult.rows[0].photo_url,
            nationality: singleResult.rows[0].nationality
        };
        response.render('show',singleData);
      }
    })
});

//collect form data and add to DB
app.post('/artists',(request,response)=>{
    const query = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
    const insertValues = [request.body.name, request.body.photo_url,request.body.nationality];
    pool.query(query,insertValues,(aerr, addResult)=>{
        if (aerr) {
            console.error('query error:', aerr.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', addResult);
            //response.send(addResult.rows);
            response.redirect('/artists/' + addResult.rows[0].id)
        }

    })

});

//list all songs
app.get('/songs/',(request,response)=>{
    const queryString = 'SELECT title from songs';
    pool.query(queryString, (serr, indexsongResult) => {

      if (serr) {
        console.error('query error:', serr.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', indexsongResult);
        //response.send(indexResult.rows);
        const indexData = {
            songs: indexsongResult.rows
        };
        response.render('indexsong',indexData);


      }
    })
});

//create form for adding new song
app.get('/songs/new', (request, response) => {
  // respond with HTML page with form to create new song
  response.render('newsong');
});

//list single song by id
app.get('/songs/:id',(request,response)=>{
    const queryString = 'SELECT title,album from songs WHERE id=' + request.params.id;
    pool.query(queryString, (serr, singleSongResult) => {

      if (serr) {
        console.error('query error:', serr.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', singleSongResult);
        //response.send(singleResult.rows);
        const singleData = {
            title: singleSongResult.rows[0].title,
            album: singleSongResult.rows[0].album
        };
        response.render('showsong',singleData);
      }
    })
});

//collect form data and add to DB for songs
app.post('/songs',(request,response)=>{
    const query = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const insertValues = [request.body.title, request.body.album,request.body.preview_link, request.body.artwork, request.body.artist_id];
    pool.query(query,insertValues,(aerr, addSongResult)=>{
        if (aerr) {
            console.error('query error:', aerr.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', addSongResult);
            //response.send(addResult.rows);
            response.redirect('/songs/' + addSongResult.rows[0].id)
        }
    })

});

//list all playlists
app.get('/playlist/',(request,response)=>{
    const queryString = 'SELECT name from playlist';
    pool.query(queryString, (serr, indexPlaylistResult) => {

      if (serr) {
        console.error('query error:', serr.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', indexPlaylistResult);
        //response.send(indexResult.rows);
        const indexData = {
            playlists: indexPlaylistResult.rows
        };
        response.render('indexplaylist',indexData);
      }
    })
});

//take form data and post to DB for playlist
app.post('/playlist',(request,response)=>{
    const query = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *';
    const insertValues = [request.body.name];
    pool.query(query,insertValues,(aerr, addPlaylistResult)=>{
        if (aerr) {
            console.error('query error:', aerr.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', addPlaylistResult);
            //response.send(addPlaylistResult.rows);
            response.redirect('/playlist/' + addPlaylistResult.rows[0].id)
        }

    })

});

// form to add new playlist
app.get('/playlist/new', (request, response) => {
  // respond with HTML page with form to create new song
  response.render('newplaylist');
});

//add a new song to playlist by id
app.get('/playlist/:id/newsong', (request, response) => {
    const queryString = 'SELECT * FROM songs';
    pool.query(queryString, (aerr, newSongPlaylistResult) => {
        if (aerr) {
            console.error('query error:', aerr.stack);
            response.send( 'query error' );
        }else{
            const data ={
                playlistId: request.params.id,
                songs: newSongPlaylistResult.rows
            };
        response.render('addtoplaylist', data);
        }
    })
});

//get song and add to DB for playlist by id


//list single playlist by id
app.get('/playlist/:id',(request,response)=>{
    const queryString = 'SELECT name from playlist WHERE id=' + request.params.id;
    pool.query(queryString, (serr, singlePlaylistResult) => {

      if (serr) {
        console.error('query error:', serr.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', singlePlaylistResult);
        //response.send(singleResult.rows);
        const singleData = {
            name: singlePlaylistResult.rows[0].name
        };
        response.render('showplaylist',singleData);
      }
    })
});

// Listen to requests on port 3000

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