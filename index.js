console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'nausheen',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
 //Configurations and set up
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

// Routes

//welcome page
app.get('/', (request, response) => {

  response.render('home');
});

//display all arists
app.get('/artists/',(request,response)=>{
    const queryString = 'SELECT name from artists';
    pool.query(queryString, (err, indexResult) => {

      if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
      } else {
        console.log('query result:', indexResult);
        response.send(indexResult.rows);
        /*const indexData = {
            artists: response.rows
        };
        response.render('index',indexData);*/


      }
    })

});

//create form for adding new artist
app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new song
  response.render('new');
});

//collect form data and add to DB
app.post('/artists',(request,response)=>{
    const query = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
    const insertValues = [request.body.name, request.body.photo_url,request.body.nationality];
    pool.query(query,insertValues,(aerr, addResult)=>{
        if (aerr) {
            console.error('query error:', aerr.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', addResult);
            response.send(addResult.rows);
        }

    })

});


// Listen to requests on port 3000

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