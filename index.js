console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jonathanlau',
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
  response.render('home');
});

//index page
app.get('/artists', (request, response) => {
    //console.log(request.body);

    let sqlText = "SELECT * FROM artists";

    pool.query(sqlText, (error, queryResult) => {
        if (error){
            console.log('Error: ', error);
            response.status(500).send('Didnt work!');
        }
        else {
            console.log('Query results: ', queryResult.rows);
            response.render('index',  {artist: queryResult.rows});
        }
    })
})


//show page
app.get('/artists/:id', (request, response) => {
    console.log('REQUEST.PARAMS ID FOR SHOW: ',request.params.id);
    let parseId = [request.params.id];
    let sqlText = "SELECT * FROM artists WHERE id = ($1)"; //to avoid SQL injection: https://stackoverflow.com/questions/41168942/how-to-input-a-nodejs-variable-into-an-sql-query

    pool.query(sqlText, parseId, (error, queryResult) => {
        if (error){
            console.log('Error: ', error);
            response.status(500).send('Didnt work!');
        }
        else {
            console.log('Query results: ', queryResult.rows);
            response.render('show',  {artist: queryResult.rows});
        }
    })

})

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

server.on('close', () => {
  console.log('Closed express server');

  db.pool.end(() => {
    console.log('Shut down db connection pool');
  });
});
