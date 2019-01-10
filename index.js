console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'ronniechua',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
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



//display all artists as a list
app.get('/artist', (req, res) => {
    // query database for all pokemon
    pool.query('SELECT * FROM artists ORDER BY id', (err, artistResult) => {
        if (err) {
            console.log(err);
        }
        let artist = {};
        artist.artlist = [];
        artist.artlist = artistResult.rows;
        // console.log(artist);

        // respond with HTML page displaying all pokemon
        res.render('home', artist);
    });
});


app.get("/artist/new", (req, res) => {
    console.log("inside new");
    res.render('newArtist');
});


// post data from form
app.post('/artist', (request, response) => {

    // console.log(request.body);

    let list = request.body;
    let queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

    let values = [];
    values.push(list.name);
    values.push(list.photo_url);
    values.push(list.nationality);
    // console.log(values);

    pool.query(queryText, values, (err, res) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            // let created = res.rows;
            // console.log(created);
            // console.log(res.rows);
            response.render('createSuccess', values);
        }
    });

    // response.render('addedrecipe', {recipes:newRecipe});

});

//display one page on artist information
app.get('/artist/:id', (req, res) => {
    // console.log("inside id");
    let id = req.params.id;
    // console.log("inside the id req:", req.params.id);
    pool.query('SELECT * FROM artists WHERE ID =' + id, (err, artistId) => {
        // console.log("inside pool query of :id");
        // console.log(artistId.rows);
        let artist = {};
        artist.list = [];
        artist.list = artistId.rows;
        res.render('display', artist);

    });
});

app.get('/artist/:id/edit', (request, response) => {

    const artistId = request.params.id;
    const queryText = 'SELECT * FROM artists where id = ' + artistId;

    pool.query(queryText, (err, queryResult)=>{
        if(err){
            console.log("Error occured " + err);
        } else {
            // console.log("inside query Rows", queryResult.rows[0]);
            const result = queryResult.rows;
            response.render('edit-artist',{list:result});
        }
    });
});

app.put('/artist/:id', (request,response) => {

// console.log(request.body);
// console.log(request.params.id);
const id = request.params.id;
const newName = request.body.name;
const newURL = request.body.photo_url;
const newNat = request.body.nationality;
const queryText = `UPDATE artists SET name = '${newName}', photo_url = '${newURL}',nationality = '${newNat}' WHERE id = ${id} RETURNING *`;
// console.log(queryText);
    pool.query(queryText, (err, queryResult)=>{
        if(err){
            console.log("Error occured " + err);
        } else {
            const result = queryResult.rows[0];
            console.log(result);
            response.render('successedit', {list:result});
        }
    });

});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};




process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);