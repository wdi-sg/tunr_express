console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'ianfoo',
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
  res.send('HELLO');
});

app.get('/artists', (req, res) => {

    res.render('home');
})


//################# SHOWS ARTIST INFO BASED ON ID selected ###########################################
app.get("/artists/:id", (req, res) => {

    const whenQueryDone = (error, result) => {
        if(error) {
            console.log("ERROR");
            console.log(queryError);
            res.status(500);
            res.send("DATABASE ERROR");
        } else {

            const data = {
            artists: result.rows
        }

        res.render('show', data);
     }

        console.log("THIS ID PATH WORKS!");

    }

    //Allows for a particular artist in the db to be selected.
    let index = parseInt(req.params.id);
    const queryString = "SELECT * FROM artists WHERE id="+index+"";

    pool.query(queryString, whenQueryDone);
})
//########################################################
//########################################################
//############### Creates a new artist in the database #######################################################
app.post("/artists", (req, res) => {
    console.log(req.body);

    const whenQueryDone = (queryError, result) => {
        if(queryError) {
            console.log("ERROR");
            console.log(queryError);
            res.status(500);
            res.send("DATABASE ERROR");
        } else {
            console.log("NEW ARTISTS: " + result.rows[0]);
            res.send("HEY NEW ARTIST IN THE HOUSE::: " + result.rows[0].id);

        }
    }
            const queryString = "INSERT INTO artists(name, photo_url, nationality) VALUES($1, $2, $3) RETURNING *";
            const insertValues = [req.body.name, req.body.photo_url, req.body.nationality];

            pool.query(queryString, insertValues, whenQueryDone);
})


app.get('/new', (req, res) => {
  // respond with HTML page with form to create new pokemon
  res.render('new');
});


//########################################################
//########################################################

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(4000, () => console.log('~~~ Tuning in to the waves of port 4000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);