const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

var queryText;

const configs = {
  user: 'Serene',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

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



////////////////////////////////////////////////// Main Code ///////////////////////////////////////////////////


app.get('/', (request, response) => {
  response.redirect('/artist');
  
});

app.post('/', (request, response) => {
  let name = request.body.name;
  let photoUrl = request.body.photoUrl;
  let nationality = request.body.nationality;
  
  let queryArgu = [name, photoUrl, nationality];

  queryText = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)`;

  pool.query(queryText, queryArgu,(err, result) => {
    if (err) {
      console.log("Oh no, error in POST / : ", err);
    } else {
      // console.log(result.rows);
      response.redirect('/artist');
    }
  })

})

app.get('/artist', (request, response) => {
  queryText = `SELECT * FROM artists;`

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /artist : ", err);
    } else {
      response.render('home', {artists: result.rows})
    }
  })
});



app.get('/artist/new', (request, response) => {
  response.render('new');
  
});

app.get('/artist/:id', (request, response) => {
  let id = parseInt(request.params.id);
  queryText = `SELECT * FROM artists WHERE id = ${id}`;
  
  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /artist/:id : ", err);
    } else {
      response.render('eachArtist', {artist: result.rows})
    }
  })
});


app.put('/artist/:id', (request, response) => {
  let id = parseInt(request.params.id);
  let name = request.body.name;
  let photoUrl = request.body.photoUrl;
  let nationality = request.body.nationality;
  let queryArgu = [id, name, photoUrl, nationality];
  
  queryText = `UPDATE artists SET name=$2, photo_url=$3, nationality=$4 WHERE id=$1`;
  
  pool.query(queryText, queryArgu, (err, result) => {
    if (err) {
      
      console.log("Oh no, error in PUT /artist/:id : ", err);
    } else {
      response.redirect('/');
    }
  })
})

app.delete('/artist/:id', (request, response) => {
  let queryArgu = [parseInt(request.params.id)];

  queryText = `DELETE from artists where id=$1`;

  pool.query(queryText, queryArgu, (err, result) => {
    if (err) {
      console.log("Oh no, error in DELETE /artist/:id : ", err);
    } else {
      response.redirect('/');
    }
  })
})

app.get('/artist/:id/edit', (request, response) => {
  let id = parseInt(request.params.id);
  queryText = `SELECT * FROM artists WHERE id = ${id}`;

  pool.query(queryText, (err, result) => {
    if (err) {
      console.log("Oh no, error in /artist/:id/edit : ", err);
    } else {
      response.render('editArtist', {artist: result.rows})
    }
  })
 });



const server = app.listen(3000, () => console.log('~~~ Supz, tuning in to the waves of port 3000 ~~~'));

let onClose = function(){
  console.log("Closing database~");
  
  server.close(() => {
    
    console.log('Process terminated');
    
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
