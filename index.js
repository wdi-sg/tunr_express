console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'eunicelok',
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
.*. =================================
 * ┬┌┐┌┬┌┬┐┬┌─┐┬      ┬─┐┌─┐┬ ┬┌┬┐┌─┐
 * │││││ │ │├─┤│      ├┬┘│ ││ │ │ ├┤
 * ┴┘└┘┴ ┴ ┴┴ ┴┴─┘    ┴└─└─┘└─┘ ┴ └─┘
.*. ==================================
*/

app.get('/', (request, response) => {
    response.render('home');
});

/**
 * =================================================
 * ┌─┐┌─┐┌┬┐       ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┌─┐┌─┐┬─┐┌┬┐
 * │ ┬├┤  │   ───  │  ├┬┘├┤ ├─┤ │ ├┤   ├┤ │ │├┬┘│││
 * └─┘└─┘ ┴        └─┘┴└─└─┘┴ ┴ ┴ └─┘  └  └─┘┴└─┴ ┴
 * ==================================================
 */

//Display the form for a single artist
//Build a feature that creates a new artist in the database.
//path working
app.get('/artists/new', (request, response) => {
    response.render('new');
});

/**
 * ===================================
.*.┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐
.*.│  ├┬┘├┤ ├─┤ │ ├┤
.*.└─┘┴└─└─┘┴ ┴ ┴ └─┘
 * ===================================
 */

//Receives data from CREATE FORM and update into DB
//path working
app.post('/artists', (request, response) => {

  let insertQueryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';

  const values = [
    request.body.name,
    request.body.photo_url,
    request.body.nationality
  ];

  pool.query(insertQueryText, values, (err, result)=> {
    console.log("INSERT query callback");

    if( err ) {
      console.log("ERREEERRRRRR", err);
      response.send("errorr")
    } else {
        console.log("DONE", result.rows, 'You have added ' + request.body.name);
        const newlyAdded = {
            name: request.body.name,
            photo_url: request.body.photo_url,
            nationality: request.body.nationality
        };
      const data = {
        newArtist : newlyAdded
      };
      // response.send("we're done, you manage to add " + request.body.name);
      response.render('createdNew', data);
    }
  });
});


/**
 * ===================================
.*.┌─┐┬ ┬┌─┐┬ ┬  ┌─┐┌─┐┌─┐┌┬┐┬ ┬┬─┐┌─┐
.*.└─┐├─┤│ ││││  ├┤ ├┤ ├─┤ │ │ │├┬┘├┤
.*.└─┘┴ ┴└─┘└┴┘  └  └─┘┴ ┴ ┴ └─┘┴└─└─┘
 * ===================================
 */

//Build the show feature for an artist
//path working
app.get('/artists/:id',(request, response)=>{
  let query = "SELECT * FROM artists WHERE id=$1";
  let value = [parseInt(request.params.id)];
  pool.query(query,value, (err, result) => {
    if(err){
        console.log("ERRRR", err);
        response.status(500).send("error")
    } else {
        console.log("RESULT")
        console.log( result.rows);
        let artist = result.rows;
        const data = {
            selectedArtist: artist[0]
    };
      // response.send(result.rows);
      response.render('show', data);
    }
    })
});



/**
 * =============================================================================
.*. ┌┬┐┬┌─┐┌─┐┬  ┌─┐┬ ┬  ┌─┐┌─┐┌┐┌┌─┐┌─┐  ┌─┐┌─┐┬─┐  ┌┬┐┬ ┬┬┌─┐  ┌─┐┬─┐┌┬┐┬┌─┐┌┬┐
.*.  │││└─┐├─┘│  ├─┤└┬┘  └─┐│ │││││ ┬└─┐  ├┤ │ │├┬┘   │ ├─┤│└─┐  ├─┤├┬┘ │ │└─┐ │
.*. ─┴┘┴└─┘┴  ┴─┘┴ ┴ ┴   └─┘└─┘┘└┘└─┘└─┘  └  └─┘┴└─   ┴ ┴ ┴┴└─┘  ┴ ┴┴└─ ┴ ┴└─┘ ┴
 * =============================================================================
 */

app.get('/artists/:id/songs',(request, response) => {
  // let query = "SELECT * FROM "+tableName;
    let query = "SELECT * FROM artists WHERE id=$1";
    let value = [parseInt(request.params.id)];
    pool.query(query, value, (err, result) => {
        if (err) {
            console.log("ERRRR", err);
            response.status(500).send("error")
        } else {
      // if result is not empty
                let artist_id = result.rows[0].id;
                let songsQuery = "SELECT * FROM songs WHERE artist_id="+artist_id;
                pool.query(songsQuery, (songsErr, songsResult) => {
                    console.log( "SONGSSSSS",songsResult);
                    console.log("RESULT")
                    let songs = '';
                    for ( let i = 0; i < songsResult.rows.length; i++) {
                        let songName = songsResult.rows[i].title;
                        console.log(songName + " hey this is songName!!!!!");
                        songs = songs + " , " +  songName;
                        console.log("hey is songs!!!!");
                    }
                    console.log(songsResult + " hey this is songsResultyeehaw");
                    console.log(result.rows[0].name + " hey this is result dot rows dot name yo"); //returns the selected artist
                    console.log(songs);
                    let songList = songsResult.rows;
                    const data = {
                        song: songList
                    }
                    response.render('displaySongsForArtist', data);
                });
        }
    })
});


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