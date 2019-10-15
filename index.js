console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'eden',
  host: '127.0.0.1',
  database: 'week5',
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
  response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.get('/artists/', (request, response) => {
  let queryText = 'SELECT * FROM artists'
  pool.query(queryText,(err, result)=>{
    if(err){
        console.log("View artist error", err.message);
    } else {
        const data ={
            artistArr: result.rows
        }
        response.render('viewArtists.jsx', data)
    }
  })
});

app.post('/artists',(request, response)=>{
    let name = request.body.name;
    let nationality = request.body.nationality;
    let queryText = `INSERT INTO artists(name,nationality) VALUES ('${name}','${nationality}') RETURNING *`;
    pool.query(queryText,(err,result)=>{
        console.log(result.rows[0])
        let id = result.rows[0]["id"] + "<br>";
        let name = result.rows[0]["name"] + "<br>";
        let nationality = result.rows[0]["nationality"] + "<br>";
        let str = "New artist added:<br>"+id+name+nationality
        response.send(str);
    })
})

app.get('/artists/:id',(request,response)=>{
    let id = request.params.id;
    let queryText = `SELECT * FROM artists WHERE id = ${id}`;
    pool.query(queryText,(err,result)=>{
        const data = {
            artistArr: result.rows
        }
        response.render('selectedArtist.jsx',data)
    })
    // response.send(queryText)
})

app.get('/artists/:id/songs',(request,response)=>{
    let id = request.params.id;
    let queryText = `SELECT title FROM songs WHERE artist_id = ${id};`
    pool.query(queryText,(err,result)=>{
        const data = {
            artistArr: result.rows
        }

        response.render('viewSongs.jsx',data)
    })
    // response.send("Working")
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


//<---------   USING IN   --------->
// let queryText = `SELECT title FROM songs WHERE artist_id IN (SELECT id FROM artists WHERE NAME = 'Yeah Yeah Yeahs');`