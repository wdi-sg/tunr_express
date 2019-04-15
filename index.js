console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'andrew',
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

app.get ('/artists', (request, response)=> {

    let queryAll = 'SELECT * FROM artists';

    // Query into PostGres to find all artists
    pool.query(queryAll, (err, result) => {
        if (err === undefined ) {

            let requestedQueryAll = {stuff: result.rows};
            console.log(result.rows);
            response.render ('home', requestedQueryAll);
            } else {
            console.error ('query error:', errorObj.stack);
            response.send('query error');
        }
    })
});

// Get a specified artist's details by ID
app.get('/artist/:id', (request, response) => {
    let artistId = request.params.id;
    console.log(artistId);

    let query = 'SELECT * FROM artists WHERE id ='+ artistId;


// Quering into PostGres
    pool.query(query, (err,result)=>{
    if (err === undefined ) {
      let requestedQuery = {stuff: result.rows}
      // const data = {  students : result.rows};
      response.render( 'home', requestedQuery );
    } else {
      console.error('query error:', errorObj.stack);
      response.send( 'query error' );
        }

    })
});

app.get('/artist/new', (request, response) => {
  // Respond with HTML page with form to create new pokemon
  let createArtist = '<h1>Submit new artist</h1>' +

                    '<form method = "POST" action = "/newArtist">' + 'ID: <input type = "number" name = "id" min = "6" max = "50">' +

                    '<br>'+'<br>'+

                    'Name:<input type="text" name="name">'+

                    '<br>'+'<br>'+

                    'Image:<input type="file" name="img" accept="image/*">'+

                    '<br>'+'<br>'+

                    'Name:<input type="text" name="name">' +

                    '<br>'+'<br>'+

                    '<input type="submit" value="Submit">'
                    '</form>';

  response.render('new');
});

app.post ('/artists', function (request, response) {

    let queryText = 'INSERT INTO artists (id, name, photo_url, nationality) VALUES ($1, $2, $3, $4) RETURNING i'

    pool.query (query, (err,result) => {
    if (err === undefined ) {
      let requestedQuery = {stuff: result.rows}
      // const data = {  students : result.rows};
      response.render( 'new', requestedQuery );
    } else {
      console.error('query error:', errorObj.stack);
      response.send( 'query error' );
        }

    });
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