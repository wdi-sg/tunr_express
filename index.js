console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tunr_db',
  password: 'passfoot',
  port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const cookieParser = require('cookie-parser');

var sha256 = require('js-sha256');

const SALT = "salty that this isnt working";

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
app.use(cookieParser());

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
    response.redirect('/artist');
});

//LOGIN AND REGISTRATION:
app.get('/register', (request, response) => {

    response.render('register');
})

app.get('/login',(request, response)=>{

  response.render('login');
})

app.post('/register', (request, response)=>{

  // hash the password
  let hashedPassword = sha256( request.body.password + SALT );

  const queryString = "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";

  const values = [request.body.name, hashedPassword];

  pool.query(queryString, values, (err, result) => {

    console.log("YAY");
    console.log(result.rows[0] );

    // check to see if err is null

    // they have succesfully registered, log them in
    response.cookie('loggedin', true);
    response.redirect('login');
  });

})


app.post('/login', (request, response) => {
    // hash the password
    let hashedPassword = sha256( request.body.password + SALT );
    console.log(response.body);
​
    const queryString = "SELECT FROM users WHERE name=$1 AND password=$2";
​
    const values = [request.body.name, hashedPassword];
​
    /*pool.query(queryString, values, (err, result) => {
        if (err) {
            console.log("query error", err.message);
​
        } else {
            if (result.rows[0] === undefined){
                response.send("Sorry, the user name/password was incorrect.");
            } else {
                console.log("YAY");
                console.log(result.rows[0] );
​
                let hashedLogin = sha256("you are in" + result.rows[0].id + SALT);
                // check to see if err is null
​
                // they have successfully registered, log them in
                response.cookie('loggedin', hashedLogin);
                response.cookie('User', result.rows[0].name);
                response.redirect('/artists');
            }
​
        }*/
   // });
});

app.get('/artist', (request, response) => {
    const queryString = 'SELECT * from artists'

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: "Home",
                artists: result.rows
            };
            response.render('home', data);
        }
    });
});

app.get('/artist/new', (request, response) => {
    let data = {
        title: "Add"
    }
    response.render("add", data);
})

app.post('/artist', (request, response) => {

    const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3) RETURNING *';
    let arr = [req.body.name, req.body.photo_url, req.body.nationality];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            response.render('artist', data);
        }
    });
})

app.get('/artist/:id', (request, response) => {

    const queryString = 'SELECT * from artists WHERE id=' + parseInt(req.params.id);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            response.render('artist', data);
        }
    });
});

app.get('/artist/:id/edit', (request, response) => {

    const queryString = 'SELECT * from artists WHERE id=' + parseInt(req.params.id);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            response.render('edit', data);
        }
    });
});

app.put('/artist/:id', (request, response) => {
    const queryString = 'UPDATE artists SET name=$1,nationality=$2,photo_url=$3 WHERE id =' + parseInt(req.params.id) + "RETURNING *";
    let arr = [req.body.name, req.body.nationality, req.body.photo_url];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };

            response.render('artist', data);
        }
    });
})

app.delete('/artist/:id', (request, response) => {
    const queryString = 'DELETE from artists WHERE id='+parseInt(req.params.id);
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

            response.redirect("/artist");
        }
    });
})

app.get('/artist/:id/songs', (request, response) => {
    const queryString = 'SELECT * from songs'

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: "Songs",
                artists: result.rows
            };
            response.render('songs', data);
        }
    });
});

app.get('/artist/:id/songs/new', (request, response) => {
    let data = {
        title: "addsongs"
    }
    response.render("Addsongs", data);
})

app.put('/artist/:id/songs', (request, response) => {
    const queryString = 'UPDATE songs SET title=$1,album=$2,preview_link=$3, artwork=$4, artist_id=$5 WHERE id =' + parseInt(req.params.id) + "RETURNING *";
    let arr = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                title: result.rows[0].title,
                songs: result.rows[0]
            };

            response.render('artist', data);
        }
    });
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
