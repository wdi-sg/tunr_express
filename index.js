console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'kennethyeong',
  password: '11111',
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
app.get('/artists', (request, response) => {
  // respond with HTML page with form to create new pokemon
  let queryString = 'SELECT * from artists';
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        res.send( 'query error' );
    } else {
        console.log('query result:', result);
        response.send(result.rows);
    };
  })
});



//show single artist 
app.get('/artists/:artname', (request, res) => {
  let artname = request.params.artname; //splicing url to give artist name
  let queryString = `SELECT * FROM artists WHERE name = '${artname}'`;
  console.log(queryString)
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    } else {
        let artId = result.rows[0]['id'] //parsing result of first query to artists db in psql
        let queryString = `SELECT * FROM songs WHERE artist_id = '${artId}'`;
        pool.query(queryString, (err, resultsongs) => {
          if (err) {
              console.error('query error:', err.stack);
              res.send( 'query error' );
          }
          //console.log(result.rows[0]['id']);
          console.log('query result:', resultsongs.rows); // printing of song list by artist
          res.render('artists', {list:resultsongs.rows}); 
        });
    }
  });
});
//show all artist
app.get('/', (req, res) => {
  let queryString = `SELECT * FROM artists`
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    }    
    //console.log('query result:', result.rows); 
    res.render('artists', {list:result.rows}); 
  });
});

app.get('/:id', (req, res) => {
  console.log('hiiiii this is /:id '+ parseInt( request.params.id ));
  let artId = parseInt( request.params.id );
  let queryString = `SELECT * FROM songs WHERE artist_id =  '${artId}`;
  pool.query(queryString, (err, result) => {
    if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
    }    
    //console.log('query result:', result.rows); 
    res.render('singleArtist', {list:result.rows}); 
  });
});

app.get('/new', (request, res) => {
  // respond with HTML page with form to create new pokemon
  res.render('new');
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
