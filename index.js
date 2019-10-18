console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');

var SALT = "pleasedontreadfinishthissentencebutifyoudidthengiveyourselfapatonthebackyipeeyeahyeah";

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

//******************//
//**** PLAYLIST ****//
//******************//

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

//app.get to create new playlist
app.get('/playlist/new', (request, res) => {
    res.render("newplaylist");
});

//app.post to create a new playlist
app.post('/playlist', (request, res) => {
    console.log(request.body);
    const playlistArray = [request.body.name];

    const text = 'INSERT INTO playlists (name) VALUES ($1) RETURNING *';
    pool.query(text, playlistArray, (err, result) => {

        if (err) {
            console.error("query error", err.message);
            res.send("query error");
        } else {
            console.log("query result :", result);
            res.send(result.rows);
        }
    });
})


//******************//
//***** LOGIN ******//
//******************//

//                             'password'+'bluebird'
  let hashedPassword = sha256(request.body.password + SALT);


  const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';

  const values = [
    request.body.name,
    hashedPassword
  ];

  pool.query(queryString, values, (err, result) => {

    if (err) {
      console.error('query error:', err.stack);
      response.send( 'query error' );
    } else {
      console.log('query result:', result);

      // redirect to home page
      response.send( result.rows );
    }
  });

//app.get login for user
app.get('/login', (request, res) => {
    res.render("loginform");
});

//app.post login for user
app.post('/login', (request, res) => {
    let requestUserName = request.body.name;
    let requestPassword = request.body.password;

    //check the database for a row with this user
    const queryString = "SELECT * FROM users WHERE name='" + requestUserName + "'";
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            // if this user exists in the db
            if (results.rows.length > 0) {

                let hashedRequestPassword = sha256(requestPassword + SALT);
                console.log("hashed request password: " + hashedRequestPassword);

                // check to see if the password in request.body matches what's in the db
                if (hashedRequestPassword === result.rows[0].password) {
                    let user_id = result.rows[0].id

                    let hashedCookie = sha256(SALT + user_id);

                    response.cookie('user_id', user_id);
                    response.cookie('hasLoggedIn', hashedCookie);

                    // if it matches they have been verified, log them in
                    response.send('about to log you in')
                } else {

                    response.status(403).send('wrong password');
                }

            } else {
                response.status(403).send('no username');
            }
            // redirect to home page
        }
    });
});

//
app.get('/special', (request, response)=>{


  let user_id = request.cookies['user_id'];
  let hashedValue = sha256( SALT + user_id );

  // if there is a cookie that says hasLoggedIn yes, let them access this page
  if( request.cookies['hasLoggedIn'] === hashedValue ){
    response.send('WELCOME BACK!');

  }else{

    //otherwise, show them a message
    response.send('INCORRECT USERNAME OR PASSWORD!');
    // response.redirect('/login');
  }
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