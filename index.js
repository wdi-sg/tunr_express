console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'saufi',
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

app.get ('/delete', (request, response) => {

    let text = "SELECT * FROM artists ORDER BY id";

    pool.query(text, (err, result) => {

        if (err) {

            console.log("query error: ", err.message);

        } else {

            response.render('delete', {result: result.rows});

        }
    })

});

app.delete('/', (request, response) => {

    console.log(request.body.id)
    let text = "DELETE from artists WHERE id=" + request.body.id;

    pool.query(text, (err, result) => {

        if(err) {
            console.log("query error", err.message);
        } else {
            response.redirect('/');
        }
    });

});

app.get ('/edit/:id', (request, response) => {

    let text = "SELECT * FROM artists WHERE id=" + request.params.id;

    pool.query(text, (err, result) => {

        if (err){
            console.log("query err: ", err.message);
        } else {

            response.render('update', {selected: result.rows[0]});

        }
    })

});

app.put('/:id', (request, response) => {

    let text = "UPDATE artists SET name=($1), nationality=($2), photo_url=($3) WHERE id=" + request.params.id;

    let values = [request.body.name, request.body.nationality, request.body.photo_url];

    pool.query(text, values, (err, result) => {

        if (err) {

            console.log("query error: ", err.message);

        } else {

            response.redirect("/" + request.params.id);
        }
    });

});

app.get('/new', (request, response) => {

    response.render('new');

});

app.post('/', (request, response) => {

    let text = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id, name ";

    let values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(text, values, (err, result) => {

        if (err) {

            console.log("query error", err.message);

        } else {

            console.log("result", result.rows[0]);
            response.redirect("/");
        }

    });
});

app.get('/:id', (request, response) => {

    let text = "SELECT * FROM artists WHERE id=" + request.params.id;

    pool.query(text, (err, result) => {

        if (err) {
            console.log("query error: ",err);
        } else {

            response.render('show', {select: result.rows[0]});
        }

    });

});

app.get('/', (request, response) => {

  let text = "SELECT * FROM artists ORDER BY id"

  pool.query(text, (err, result) => {

    console.log(result.rows)

    if (err) {
        console.log("query error: ", err.message);

    } else {

        response.render('home', {result: result.rows});

    }

  });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// server.on('close', () => {
//   console.log('Closed express server');

//   db.pool.end(() => {
//     console.log('Shut down db connection pool');
//   });
// });
