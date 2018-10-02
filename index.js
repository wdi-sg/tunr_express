console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'taras',
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

app.get('/', (req, res) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  res.render('home');
});

app.get('/artists', (request, response) => {

    let sqlText = "SELECT * FROM artists";

    pool.query(sqlText, (error, queryResult) => {
      if (error){
        console.log('error!', error);
        response.status(500).send('DIDNT WORKS!!');
      }else{

         console.log( queryResult.rows[0].name);

        response.render('index', {artists: queryResult.rows} );
      }
    });
});

app.get('/artist/:id', (request, response) => {

    let sqlText = "SELECT * FROM artists";
    let artId = request.params.id;

    pool.query(sqlText, (error, queryResult) => {

        for (var i = 0; i < queryResult.rows.length; i++) {
          // console.log(queryResult.rows[i].id)
  //          console.log(request.params.id)
  if (queryResult.rows[i].id === parseInt(artId)) {

            var foundArtist = queryResult.rows[i];

            console.log(foundArtist)
            response.send(foundArtist)
            }
    };
})
});

app.get('/artists/new', (request, response) => {

    response.render('new');
});

app.post('/artists', (request, response) => {
    console.log( request.body )

    let sqlText = "INSERT INTO artists (name, nationality) VALUES ($1, $2) RETURNING *";

    const values = [request.body.name, request.body.nationality];

    pool.query(sqlText, values, (error, queryResult) => {
      if (error){
        console.log('error!', error);
        response.status(500).send('DIDNT WORKS!!');
      }else{

        let newArtist = queryResult.rows[0].name;
        response.send('Artist added:'+newArtist);
      }
    });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
/*
server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
*/