console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'shane',
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


    // code to view table



/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
    response.redirect('/artists/');
})

app.get('/artists/', (request, response) => {
  // query database for all pokemon
    let text = "SELECT * FROM artists";

    pool.query(text,viewArtists = (err, result) => {
        if(err){
            console.log("there is an err");
            console.log(err);
        }else{
        console.log("viewing list...");
        let data = {
            artists: result.rows
        }
        // respond with HTML page displaying all artists
        response.render('home', data);
        }
    })

});

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new artists
  response.render('new');
});

app.post('/artists', (request, response) => {

    let addQuery = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    addForm = [request.body.name, request.body.photo_url, request.body.nationality];

    whendone = (err, result) => {
        if(err){
            console.log(err);
            console.log("there is an error when creating new artist");
        }else{
        console.log("++++++++++++++++++++");
        console.log("Succeeded");
        console.log(result.rows[0].id)
        response.redirect("/artists/" + result.rows[0].id);
        }

    }

    pool.query(addQuery, addForm, whendone)
});

app.get('/artists/:id', (request, response) => {
    let artistID = request.params.id

    let findArtist = "SELECT * FROM artists WHERE id =" + artistID;
    console.log(artistID);

    let whenQuerydone = (err, result) => {
        if(err){
            console.log("/////////////////////");
            console.log(err);
            console.log("/////////////////////");
        }else{
            console.log("-------------");
            console.log("Artist found!");
            console.log(result.rows[0].id);

            const showData = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                photo_url: result.rows[0].photo_url,
                nationality: result.rows[0].nationality
            }
            response.render("show",showData)
        }
    }
    pool.query(findArtist, whenQuerydone);
    // response.send("This page is viewing : " + artistID);
});

app.get('/playlists/new', (request, response) => {
    console.log("loading new playlist page");
    response.render('newplaylist');
});

app.get('/playlists', (request, response) => {

});

app.get('/register', (request, response) => {
    console.log("opening register page");

    response.render('register');
})

app.post('/register', (request,response) => {
    console.log("Receiving account details...");
    console.log(request.body.username);
    console.log(request.body.password);

    let registerQuery = "INSERT INTO users (username, password) VALUES ($1, $2) return *";

    let registerInput = [request.body.username,request.body.password];
    let whendone = (error, result) => {
        if(error){
            console.log(error);
            console.log("Failed to query registration")
        }else{
            response.send('account information received!');
        }
    }
    pool.query(registerQuery,registerInput, whendone);

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