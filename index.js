console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'Admin',
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
  const queryString = 'SELECT * FROM artists ORDER BY id';
  console.log(queryString)
  // query database for all pokemon
   pool.query(queryString, (errorObj, result) => {


    // errorObj is not null if there's an error
    if (errorObj === undefined) {
      console.log ('query results:', result.rows);
      const data = {artists : result.rows};
      response.render('artists', data);
    } else {

      console.error('query error:', errorObj);
      response.send( 'query error' );

    }
  });

});


app.get('/songs/:id', (req, res)=>{
  
  const id = req.params.id;
  const querystring = 'SELECT * FROM songs';
  
  pool.query(querystring, (errorObj, result)=> {
    if (errorObj===undefined) {
      const data = {songs : result.rows};
      res.render('songs', data);
    } else {
      console.error('query error', errorObj);
      response.send('query error');
    }

  });
});




app.get('/artists/song/:id', (request, response) => {
  const id = request.params.id;
  const queryString = `SELECT * FROM artists WHERE id=${id}`;
  console.log(queryString)
  // query database for all pokemon
   pool.query(queryString, (errorObj, result) => {


    // errorObj is not null if there's an error
    if (errorObj === undefined) {
      console.log ('query results:', result.rows);
      const data = {artists : result.rows};
      response.render('artists', data);
    } else {
      console.error('query error:', errorObj);
      response.send( 'query error' );

    }
  });

});






  // respond with HTML page displaying all pokemon
//   response.render('home');
// });

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){
  
  console.log("closing");
  
  server.close(() => {
    
    console.log('Process terminated');
    
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
