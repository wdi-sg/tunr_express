console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
  password: 'postgres'
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

/******Set up express app *******/
app.get('/', (request, response) => {

  response.send("HELLO WORLD");
});

// /****** Artist - The Index Feature *******/
app.get('/artists/', (request, response) => {
  
  
  pool.query('SELECT * FROM artists',(err, queryResult) => {

    //console.log("result", queryResult.rows);

    response.send(queryResult.rows);  
  
  });
});

// /******Artist - The Show Feature *******/
app.get('/artists/:id', (request, response) => {
  
  let id = request.params.id;

  pool.query('SELECT * FROM artists WHERE id='+id,(err, queryResult) => {

    //console.log("result", queryResult.rows);

    response.send(queryResult.rows);  
  
  });
});
/*****************Artist - The Create Feature*************/
app.get('/artists/new', (request,response)=> { 

  //response.send(request.body);

  response.render('new_artist');

});
/*****************Artist - The Create Feature*************/
app.post('/artists', (request, response) => {
  
  //console.log(request.body);
  let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
  const values = [request.body.name, request.body.photo_url, request.body.nationality];
  pool.query(queryText, values, (err, res) => {

    response.send(request.body);
    
  });  
});

/************************Artist - The Edit Feature***************************/
app.get('/artists/:id/edit', (request,response) =>{

  let id = request.params.id;

  pool.query('SELECT * FROM artists WHERE id='+id,(err, queryResult) => {

    console.log("result", queryResult.rows);

    response.render('edit_artist',{artist: queryResult.rows[0]});
});
});

app.put('/artists/:id', (request,response) => {

  let id = request.params.id;
  let queryText = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4';
  const values = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id];
  pool.query(queryText, values, (err, queryResult) => {
    
    //response.send(queryResult);
    response.redirect('/artists/' + id);
    
  });
});
/************************Artist - The Delete Feature***************************/
app.delete('/artist/delete/:id', (request,response) => {

  
  let id = request.params.id;
  let queryText = `DELETE FROM artists WHERE id=$1`;
  let values = [request.params.id];

  pool.query(queryText, values, (err,queryResult) => {

    response.redirect('/artists');

  });
});

// /******Songs - The Index Feature *******/
app.get('/songs', (request, response) => {
  
  
  pool.query('SELECT * FROM songs',(err, queryResult) => {

    //console.log("result", queryResult.rows);

    response.send(queryResult.rows);  
  
  });
});

// // /******Songs - The Show Feature *******/
// app.get('/songs/:id', (request, response) => {
  
//   let id = request.params.id;

//   pool.query('SELECT * FROM songs WHERE id='+id,(err, queryResult) => {

//     //console.log("result", queryResult.rows);

//     response.send(queryResult.rows);  
  
//   });
// });

/*****************Songs - The Create Feature*************/
app.get('/song/new', (request,response)=> { 

  //response.send(request.body);

  response.render('new_song');

});
/*****************Songs - The Create Feature*************/
app.post('/song', (request, response) => {
  
  //console.log(request.body);
  let queryText = 'INSERT INTO songs (title, album, preview_link,artwork) VALUES ($1, $2, $3, $4) RETURNING id';
  const values = [request.body.title, request.body.album, request.body.preview_link,request.body.artwork];
  pool.query(queryText, values, (err, res) => {

    response.send(request.body);
    
  });  
});

/************************Songs - The Edit Feature***************************/
app.get('/songs/:id/edit', (request,response) => {

  let id = request.params.id;

  pool.query('SELECT * FROM songs WHERE id='+id,(err, queryResult) => {

    console.log("result", queryResult.rows);

    response.render('edit_song',{song: queryResult.rows[0]});
});
});

app.put('/songs/:id', (request,response) => {

  let id = request.params.id;
  let queryText = 'UPDATE songs SET title=$1, album=$2, preview_link=$3, artwork=$4  WHERE id=$5';
  const values = [request.body.title, request.body.album, request.body.preview_link,request.body.artwork, request.params.id];
  pool.query(queryText, values, (err, queryResult) => {
    
    //response.send(queryResult);
    response.redirect('/songs/' + id);
    
  });
});

/************************song - The Delete Feature***************************/
app.get('/song/delete/:id', (request,response) => {

  
  let id = request.params.id;
  let queryText = `DELETE FROM songs WHERE id=$1`;
  let values = [request.params.id];

  pool.query(queryText, values, (err,queryResult) => {

    response.redirect('/songs');

  });
});
//// Delete doesnt work when app.delete is used but works when app.get is used /////////////


/************************artist/id/songs ****************************/

app.get('/songs/:id', (request, response) => {
  
  let id = request.params.id;

  pool.query('SELECT * FROM songs WHERE id='+id,(err, queryResult) => {

    console.log("result", queryResult.rows);

    response.send(queryResult.rows);  
  
});
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// let onClose = function(){
  
//   console.log("closing");
  
//   server.close(() => {
    
//     console.log('Process terminated');
    
//     pool.end( () => console.log('Shut down db connection pool'));
//   })
// };

// process.on('SIGTERM', onClose);
// process.on('SIGINT', onClose);
