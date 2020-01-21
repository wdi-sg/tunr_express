console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'postgres',
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


//home page/landing page
app.get('/', (request, response) => {
    response.render('home');
});


//new artist form page
app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new artist
    response.render('new');
});

//get all songs by artist
app.get('/artists/:id/songs', (request, response) => {
    let id = request.params.id;
    let text1 = "SELECT name FROM artists WHERE id=$1"
    let values1 = [id];
    pool.query(text1, values1, (err1, result1) => {
        if (err1) {
            console.log("Error :", err1);
            response.status(500).send("ERROR");
        }
        console.log("result : ", result1);
        let artistName = result1.rows[0].name;
        let text2 = "SELECT title, id FROM songs WHERE artist_id=$1";
        let values2 = [id];
        pool.query(text2, values2, (err2, result2) => {
            if (err2) {
                console.log("Error :", err2);
                response.status(500).send("ERROR");
            }
            let data = {
                songs : result2.rows,
                id : id,
                artist : artistName
            };
            response.render('songlist', data)
        })
    })
})


//show artist's details
app.get('/artists/:id', (request, response) => {
    let id = request.params.id;
    let text = "SELECT * FROM artists WHERE id=$1";
    let values = [id];
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send("ERROR")
        }
    let data = result.rows[0];
    response.render('artists', data);
    })
})

//show list of artists
app.get('/artists', (request, response) => {
    let text = "SELECT * FROM artists ORDER BY id ASC";
    pool.query(text, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send("You got an error")
        }
        console.log(result.rows);
        let data = {
            artists : result.rows
        };
        response.render('alist', data)
    })
})















app.post('/artists', (request, response) => {
    let text = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id;";
    let values = [
    request.body.name, request.body.photo_url, request.body.nationality
    ];
    let data = {
        values : values
    };
    pool.query(text, values, (err, result) => {
        if (err) {
            console.log("Error :", err);
            response.status(500).send(err);
        } else {
            response.render('home', data)
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
