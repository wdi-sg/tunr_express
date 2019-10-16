console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'kellylim',
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

//==== See all the artists =====

app.get('/artists/', (request, response) => {

    const queryString = 'SELECT * from artists';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.message);
            response.send( 'query error' );
        } else {
            console.log('query result:', result);
            response.send( result.rows );
  }
});
});


//==== Display the form for a single artist =====

app.get('/artists/new', (request, response) => {


  response.render('new');
});


//====== Create a new artist ==========

app.post('/artists/', (request,response) => {

    let text = 'INSERT INTO artists (name,photo_url,nationality) VALUES($1,$2,$3) RETURNING *';
    let values = [request.body.name,request.body.photo_url,request.body.nationality];
    pool.query(text, values, (err, result) => {

        if (err) {
            console.log(err);
            response.send("query error");

        } else {
            let data = {
                artists : result.rows[0]
            };
            response.send( result.rows );
            // response.render('home', data);
        }
        });
});

//====== See a single artist ==========

app.get('/artists/:id', (request,response) => {

    const queryString = 'SELECT * FROM artists WHERE id =' + request.params.id;
    console.log("REQUEST PARAAAAMS " + request.params.id);
    pool.query(queryString, (err,result) => {

    if (err) {
            console.log(err);
            response.send("query error");

        } else {
            let data = {
                artists : result.rows[0]
            };
            response.send( result.rows );
        }
    })

});

//======== Display the form for editing a single artist ==========

app.get('/artists/:id/edit', (request, response) => {

    const id = request.params.id;
    const queryString = 'SELECT * FROM artists WHERE id =' + request.params.id;

    pool.query(queryString, (err,result) => {
        if (err) {
            console.log('error', err.message);
            response.send('query error');
        } else {
            const data = {
                artist : result.rows[0]
            };
            response.render('edit', data);
        }
})
});


//======== Update an Artist ==========

app.put('/artists/:id/', (request,response) => {

    let id = parseInt(request.body.id);
    let name = request.body.name;
    let photo_url = request.body.photo_url;
    let nationality = request.body.nationality;

    const values = [name, photo_url, nationality];
    const queryString = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=" + request.params.id;

    // const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (err,result) => {
    if (err) {
        console.log('error', err.message);
        response.send('query error');
    } else {

        response.send('Edited Artist!');
    }

})
});


//===== Remove an Artist =====

app.get("/artist/:id/delete", (request, respond) => {
    let queryText = 'SELECT * FROM artists WHERE id=$1';
    const values = [request.params.id];

    pool.query(queryText, values, (err, result)=> {

        respond.render("delete", result.rows[0]);
    })
})

app.delete("/artist/:id/delete", (request, respond) => {
    let queryText = 'DELETE FROM artists WHERE id=$1';
    const values = [request.params.id];

    pool.query(queryText, values, (err, result)=> {

        respond.send("Artist of id " + request.params.id + " is deleted");
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