console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'mohammadasshikin',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432
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

let home = (request,response)=>{
    let showAll = "SELECT * FROM artists";
    pool.query(showAll, (err,result)=>{
        if(err){
            console.log("query error",err.stack);
            response.send('query error');
        }
        else{
            let data = {
                result: result.rows
            }
            console.log(data);
            response.render('home',data);
        }
        // console.log("query result", result);
        // response.send(result.rows);
        // for( let i=0; i<result.rows.length; i++ ){
            // console.log(`Id: ${result.rows[i].id}. Name: ${result.rows[i].name}. PhotoUrl: ${result.rows[i].photo_url}. Nationality: ${result.rows[i].nationality}.`);
            // response.send(`Id: ${result.rows[i].id}. Name: ${result.rows[i].name}. PhotoUrl: ${result.rows[i].photo_url}. Nationality: ${result.rows[i].nationality}.`);
        // }

    });
}

app.get('/homepage', home);

app.get('/', (request, response) => {
    // query database for all pokemon
    console.log("HELLO WORLD");
    response.send("HELLO WORLD");
    // respond with HTML page displaying all pokemon
    // response.render('home');
});

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = 3008;
const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);