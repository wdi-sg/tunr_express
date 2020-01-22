console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'joycepaul',
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
  // query database for all artists

  // respond with HTML page displaying all artists
  response.render('home');
});


app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artist

  response.render('new');
});



app.post('/artists',(request, response)=>{

  let insertQueryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';

  const values = [
    request.body.name,
    request.body.photo_url,
    request.body.nationality
  ];

  pool.query(insertQueryText, values, (err, result)=>{
    console.log("INSERT query callback")

    console.log( )

    if( err ){
      console.log("ERROR", err);
      response.send("error")
    }else{
      console.log("DONE", result.rows)
      response.send("You have added an artist : " + request.body.name)
    }
  });
  // response.send("heeeyyyyy");
})



app.get('/artists/:id',(request, response)=>{
  let artistId = parseInt(request.params.id);
  console.log(artistId);
  let query = "SELECT * FROM artists WHERE id ="+ artistId;
    pool.query(query, (err,result)=>{
      const data = {
        name: result.rows[0].name,
        photo_url: result.rows[0].photo_url,
        nationality: result.rows[0].nationality };

      response.render('queryid', data);
    });

});






// GET /playlist
// app.get('/playlist', (request, response) => {
//   // respond with HTML page with form to create new playylist
//       let playlist = obj.playlist;
//       const data = {
//         playlist: lists

//   response.render('playlist');
// }
// });






// Create a form: /playlists/new
app.get('/playlist/new', (request, response) => {
  // respond with HTML page with form to create new playylist
  response.render('newplaylist');
});



app.post('/playlist',(request, response)=>{

  let insertQueryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *';

  const values = [
    request.body.name
  ];

  pool.query(insertQueryText, values, (err, result)=>{
    console.log("INSERT query callback")

    console.log( )

    if( err ){
      console.log("ERROR", err);
      response.send("error")
    }else{
      console.log("DONE", result.rows)
      response.send("You have added a new playlist : " + request.body.name)
    }
  });
  // response.send("heeeyyyyy");
})




/*Create a show route /playlists/:id => /playlists/1*/
app.get('/playlist/:id',(request, response)=>{

  let playlistId = [parseInt(request.params.id)];
  console.log(playlistId);

  let query = "SELECT * FROM playlist WHERE id =$1";

    pool.query(query, playlistId, (err,result)=>{
        console.log(result.row);
        let playlist = result.rows;
        const data = {
            chosenPlaylist: playlist[0]
         };
        response.render('playlistid', data);
    });
});





/*
app.get('/playlist/:id',(request, response)=>{

  let playlistId = [parseInt(request.params.id)];
  console.log(playlistId);
  let query = "SELECT * FROM playlist WHERE id =$1";
    pool.query(query, playlistId, (err,result)=>{
      const data = {
        id: result.rows[0].id,
        song_id: result.rows[0].songid,
        playlist_id: result.rows[0].playlistid };

      response.render('Playlistid', data);
    });

});*/









/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ 🎹🎹🎹🎹🎹 Tuning in to the waves of port 3000 🎹🎹🎹🎹🎹 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
