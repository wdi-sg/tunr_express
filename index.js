console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'shane',
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


    // code to view table



/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
    response.redirect('/artists/');
})

app.get('/artists/', (request, response) => {
  // query database for all pokemon
    let text = "SELECT * FROM artists";

    pool.query(text,viewArtists = (err, result) => {
        if(err){
            console.log("there is an err");
            console.log(err);
        }else{
        console.log("viewing list...");
        let data = {
            artists: result.rows
        }
        // respond with HTML page displaying all artists
        response.render('home', data);
        }
    })

});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artists
  response.render('new');
});

app.post('/artists', (request, response) => {

let string = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)";

value = [request.body.name, request.body.photo_url, request.body.nationality];

console.log(request.body);

whendone = (err, result) => {
    if(err){
        console.log(err);
        console.log("there is an error");
    }else{
    console.log("++++++++++++++++++++");
    console.log("Succeeded");
    response.redirect("/artists/");
    }

}

    pool.query(string, value, whendone)
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