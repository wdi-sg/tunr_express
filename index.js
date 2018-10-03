console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'chrisssy',
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

// Setting up middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

// HTTP VERB GET, Action: new
app.get('/artists/new', (req, res) => {
    res.render('newartist');
});

// HTTP VERB GET, Action: create
app.post('/artists', (req, res) => {

    let text = "INSERT INTO Artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    const values = [req.body.name, req.body.photo_url, req.body.nationality];

    pool.query(text, values, (error, result) => {
        if(error) {
            console.log('Error: ', error);
        } else {
            let text = "SELECT * FROM Artists ORDER BY id ASC";

            pool.query(text, (error, result) => {
                if(error) {
                    console.log('Error: ', error);
                } else {
                    res.render('allartists', {artists: result.rows});
                };
            });
        };
    });
});

// HTTP VERB GET, Action: index
app.get('/artists', (req, res) => {
    let text = "SELECT * FROM Artists ORDER BY id ASC";

    pool.query(text, (error, result) => {
        if(error) {
            console.log('Error: ', error);
        } else {
            console.log("RESULTS.ROWS:", result.rows)
            res.render('allartists', {artists: result.rows});
        };
    });
});

// HTTP VERB GET, Action: show
app.get('/artists/:id', (req, res) => {
    let text = "SELECT * FROM Artists WHERE id=" + req.params.id;

    pool.query(text, (error, result) => {
        if(error) {
            console.log('Error: ', error);
        } else {
            res.render('singleartist', {artists: result.rows});
        };
    });
});

// HTTP VERB GET, Action: edut
app.get('/artists/:id/edit', (req, res) => {
   let requestedArtistId = req.params.id;

   let text = "SELECT * FROM Artists WHERE id =" + req.params.id;

   pool.query(text, (error, result) => {
    if(error) {
        console.log('Error: ', erorr);
    } else {
        if( result.rows[0].id == undefined ) {
            res.send("There is no such Artist!");
        } else {
            res.render('editform', {artist: result.rows});
        };
    };
   });
})

// HTTP VERB PATCH/PUT, Action: update
app.put('/artists/:id', (req, res) => {
    if ( req.query._method == 'PUT' && req.body.name != undefined && req.body.photo_url != undefined && req.body.nationality != undefined ) {
        let text = "UPDATE Artists SET (name, photo_url, nationality) = ($1, $2, $3) WHERE id =" + req.params.id;

        const values = [req.body.name, req.body.photo_url, req.body.nationality];

        pool.query(text, values, (error, result) => {
            if(error) {
                console.log('Error: ', error);
            } else {
                let text = "SELECT * FROM Artists ORDER BY id ASC";
                pool.query(text, (error, result) => {
                    if(error) {
                        console.log('Error: ', error);
                    } else {
                        res.render('allartists', {artists: result.rows});
                    };
                });
            };
        });
    } else {
        res.send("Please fill out all portions of the form!");
    }
});

// HTTP VERB DELETE, Action: destroy
app.delete('/artists/:id', (req, res) => {
    if ( req.query._method == 'DELETE' ) {
        let text = "DELETE from Artists WHERE id =" + req.params.id;

        pool.query(text, (error, result) => {
            if(error) {
                console.log('Error: ', error);
            } else {
                let text = "SELECT * FROM Artists ORDER BY id ASC";
                pool.query(text, (error, result) => {
                    if(error) {
                        console.log('Error: ', error);
                    } else {
                        res.render('allartists', {artists: result.rows});
                    };
                });
            };
        });
    };
});

app.get('/', (req, res) => {

  res.send('Hello World');

});

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
