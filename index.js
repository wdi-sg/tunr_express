console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'Haruspring',
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
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  response.send('Hello World, it good to be home');
});

//artist path

app.get('/artists', (request, response) => {

  let sqlString = "SELECT * FROM artists";

  pool.query(sqlString,(err,queryResults)=>{
    if (err){
        console.log("artist get err",err);
        response.status(500).send("GG!");
    } else {
        console.log("artist",queryResults.rows)
        response.render('artists',{artists:queryResults.rows});
    }
  })
  // respond with HTML page with form to create new pokemon
   // response.send("ARTISTWORKS");

});

//test one artist
app.get('/artists/:id', (request, response) => {

    let sqlString = "SELECT * FROM artists";



    pool.query(sqlString,(err,queryResults)=>{

    if (err){
        console.log("artist get err",err);
        response.status(500).send("GG!");
    } else {
        //when havent start this var condition is false
        let found = false;
        //start looping to look fot the artist===
        for(var i = 0; i<queryResults.rows.length; i++){

            let inputId = parseInt(request.params.id);

            if(inputId !== queryResults.rows[i].id){

            } else if (inputId === queryResults.rows[i].id ){

                console.log("singleartist",queryResults.rows[i])

                found = true;

                //response.send("SINGLEARTISTWORKS");
                response.render('singleartist',{artists:queryResults.rows[i]});
                break;
            };

        }
        //when come out the loop nothing found let found = false
        if (found === false) {
            response.status(400).send("NOT FOUND");
        }

      }
    })
  // respond with HTML page with form to create new pokemon
});


// app.get('/new', (request, response) => {
//   // respond with HTML page with form to create new pokemon
//   response.render('new');
// });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// server.on('close', () => {
//   console.log('Closed express server');

//   db.pool.end(() => {
//     console.log('Shut down db connection pool');
//   });
// });
