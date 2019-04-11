console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'neelaugusthy',
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

app.get('/', (request, response) => {
  response.send('Hello World');
});

//Build the index feature for artists
app.get('/artists', (request, response) => {
  // query database for all artists
    const queryString = 'SELECT * FROM artists ORDER BY id';
  // respond with HTML page displaying all artists
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', result.rows);
            const data = {  artists : result.rows};
            response.render('artists', data);
        }
    });
});

//Build the show feature to view a single artist's page
app.get('/artists/:id', (request, response) => {
  //storing the id value to then use in the database query
    const id = request.params.id;
  // query database for a single artist based on their id
    const queryString = `SELECT * FROM artists WHERE id='${id}'`;
  // respond with HTML page displaying all artists
    pool.query(queryString, (err, result) => {
  //if there is an error have it logged into the terminal
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
  //console log the output into the terminal if all is ok
            console.log('query result:', result.rows);
  //define the data that is to be rendered
            const data = {  artist : result.rows};
  //point to the component which will be used to render the page using the data that is defines in the variable
            response.render('singleArtist', data);
        }
    });
});

//Build the feature to edit a single artist's page
app.get('/artists/:id/edit', (request, response) => {
  //storing the id value to then use in the database query
    const id = request.params.id;
  // query database for a single artist based on their id
    const queryString = `SELECT * FROM artists WHERE id='${id}'`;
  // respond with HTML page displaying all artists
    pool.query(queryString, (err, result) => {
  //if there is an error have it logged into the terminal
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
  //console log the output into the terminal if all is ok
            console.log('GET query result:', result.rows);
  //define the data that is to be rendered
            const data = {  artist : result.rows};
  //point to the component which will be used to render the page using the data that is defines in the variable
            response.render('editArtist', data);
        }
    });
});

app.put ('/artists/:id', (request, response) => {

  //based on the id selected get the current data that has been input into the form into an object to update the database
    const id = request.params.id;
    const object = request.body;
    const name = object.name;
    const nationality = object.nationality;
    const url = object.url;
  //update the database with the new values that have been updated into the form using the app.get above
    const queryString = `UPDATE artists SET name ='${name}', photo_url = '${url}', nationality = '${nationality}' WHERE id = '${id}' RETURNING *;`

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('PUT query result:', result.rows);
            const data = {artist: result.rows};
            response.redirect(`/artists/${result.rows[0].id}`);
        }
    })
});

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new artist
  response.render('new');
});

// post the value from the form to the database
app.post('/new' , (request, response)=> {
    //console log to the terminal that the connection is working
    console.log(request.body);
    //query string to post the form data to the database
    let queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)'; //could use `INSERT ....VALUES (${request.body.name} , ...)`in this case values doesn't need to be defined
    // pushing the query string into the database
    const values = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(queryString,values,(err, result) =>{
        if (err) {
            console.log("Something Went Wrong!!!");
            console.log(err);
            response.send("Huston we have a problem!")
        } else {
            console.log("That worked, well done!");
            // const data = { artist : result.rows[0].id}
            // response.render('singleArtist', data);
            // response.render(`/singleArtist/${result.rows.id}`);
            response.redirect('/artists');
        }
    })
})

app.get('/artists/:id/delete', (request, response) => {

  const id = request.params.id;

  const queryString = `SELECT * FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      const data = { artist: result.rows };
      response.render('deleteArtist', data );
    }
  });
});

app.delete('/artists/:id', (request, response) => {

  const id = request.params.id;

  const queryString =
  `DELETE FROM artists WHERE id='${id}'`;

  pool.query(queryString, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      response.redirect('/artists');
    }
  });
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