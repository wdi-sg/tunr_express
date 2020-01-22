/* 
THE ORDER OF YOUR APP GET IS VERY IMPORTANT.
GET THEN POST THEN PUT THEN DELETE.  

Modularize callback functions into another file.
*/ 

console.log("starting up!!");

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

