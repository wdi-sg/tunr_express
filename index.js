console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'nathanaeltan',
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

/**
 * ===================================
 * HOME PAGE
 * ===================================
 */
app.get('/artists/', (request, response) => {

  const queryString = `SELECT * FROM artists`;

  pool.query(queryString, (err, result) => {
      if (err) {
          console.error("query error:", err.stack);
          response.send("query error");
      } else {
          console.log("query result:", result);

          const data = {
            result: result.rows
          }
         
          response.render('home', data);
          
      }
  });
});

/**
 * ===================================
 * ADD A NEW ARTIST
 * ===================================
 */

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artists', (request, response) => {
  let { name, photo_url, nationality }= request.body;


  const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${name}', '${photo_url}', '${nationality}')`;

  pool.query(queryString, (err, result) => {
      if (err) {
          console.error("query error:", err.stack);
          response.send("query error");
      } else {
          
        response.redirect("/artists/")
          
      }
  });
  
})

/**
 * ===================================
 * INDIVIDUAL ARTIST PAGE
 * ===================================
 */

app.get('/artists/:id', (request, response) => {
  let artistId = parseInt(request.params.id)
  
  const queryString = `SELECT * FROM artists WHERE id=${artistId}`;

  pool.query(queryString, (err, result) => {
      if (err) {
          console.error("query error:", err.stack);
          response.send("query error");
      } else {
          const data = {
            result: result.rows[0]
          }
          
          response.render("individualartist", data);
          
      }
  });
})

/**
 * ===================================
 *INDIVIDUAL ARTIST SONGS
 * ===================================
 */
app.get('/artists/:id/songs', (request, response) =>{
  let artistId = parseInt(request.params.id);
  const queryString = `SELECT * FROM songs WHERE artist_id=${artistId}`;

  pool.query(queryString, (err, result) => {
    if (err) {
        console.error("query error:", err.stack);
        response.send("query error");
    } else {
        const data = {
          result: result.rows
        }

        response.render("artistSongs", data);
        
    }
});
})

/**
 * ===================================
 * EDIT AN ARTIST
 * ===================================
 */
app.get('/artists/:id/edit', (request, response) => {
  let artistId = parseInt(request.params.id);
  const queryString = `SELECT * FROM artists WHERE id=${artistId}`;
  
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error("query error:", err.stack);
        response.send("query error");
    } else {
        const data = {
          result: result.rows[0]
        }
        
        response.render("edit", data);
    }
});
})

app.put('/artists/:id', (request, response) => {
  let artistId = parseInt(request.params.id);
  let { name, photo_url, nationality }= request.body;
  const queryString = `UPDATE artists SET name='${name}', photo_url='${photo_url}', nationality='${nationality}' WHERE id=${artistId}`;

  pool.query(queryString, (err, result) => {
    if (err) {
        console.error("query error:", err.stack);
        response.send("query error");
    } else {
     
        response.redirect(`/artists/${artistId}`);
    }
});
})

/**
 * ===================================
 * DELETE AN ARTIST
 * ===================================
 */
app.get('/artists/:id/delete', (request, response) => {
  let artistId = parseInt(request.params.id);
  const queryString = `SELECT * FROM artists WHERE id=${artistId}`;
  
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error("query error:", err.stack);
        response.send("query error");
    } else {
        const data = {
          result: result.rows[0]
        }
       
        response.render("delete", data);
    }
});
})

app.delete('/artists/:id', (request, response) =>{
  let artistId = parseInt(request.params.id);
  const queryString = `DELETE FROM artists WHERE id=${artistId}`;
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error("query error:", err.stack);
        response.send("query error");
    } else {
   
        response.redirect("/artists");
    }
});
})

/**
 * ===================================
 * PLAYLIST INDEX
 * ===================================
 */

 app.get('/playlist', (request, response)=>{
  const queryString = `SELECT * FROM playlist`;

  pool.query(queryString, (err, result) => {
      if (err) {
          console.error("query error:", err.stack);
          response.send("query error");
      } else {
          const data = {
            result: result.rows
          }
          console.log("THIS IS FOR PLAYLIST SAKDJNAKDJASNDANK " + result.rows)
        response.render("playlist", data)
          
      }
  });
 })
/**
 * ===================================
 * ADD A PLAYLIST
 * ===================================
 */
app.get('/playlists/new', (request, response) =>{
  response.render('newplaylist')
})

app.post('/playlist', (request, response)=>{
  let name = request.body.name;

  const queryString = `INSERT INTO playlist (name) VALUES ('${name}')`;

  pool.query(queryString, (err, result) => {
      if (err) {
          console.error("query error:", err.stack);
          response.send("query error");
      } else {
          
          console.log("THIS IS FOR PLAYLIST SAKDJNAKDJASNDANK " + result.rows)
        response.redirect("playlist")
          
      }
  });
})

/**
 * ===================================
 * INDIVIDUAL PLAYLIST
 * ===================================
 */

app.get('/playlist/:id', (request, response)=>{
  let id = parseInt(request.params.id);
  const queryString = `SELECT * FROM playlist WHERE id=${id}`;

  pool.query(queryString, (err, result) => {
      if (err) {
          console.error("query error:", err.stack);
          response.send("query error");
      } else {

        const data = {
          result: result.rows[0]
        }
          
         response.render('individualplaylist', data)
          
      }
  });
})


/**
 * ===================================
 * ADD A SONG TO THE PLAYLIST
 * ===================================
 */


app.get('/playlist/:id/newsong', (request, response)=>{
  let id = parseInt(request.params.id);
  const queryString = `SELECT * FROM songs`;

  pool.query(queryString, (err, result) => {
      if (err) {
          console.error("query error:", err.stack);
          response.send("query error");
      } else {

        const data = {
          result: result.rows,
          id: id
        }
          
         response.render('newsong', data)
          
      }
  });
})
app.post('/playlist/:id', (request, response)=>{
  let playlistId = parseInt(request.params.id);
  let songId = request.body.id;
 
  const queryString = `INSERT INTO playlist_song (song_id, playlist_id) VALUES( ${songId}, ${playlistId})
                      `;
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error("query error:", err.stack);
        response.send("query error");
    } else {

  console.log(queryString)
        
       response.redirect('/playlist/:id')
        
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
