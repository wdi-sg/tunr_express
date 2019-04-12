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

const SALT = 'batman';
const sha256 = require('js-sha256');
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')

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

app.use(cookieParser());

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

//HOME DIRECTORY THAT SHOWS ALL ARTISTS:
app.get('/', (request, response)=>{
  //respond with HTML page to display all stats about artists
  let queryString = 'SELECT * from artists';

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
   //   console.log('query resulttttttt:', result.rows);
      let data = {artists: result.rows};
      response.render('home', data);
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
  // respond with HTML page with form to create new page to add an artist;
  response.render('new');
});

app.post('/',(request, response)=>{
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
       response.redirect(`/`);
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
       // console.log('query resulttt:', result.rows);
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
      console.log("Done with passing data from artist/:id/delete to the delete render form");
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
       console.log(`query resulttt has been deleted: ${result.rows[0].name}`);
       response.redirect(`/`);
     };
   });
})

//GET AND DISPLAY ALL SONGS TIED TO AN ARTIST:
app.get(`/artist/:id/songs`, (request,response)=>{
  let artistId = parseInt(request.params.id);
  let queryString = `SELECT * FROM songs WHERE artist_id = ${artistId}`;
  pool.query(queryString, (err, result)=>{
    if (err){
      console.error('query error:', err.stack);
    }else{
      // console.log('query resulttt:', result.rows);
      let data = {artistId: result.rows};
      response.render('songs',data);
      console.log("Done with passing data from artist/:id/songs to the songs render form");
    };
  });
});

app.get(`/artist/:id/songs/new`, (request,response)=>{
  let artistId = parseInt(request.params.id);
  response.render('new-song', {id: artistId});
})

app.post(`/artist/:id/songs`, (request,response)=>{
  let artistId = parseInt(request.params.id);
  // console.log("Printing request body for adding new song: "+request.body);
  let newSong = request.body;
  // console.log("Printing out newSong.title: "+newSong.title);
  // console.log("Printing out newSong.album: "+newSong.album);
  // console.log("Printing out newSong.preview_link: "+newSong.preview_link);

   console.log("about to do queryString for new Song");

  let queryString = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ('${newSong.title}', '${newSong.album}', '${newSong.preview_link}','${newSong.artwork}', '${artistId}') RETURNING *`;
   console.log("queryString for adding new Song tied to artist into DB is done");

   //console.log("values for adding new artist into DB is done");

  pool.query(queryString, (err, result)=>{
    console.log("running client query for adding new song for now...");
    if (err) {
      console.error('query error:', err.stack);
      response.send('query error');
    } else {
   //   console.log('query resulttttttt:', result.rows);
      console.log("printing reslt.rwsss from adding new song: "+result.rows);
      console.log(`Added ${result.rows[0].title} into songs DB`);
      console.log(`Added ${newSong.title} into songs DB`);
      response.redirect(`/artist/${artistId}/songs`);
    }
  });
});

app.get(`/register`, (request, response)=>{
  response.render('register');
});

app.post(`/register`, (request, response)=>{
  console.log(`Printing out the name from register: ${request.body.name}`);

  let query = 'INSERT INTO users (name, password, email) VALUES ($1, $2, $3)';

  //we insert into the database a hashed version of the user registered pw + secret word
  let hash = sha256(request.body.password + SALT);

  const values = [request.body.name, hash, request.body.email];

  pool.query(query, values, (errorObj, result) => {

      if (errorObj) {
          console.log("SOMETHING WENTTT WRONGG");
          console.log(errorObj);
      }
      console.log("query done");
  response.redirect(`/`);
  });
});

app.get('/login', (request, response) => {
    response.render('login');
});

app.post('/login', (request, response)=>{
  console.log("printing out the request.bodyddddd: "+request.body);

  let query = `SELECT * FROM users WHERE name= "${request.body.name}"`;

  pool.query(query, (errorObj, result) => {
      console.log("RESULT OF QUERRYYY: " + result.rows);
      if (result.rows.length >= 1) {
          // name is correct
          const user = result.rows[0];
          //hash the password supplied by user at login with sha256, together with a SALT secret word
          let hash = sha256(request.body.password + SALT);
          // so if the hash supplied by the user is the same as the password in the data base, then...
            if (hash === user.password) {
                // password is correct
                let hash = sha256(SALT + user.name);
                  response.cookie('username', user.name);
                  response.cookie('loggedIn', hash);
                  response.send('you are who u say u are');
              } else {
                  response.send('password was wrong');
              }
          } else {
              response.send('didnt find one');
          }
      });
  });



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
