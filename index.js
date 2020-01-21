const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'robertkolsek',
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
  response.render('home');
});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artists', (req,res) =>{

  const newArtist = [
    req.body.name,
    req.body.photo_url,
    req.body.nationality]

    const queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *'

  pool.query(queryText, newArtist, (err, result) =>{

    if (err) {
      console.log ("error", err.message)
    } else {
      console.log(result.rows)
      res.send("YAY")

    }
    //query end
  })
  //request end
})

app.get('/artists/:id', (req,res) => {

    const id = req.params.id
    const queryText = "SELECT * FROM artists WHERE id='"+id+"'"

    pool.query(queryText, (err,result) => {

      if (err) {
        console.log ("error", err.message)
      } else {
        res.render('show-artist', result.rows[0])
  
      }
    })

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
