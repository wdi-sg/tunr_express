console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const jsonfile = require('jsonfile')

// Initialise postgres client
const configs = {
  user: 'dsen',
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


app.get('/index', (request, response) => {

    let sqlText = "SELECT * FROM artists";

    pool.query(sqlText , (error, queryResult)=>{
        if (error){
            console.log("error" , error);
            response.status(500).send('Didn work');
        }else{

            let artistId = queryResult.rows;
            response.render('home', {artists: artistId});
        }
    })

});

//specific artist page
app.get('/index/:id', (request, response) => {

    console.log(request.params.id)

    response.send("specific artist")

    // pool.query(sqlText , (error, queryResult)=>{
    //     if (error){
    //         console.log("error" , error);
    //         response.status(500).send('Didn work');
    //     }else{

    //         let artistId = queryResult.rows;
    //         response.render('home', {artists: artistId});
    //     }
    // })

});


//Create new artist
app.get('/new', (request, response) => {

  response.render('new');
});

app.post('/newArtist' , (request, response)=>{
    console.log("added new artist")
    let newArtistDataObject = request.body

    let sqlText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING ID';

    let values = [newArtistDataObject.name, newArtistDataObject.photo_url, newArtistDataObject.nationality]

    pool.query(sqlText , values,  (error, queryResult)=>{
        if (error){
            console.log("error" , error);
            response.status(500).send('Didn work');
        }else{

            let newArtist = queryResult.rows;
            console.log(newArtist)

            response.render('redirectHome')

        }
    })
})







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
