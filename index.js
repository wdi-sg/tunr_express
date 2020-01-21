console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jasminelee',
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

  response.send("HELLO WORLD!");
  
});
// Define a route with view defined at /. For now it should say Hello World when you visit that url.

const newArtist = (request,response) => {
  response.render("new");
}

const addArtist = (request,response) => {
  const insertQueryText = 'INSERT into artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
  const values = [
    request.body.name,
    request.body.photo_url,
    request.body.nationality
    ]
    
    pool.query(insertQueryText, values, (err, result)=>{
      console.log("INSERTED INTO DATABASE")

      if(err){
        console.log("ERRRRORRRR" , err);
        response.send("error");
      }
      else{
        console.log("DONE",result.rows);
        response.redirect('/');
      }
});

};
app.get('/artists/new', newArtist);
app.post('/artists' , addArtist);
// Build a feature that creates a new artist in the database.





const findArtist = (request,response) => {

  let query = "SELECT * FROM artists WHERE id=" + request.params.id;
  pool.query(query,(err,result)=>{
    if(err){
      console.log("ERROR",err);
      response.status(500).send("error");
    }
    else{
      console.log("RESULTS");
      console.log(result.rows);
      let data = result.rows[0];
      response.render("artists", data);
      
    }
  })

}
app.get('/artists/:id',findArtist);




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
