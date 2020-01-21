console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jessica',
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
 * Functions
 * ===================================
 */

const addArtistPage = (request, response) => {
    response.render("new");
}
const addArtist = (request,response) =>{
     let text = 'INSERT INTO artists (name, photo_url, nationality) values($1, $2, $3) returning id';
    let values = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(text, values, (err,res)=>{
        if(err){
            console.log(err);
        }
        let id = res.rows[0].id;
        let path = '/artists/'+id;
        response.redirect(path);
    });
}
const showArtist = (request, response)=>{
    let queryText = "Select * FROM artists WHERE id=$1";
    let values = [request.params.id];
    pool.query(queryText,values,(err,res)=>{
        console.log(res.rows[0]);
        if(err){
            console.log(err);
        }else{
        response.render("showArtist",res.rows[0]);
        }
    })
}
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
});

app.get('/new', addArtistPage);
app.post('/', addArtist);
app.get('/artists/:id',showArtist)

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