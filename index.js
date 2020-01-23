  /* 
THE ORDER OF YOUR APP GET IS VERY IMPORTANT.
GET THEN POST THEN PUT THEN DELETE.  

Modularize callback functions into another file.
*/ 

console.log("starting up!!");
var sha256 = require('js-sha256');
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'weizheng1910',
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
const cookieParser = require('cookie-parser')
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

// GET - Register
app.get('/register/', (request, response) => {
    response.render('login');
});

// POST - Register
app.post('/register/', (request, response) => {
    const email = request.body.emailaddress;
    const password = sha256(request.body.password);

    const values = [email,password]

    let query = `INSERT INTO login_data(email,password) VALUES ($1,$2)`

    response.cookie('isLoggedIn',"yes")
    response.cookie('userName',email)
    

    pool.query(query,values,(err,result) =>{

      response.render('home')
    })
});

// GET - index - See all artists
app.get('/artists/', (request, response) => {
  let query = `SELECT * FROM artists`

  pool.query(query,(err,result)=>{
    const data = {
      allArtists: result.rows
    }
    response.render('allArtists',data);
  })
});

// GET - new - Display information of one artist
app.get('artists/new', (request, response) => {
  response.render('new');
});


// GET - show - see a single artist
app.get('/artists/:id', (request, response) => {
  let id = parseInt(request.params.id);
  let query = "SELECT * from artists WHERE id=$1"
  let values = [id]
  pool.query(query, values,(err, res)=>{  
    console.log(res)
    const data = {
    artist: res.rows[0]
    }

    response.render('artist',data);
  })
});

// GET - show - Show editing form of the artist;
app.get('/artists/:id/edit', (request,response)=>{
  let id = request.params.id;
  let query = `SELECT * FROM artists WHERE id=${id}`
  
  pool.query(query,(err,result) =>{
    if(err) {
      console.log("There is an error")
    } else {
      console.log(result.rows)
      const data = {
        artist: result.rows[0]
      }
    response.render('editArtist',data)
    }
  })
})

app.get('/playlists/:id/edit', (request, response) => {
  let query = `
  SELECT random.name, random.id, random.songs_id,songs.title,songs.album,songs.artwork FROM 
  (SELECT playlists.id, playlists.name, playlists_songs.songs_id
  FROM playlists
  INNER JOIN playlists_songs
  ON (playlists.id = playlists_songs.playlists_id)
  WHERE playlists.id=$1 
  ) AS random
  INNER JOIN songs
  ON (songs.id = random.songs_id)
  `
  let query2 = `SELECT * FROM songs`

  const values = [request.params.id]

  pool.query(query,values,(err,result) =>{
    pool.query(query2, (err,result2) =>{
      const data = {
        info: result.rows,
        allSongs: result2.rows
      }
      response.render('editPlaylist',data)
    })
  })
})
// GET - show - Show all songs by an artist 
app.get('/artists/:id/songs', (request,response)=>{
  let id = request.params.id;

  let query = `SELECT * FROM songs where artist_id=${id}`
  pool.query(query,(err,result) =>{
    if(err) {
      console.log("There is an error")
    } else {
      const data = {
        songs: result.rows
      }
      response.render('showSong',data)
    }
  })
})


// GET - index - See all playlists
app.get('/playlists/', (request, response) => {
  let query = `SELECT * FROM playlists`

  pool.query(query,(err,result)=>{
    const data = {
      allPlaylists: result.rows
    }
    response.render('allPlaylists',data);
  })
});

app.get('/playlists/:id/addSong', (request,response) =>{
  console.log("asfjowi")
  let query = `INSERT INTO playlists_songs (playlists_id,songs_id) VALUES ($1,1)`
  const values = [request.params.id];

  pool.query(query,values, (err,result)=>{
    response.redirect(`/playlists/${request.params.id}/edit`);
  })
})

app.get('/playlists/:id', (request, response) => {
  let query = `
  SELECT random.name, random.id, random.songs_id,songs.title,songs.album,songs.artwork FROM 
  (SELECT playlists.id, playlists.name, playlists_songs.songs_id
  FROM playlists
  INNER JOIN playlists_songs
  ON (playlists.id = playlists_songs.playlists_id)
  WHERE playlists.id=$1 
  ) AS random
  INNER JOIN songs
  ON (songs.id = random.songs_id)
  `

  const values = [request.params.id]

  pool.query(query,values,(err,result) =>{
    const data = {
      info: result.rows
    }
    response.render('playlistSongs',data)
  })

})

// POST - create - Create a new artist
app.post('/artists', (request,response) => {
  console.log(request.body);

  let values = [request.body.name, request.body.photo_url, request.body.nationality]
  let query = `INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3) RETURNING *`
  pool.query(query,values,(err,result) =>{
    
  console.log(values)
  response.send("done?")
  });
})

app.put('/playlists/:id',(request,response) =>{
  let playlistID = request.params.id
  let songArray = request.body.songs

  let query1 = `DELETE FROM playlists_songs WHERE playlists_id=$1`
  const values1 = [playlistID];

  let string = "";

  songArray.unshift(playlistID);

  for(let i = 1; i < songArray.length; i++){
    if (i == songArray.length - 1){
      string += `(${songArray[0]},${songArray[i]})`
    } else {
      string += `(${songArray[0]},${songArray[i]}),`
    }
  }

  let query2 = "INSERT INTO playlists_songs (playlists_id,songs_id) VALUES "+string

  pool.query(query1,values1,(err,result)=>{
    pool.query(query2,(err,result2) =>{
      response.redirect('/playlists/' + playlistID)
    })
  })
})



// PUT - update - Update an artist
app.put('/artists/:id',(request,response) => {
  console.log(request.body)
  const id = request.params.id;
  let query = `
  UPDATE artists 
  SET name=$1,
  photo_url=$2,
  nationality=$3
  WHERE id=$4;`

  const name = request.body.name
  const photo_url = request.body.photo_url
  const nationality = request.body.nationality
 
  const values = [name,photo_url,nationality,id]

  pool.query(query,values,(err,result)=>{
    if(err) {
      console.log("Put error")

    } else {
      console.log("edit successful",result.rows)
      response.redirect('/artists/'+id)
    }
  })
})  

app.delete('/playlists/:id/deleteSong', (request,response) =>{
  
  let query1 = `DELETE FROM playlists_songs WHERE playlists_id=$1 AND id IN (SELECT id FROM playlists_songs ORDER BY id DESC LIMIT 1)
  `
  const values = [request.params.id];

  pool.query(query1,values,(err,result) => {
    response.redirect(`/playlists/${request.params.id}/edit`)
  })
})

app.delete('/artists/:id',(request,response) => {
  let id = (request.params.id);

  let query = 
  `DELETE FROM artists 
    WHERE id=$1`

  let query2 = 
  `SELECT * FROM artists`

  const values = [id]

  pool.query(query,values,(err,result)=>{
    pool.query(query2,(err,result2)=>{
      const data = {
        allArtists: result2.rows
      }
      // response.render('allArtists',data)
      response.redirect('/artists/')

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

