console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'sirron',
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

//app.get to see all the artist
app.get('/', (request, res) => {
    const text = 'SELECT * FROM artists'

    pool.query(text, (err, result) => {
        if (err) {
            console.log("query error", err.message);
        } else {
            console.log("result", result.rows);
            res.send(result.rows);
            // res.render('home');
        }
    });
    // response.render('home');
});


//app.get to create a form for new artist
app.get('/artists/new', (request, res) => {

    res.render('new');
});



//app.post to create a new artist
app.post('/artists', (request, res) => {
    console.log(request.body);
    const artistArray = [request.body.name, request.body.photo_url, request.body.nationality];

    const text = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *';
    pool.query(text, artistArray, (err, result) => {

        if (err) {
            console.error("query error", err.message);
            res.send("query error");
        } else {
            console.log("query result :", result);
            res.send(result.rows);
        }
    });
});

//app.get to see a single artist
app.get('/artists/:id', (request, res) => {
    const id = parseInt(request.params.id);
    const inputValues = [id];
    const text = "SELECT * FROM artists WHERE id = ($1)";

    pool.query(text, inputValues, (err, result) => {
        console.log(result.rows);
        res.send(result.rows[0]);
    })

});

//app.get to display form for editing an artist
app.get('/artists/:id/edit', (request, res) => {
    const id = parseInt(request.params.id);
    const text = "SELECT * FROM artists WHERE id = ($1)";
    console.log("KITTYYYYY");
    pool.query(text, id, (err, result) => {

        res.render('editform', id);
    });
});

// //app.put to update an artist
// //not working
// app.put('/artists/:id', (request, res) => {
//     const artistId = parseInt(request.params.id);
//     const { name, photo_url, nationality } = request.body;
//     const text = "UPDATE artists SET name="
//     $ { name }
//     ", photo_url="
//     $ { photo_url }
//     ", nationality="
//     $ { nationality }
//     " WHERE id = "($1)
//     ", RETURNING *";
//     console.log("meoooowwwwww");

//     pool.query(text, artistId, (err, result) => {

//         // done writing the file
//         res.render("update", result.rows[0]);
//     });
// })


//**** PLAYLIST ****//

//app.get playlist home page
app.get('/playlist', (request, res) => {
    console.log('list of playlist');
    let queryString = 'SELECT * FROM playlists';
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.message);
            res.send('query error');
        } else {
            console.log('display all playlists!');
            res.send(result.rows);
        }
    });
});

//create playlist and playlist song table in database
//

// //app.get list all the playlists
// app.get('/playlist/new', (request, res) => {
//             const text = 'SELECT * FROM artist'
//             pool.query(text, (err, result) => {
//                 if (err)

//             })


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