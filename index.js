/*===========================================
//===========================================
//===========================================
//===========================================
//===========================================
//===========================================
//===========================================
//===========================================
//===========================================
============================================*/

console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');


// Initialise postgres client
const configs = {
  user: 'siangeeeo',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};
const client = new pg.Client(configs)
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
app.use(express.urlencoded({ //allows us to use request.body;
  extended: true
}));

app.use(express.static('public'));
app.use(express.static(__dirname+'/public/'));

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

//DUMMY DIRECTORY:
app.get('/', (request, response)=>{
  // respond with HTML page displaying all stuff?
  response.render('home');
});

//HOME DIRECTORY THAT SHOWS ALL ARTISTS:
app.get('/artists', (request, response)=>{
  //respond with HTML page to display all stats about artists
  const queryString = 'SELECT * from artists';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
   //   console.log('query resulttttttt:', result.rows);
      const data = {artists: result.rows};
      response.render('artists', data);
    }
  });
});

//VIEW SINGLE ARTIST:
app.get('/artist/:id', (request, response)=>{
  let artistId = parseInt(request.params.id);

  const queryString = "SELECT * FROM artists WHERE id=" + artistId;

  pool.query(queryString, (err, result)=>{
    if (err){
      console.error('query error:', err.stack);
    }else{
      console.log('query resulttt:', result.rows);
      const data = {artist: result.rows};
      response.render('artist',data);
    };
  });
});

//CREATE NEW FORM TO ADD ARTIST:
app.get('/new', (request, response) => {
  // respond with HTML page with form to create new page
  response.render('new');
});

app.post('/artists',(request, response)=>{
  console.log("Printing request body: "+request.body);
  let newArtist = request.body;
   //console.log("Printing out newArtist.id: "+newArtist.id);
   console.log("Printing out newArtist.name: "+newArtist.name);
   console.log("Printing out newArtist.photo_url: "+newArtist.photo_url);
   console.log("Printing out newArtist.nationality: "+newArtist.nationality);

    console.log("about to do queryString for new Artist");

   let queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${newArtist.name}', '${newArtist.photo_url}', '${newArtist.nationality}') RETURNING *`;
    console.log("queryString for adding new artist into DB is done");

    //console.log("values for adding new artist into DB is done");

   pool.query(queryString, (err, result)=>{
     console.log("running client query now");
     if (err) {
       console.error('query error:', err.stack);
       response.send('query error');
     } else {
    //   console.log('query resulttttttt:', result.rows);
      console.log(`Added ${result.rows[0].name} into artists DB`);
       console.log(`Added ${newArtist.name} into artists DB`);
       response.redirect(`/artists`);
     }
   });
 });

//EDIT EXISTING ARTIST:
app.get(`/artist/:id/edit`,(request, response)=>{
  let artistId = parseInt(request.params.id);

  let queryString = `SELECT * from artists WHERE id = ${artistId}`;
  pool.query(queryString, (err, result)=>{
    if (err){
      console.error('query error:', err.stack);
    }else{
      console.log('query resulttt:', result.rows);
      const data = {artistId: result.rows};
      response.render('edit',data);
      console.log("Done with passing from artist/edit to the render form");
    };
  });
});

app.put(`/artist/:id`,(request, response)=>{
   console.log("this is request body:",request.body);
   let artistId = parseInt(request.params.id);
   let editArtist = request.body;
   // console.log(`Printing out editArtist[0].name: ${editArtist[0].name}`);
   // console.log(`Printing out editArtist.name: ${editArtist.name}`);
   console.log(`Printing out editArtist.name: ${editArtist.name}`);

   let queryString = `UPDATE artists SET name='${editArtist.name}', photo_url='${editArtist.photo_url}', nationality='${editArtist.nationality}' WHERE id=${artistId} RETURNING *`;

   pool.query(queryString, (err, result)=>{
     if (err){
       console.error('query error:', err.stack);
     }else{
       console.log('query resulttt:', result.rows);
       const data = {artist: result.rows};
       response.render('artist',data);
     };
   });
});

//DELETE EXISTING ARTIST:
app.get('/artist/:id/delete', (request, response)=>{
  let artistId = parseInt(request.params.id);
  let queryString = `SELECT * from artists WHERE id = ${artistId}`;
  pool.query(queryString, (err, result)=>{
    if (err){
      console.error('query error:', err.stack);
    }else{
      console.log('query resulttt:', result.rows);
      const data = {artistId: result.rows};
      response.render('delete',data);
      console.log("Done with passing data from artist/;id/delete to the delete render form");
    };
  });
});

app.delete(`/artist/:id`, (request, response)=>{
   console.log("this is request body:",request.body);
   let artistId = parseInt(request.params.id);
   let queryString = `DELETE FROM artists WHERE id=${artistId} RETURNING *`;
   pool.query(queryString, (err, result)=>{
     if (err){
       console.error('query error:', err.stack);
     }else{
       console.log(`query resulttt has been deleted: ${result.rows[0].name}`, result.rows);
       response.redirect(`/artists`);
     };
   });
})



/**
 * ===================================
 * Listen to requests on port 3002
 * ===================================
 */
const server = app.listen(3002, () => console.log('~~~ Tuning in to the waves of port 3002 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
