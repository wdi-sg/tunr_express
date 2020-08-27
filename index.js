console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'aurelialim',
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

//CREATE NEW ARTIST!
//GET NEW ARTIST FORM:
//get form for submitting new recipe
app.get("/artist/new",(req,res)=>{
    res.render('new')
})

//Post user input
app.post("/artists",(req,response) =>{
    console.log(req.body);
    let values =[req.body.name,req.body.photo,req.body.nationality];
    let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES($1,$2,$3) RETURNING *';
    pool.query(queryText,values,(err,res)=> {
        if(err){
            console.log(err, "error at query")
        }else{
            response.send("Successfully added new artist:  " + values[0]);
        }
    })
})

//DISPLAY SINGLE ARTIST
app.get("/artist/:id",(req,response)=>{
    let id = parseInt(req.params.id);
    let queryText = `SELECT * FROM artists WHERE id=${id}`;
    pool.query(queryText,(err,res)=>{
        if(err){
            console.log(err,"error at query")
        } else{
            let obj = res.rows[0]
            response.render("artist",obj);
        }
    })
})

//DISPLAY ALL ARTIST
app.get("/artists/",(req,response)=>{
    let queryText = 'SELECT name,id FROM artists';
    pool.query(queryText,(err,res)=>{
        if(err){
            console.log(err,"error at query")
        } else{
            let obj = res.rows;
            response.render('artists', obj);

        }
    })
})

//DISPLAY ALL SONGS IN ARTIST
app.get("/artist/:id/songs",(req,response)=>{
    let id = req.params.id
    let query = `SELECT name FROM artists WHERE id =${id}`;
    pool.query(query,(err,result)=>{
        if(err){
            console.log(err,"error at query")
        } else{
            let artist = result.rows[0];

    let queryText = `SELECT title FROM songs WHERE artist_id ='${id}'`;
    pool.query(queryText,(err,res)=>{
        if(err){
            console.log(err,"error at query")
        } else{
            let songs = res.rows;
            response.render('artistsongs',{"songs": songs, "artist": artist})
        }
    })
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