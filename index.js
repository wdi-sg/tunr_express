console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'eden',
  host: '127.0.0.1',
  database: 'week5',
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
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('newArtist.jsx');
});

app.get('/artists/', (request, response) => {
  let queryText = 'SELECT * FROM artists'
  pool.query(queryText,(err, result)=>{
    if(err){
        console.log("View artist error", err.message);
    } else {
        const data ={
            artistArr: result.rows
        }
        response.render('viewArtists.jsx', data)
    }
  })
});

app.post('/artists',(request, response)=>{
    let name = request.body.name;
    let nationality = request.body.nationality;
    let queryText = `INSERT INTO artists(name,nationality) VALUES ('${name}','${nationality}') RETURNING *`;
    pool.query(queryText,(err,result)=>{
        console.log(result.rows[0])
        let id = result.rows[0]["id"] + "<br>";
        let name = result.rows[0]["name"] + "<br>";
        let nationality = result.rows[0]["nationality"] + "<br>";
        let str = "New artist added:<br>"+id+name+nationality
        response.send(str);
    })
})

app.get('/artists/:id',(request,response)=>{
    let id = request.params.id;
    let queryText = `SELECT * FROM artists WHERE id = ${id}`;
    pool.query(queryText,(err,result)=>{
        const data = {
            artistArr: result.rows
        }
        response.render('selectedArtist.jsx',data)
    })
    // response.send(queryText)
})

app.get('/artists/:id/songs',(request,response)=>{
    let id = request.params.id;
    let queryText = `SELECT * FROM songs WHERE artist_id = ${id};`
    pool.query(queryText,(err,result)=>{
        const data = {
            artistArr: result.rows
        }

        response.render('viewSongs.jsx',data)
    })
})

app.get('/artists/:id/edit',(request,response)=>{
    let id = request.params.id;
    let queryText = `SELECT * FROM artists WHERE id = ${id};`
    pool.query(queryText,(err,result)=>{
        const data = {
            artistArr: result.rows[0]
        }
        response.render('editArtist.jsx',data)
    })
    // response.send(id)
})

app.put('/artists/:id',(request, response)=>{
    let x = request.body
    let id = request.params.id;
    let name = request.body.name;
    let nationality = request.body.nationality;
    let queryText = `UPDATE artists SET name='${name}', nationality='${nationality}' WHERE id=${id}`;
    pool.query(queryText,(err,result)=>{
        response.send(`Artist updated: ${id}. ${name} - ${nationality}`);
    })
})

app.delete('/artists/:id',(request,response)=>{
    let id = request.params.id;
    let queryText = `DELETE FROM artists WHERE id = ${id}`;
    pool.query(queryText,(err,result)=>{
        response.send('Artist deleted!');
    })
    // response.send(id)
})

app.get('/playlist',(request,response)=>{
    let queryText = `SELECT * FROM playlist`;
    pool.query(queryText,(err,result)=>{
        // console.log(result.rows)
        const data = {
            arr: result.rows
        }
        response.render('viewPlaylist.jsx',data);
    })
})

app.get('/playlist/new',(request,response)=>{
    response.render('newPlaylist.jsx')
})


app.get('/playlist/:id',(request,response)=>{
    let id = request.params.id;
    let queryArr = [id];
    let queryText = "SELECT songs.title FROM songs INNER JOIN playlist_song ON (playlist_song.song_id = songs.id) WHERE (playlist_song.playlist_id = $1)";
    pool.query(queryText, queryArr, (err,result)=>{
        const data = {
            arr: result.rows,
            arr2: id
        }
        response.render('viewPlaylistSong.jsx',data);
    })
})

app.get('/artists/:id/songs/new', (request, response) => {
  let id = request.params.id;
  const data = {
    id: id
  }
  response.render('newSong.jsx',data);
});

app.post('/artists/:id/songs',(request,response)=>{
    let title = request.body.title;
    let album = request.body.album;
    let id = request.params.id;
    let queryText = `INSERT INTO songs(title,album,artist_id) VALUES ('${title}','${album}','${id}') RETURNING *`;
    pool.query(queryText,(err,result)=>{
        console.log(result.rows[0])
        let title = "Title: "+result.rows[0]["title"] + "<br>";
        let album = "Album: "+result.rows[0]["album"] + "<br>";
        let str = "New Song added:<br>"+title+album;
        response.send(str);
    })
});


app.post('/playlist',(request,response)=>{
    console.log(request.body);
    let name = request.body.name;
    let queryArr = [name];
    let queryText = `INSERT INTO playlist(name) VALUES ($1) RETURNING *`;
    pool.query(queryText, queryArr, (err, result)=>{
        console.log(result.rows[0])
        let name = result.rows[0]["name"];
        response.send("New playlist added: " + name)
    })
})

app.get('/playlist/:id/newsong', (request, response) => {
  let id = request.params.id;
  const data = {
    id: id
  }
  response.render('newPlaylistSongs.jsx',data);
});

app.post('/playlist/:id',(request, response) => {
  var id = request.params.id; //playlist id
  let name = request.body.name; //song name
  let album = request.body.album; //song album
  let queryText = `SELECT id FROM songs WHERE title = '${name}' AND album = '${album}'`
  pool.query(queryText,(err,result)=>{
    var songId = result.rows[0]["id"];
    console.log("playlist id:"+ id);
    console.log("song id:"+ songId);
    let queryText2 = `INSERT INTO playlist_song ("playlist_id","song_id") VALUES (${songId},${id})`
    pool.query(queryText2,(err,result)=>{
        response.send('Song added to playlist!')
    })

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


//<---------   USING IN   --------->
// let queryText = `SELECT title FROM songs WHERE artist_id IN (SELECT id FROM artists WHERE NAME = 'Yeah Yeah Yeahs');`