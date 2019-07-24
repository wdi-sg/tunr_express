console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  password: 'N3v3rforg3t@',
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

app.use(express.static(__dirname+'/public'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Homepage React Callback Function
 * ===================================
 */


/**
 * ===================================
 * Artists React Callback functions
 * ===================================
 */

function artistsMainpage(request,response){
    const artistsQueryString = 'SELECT * from artists';
    
    pool.query(artistsQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      }
      let data = {
          artists: result.rows
        }
      response.render('artistmainpage',data);
    });

 };


function newArtistPage (request,response){
    response.render('newartist');
 };

function addNewArtist (request,response){
    const newArtistQueryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3) RETURNING id'
    const values = [request.body.name,request.body.photo_url,request.body.nationality];

    pool.query(newArtistQueryString, values, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        response.redirect(`/artists/${result.rows[0].id}`);

      }
    });
 };

function individualArtistPage (request,response){
    const individualArtistQueryString = 'SELECT * FROM artists where id ='+ parseInt(request.params.id);

    pool.query(individualArtistQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        let data = {
          artist: result.rows[0]
        }
        response.render('individualartist', data);
      }
    });
 };

function individualArtistEditPage (request,response){
    const individualArtistQueryString = 'SELECT * FROM artists where id ='+ parseInt(request.params.id);

    pool.query(individualArtistQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        let data = {
          artist: result.rows[0]
        }
        response.render('individualartistedit', data);
      }
    });
 };

function editIndividualArtist (request,response){
    const updateString = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id = '+ parseInt(request.params.id) + 'RETURNING id';
    let value = [request.body.name,request.body.photo_url,request.body.nationality];

    pool.query(updateString,value, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        console.log(result.rows);
        response.redirect(`/artists/${result.rows[0].id}`);
      }
    });
};

function individualArtistDeletePage (request,response){
    const individualArtistQueryString = 'SELECT * FROM artists where id ='+ parseInt(request.params.id);

    pool.query(individualArtistQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        let data = {
          artist: result.rows[0]
        }
        response.render('individualartistdelete', data);
      }
    });
 };

 function deleteIndividualArtist (request,response){
    const individualArtistQueryString = 'DELETE FROM artists where id ='+ parseInt(request.params.id);

    pool.query(individualArtistQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        response.redirect('/artists');
      }
    });
 };

 /**
 * ===================================
 * Songs React callback functions
 * ===================================
 */

function songsMainpage(request,response){
    const artistsQueryString = 'SELECT * FROM songs';
    
    pool.query(artistsQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      }
      let data = {
          songs: result.rows
        }
      response.render('songsmainpage',data);
    });

 };


function newSongPage (request,response){
    response.render('newsong');
 };

function addNewSong (request,response){
    const getArtistId = "SELECT id FROM artists WHERE LOWER(name) = LOWER('"+request.body.artist+"')";
    
    pool.query(getArtistId, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        const insertSong = 'INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5) RETURNING id '
        let values = [request.body.title,request.body.album,request.body.preview_link,request.body.artwork,result.rows[0].id]
        
        pool.query(insertSong, values, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            response.redirect(`/songs/${result.rows[0].id}`);

          }
        });
      }
    });
 };

function individualSongPage (request,response){
    const individualSongQueryString = 'SELECT * FROM songs where id ='+ parseInt(request.params.id);


    pool.query(individualSongQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        var data = {
          song: result.rows[0]
        }

        console.log(result.rows);

        const artistsName = 'SELECT name FROM artists where id = ' + result.rows[0].artist_id;

        pool.query(artistsName, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            data.artistName = result.rows[0].name;
            response.render('individualsong', data);
          }
        });
      }
    });
 };

function individualSongEditPage (request,response){
    const individualSongQueryString = 'SELECT * FROM songs where id ='+ parseInt(request.params.id);

    pool.query(individualSongQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        var data = {
          song: result.rows[0]
        }
        const artistsName = 'SELECT name FROM artists where id = ' + result.rows[0].artist_id;

        pool.query(artistsName, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            data.artistName = result.rows[0].name;
            response.render('individualsongedit', data);
          }
        });
      }
    });
 };

function editIndividualSong (request,response){
    const getArtistId = "SELECT id FROM artists WHERE LOWER(name) = LOWER('"+request.body.artist+"')";

    pool.query(getArtistId, (err, result) => {

      if (err) {
        console.error('query error1:', err.stack);
        response.send( 'query error1' );
      } else {
        console.log(typeof result.rows[0].id);
        console.log(request.body);
        const updateString = 'UPDATE songs SET title=$1, album=$2, preview_link=$3, artwork=$4, artist_id=$5 WHERE id = '+ parseInt(request.params.id) + 'RETURNING id';
        let values = [request.body.title,request.body.album,request.body.preview_link,request.body.artwork,result.rows[0].id]
        
        pool.query(updateString, values, (err, result) => {

          if (err) {
            console.error('query error2:', err.stack);
            response.send( 'query error2' );
          } else {
            response.redirect(`/songs/${result.rows[0].id}`);
          }
        });
      }
    });
 };


function individualSongDeletePage (request,response){
      const individualSongQueryString = 'SELECT * FROM songs where id ='+ parseInt(request.params.id);

      pool.query(individualSongQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        var data = {
          song: result.rows[0]
        }
        const artistsName = 'SELECT name FROM artists where id = ' + result.rows[0].artist_id;

        pool.query(artistsName, (err, result) => {

          if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
          } else {
            data.artistName = result.rows[0].name;
            response.render('individualsongdelete', data);
          }
        });
      }
    });
  };

 function deleteIndividualSong (request,response){
    const individualSongQueryString = 'DELETE FROM songs where id ='+ parseInt(request.params.id);

    pool.query(individualSongQueryString, (err, result) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        response.redirect('/songs');
      }
    });
 };
      

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  response.send('HELLO WORLD');
});

//artists routings

app.get('/artists',artistsMainpage);

app.get('/artists/new', newArtistPage);

app.post('/artists/new', addNewArtist);

app.get('/artists/:id', individualArtistPage);

app.get('/artists/:id/edit', individualArtistEditPage);

app.put('/artists/:id', editIndividualArtist);

app.get('/artists/:id/delete', individualArtistDeletePage);

app.delete('/artists/:id/delete', deleteIndividualArtist);

//songs routings

app.get('/songs',songsMainpage);

app.get('/songs/new', newSongPage);

app.post('/songs/new', addNewSong);

app.get('/songs/:id', individualSongPage);

app.get('/songs/:id/edit', individualSongEditPage);

app.put('/songs/:id', editIndividualSong);

app.get('/songs/:id/delete', individualSongDeletePage);

app.delete('/songs/:id/delete', deleteIndividualSong);


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
