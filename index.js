console.log("starting up!!");
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
var sha256 = require('js-sha256');


// Initialise postgres client
const configs = {
  user: 'bennychin',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

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
// app.use(express.static(__dirname+'/public/'));
app.use(express.static(__dirname+'/public'));
app.engine('jsx', reactEngine);




 /**
 * ======================================================
 *           Route - Index - Homepage - Show
 * ======================================================
 */

app.get('/', (request, response) => {
  // query database for all artists
    const queryString = 'SELECT * from artists'

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // redirect to home page
        response.render('home',result);
      }
    });
});

app.get('/artist', (request, response) => {
    response.redirect('/');
});

 /**
 * ======================================================
 *                  Route - Add Artist
 * ======================================================
 */
app.get('/artist/new', (request, response) => {
  // respond with HTML page with form to create new artist
    response.render('addArtist');
});

app.post('/artist', (request,response) => {
    console.log("request body is");
    console.log(request.body);

    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES($1, $2, $3);`

    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // console.log('query result:', result);
        // redirect to home page
        response.redirect('/');
      }
    });
});

 /**
 * ======================================================
 *                Route - Artist - Edit/Delete
 * ======================================================
 */
app.get('/artist/:id/edit', (request, response) => {
  // query database for selected artist by id
    const queryString = "SELECT * FROM artists WHERE id = " + request.params.id;

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // console.log('query result:', result);


        response.render('editArtist',result);
        // response.send(result)
      }
    });
  //   console.log("?????");
  // response.send("hello tunr db");
});

app.put('/artist/:id', (request,response) => {
    console.log("EDITING");
    // console.log(request.body);
    const queryString = `UPDATE artists SET name='${request.body.name}', photo_url='${request.body.photo_url}', nationality='${request.body.nationality}' WHERE id='${request.params.id}';`

    pool.query(queryString, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // console.log('query result:', result);
        // redirect to home page
        response.redirect('/');
      }
    });
});

app.delete('/artist/:id', (request,response) => {
    // console.log("DELETING!!");
    // console.log(request.body);
    const queryString = 'DELETE FROM artists WHERE id=$1';

    let value = [request.params.id];

    pool.query(queryString, value, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // console.log("DELETED!!");
        // redirect to home page
        response.redirect('/');
      }
    });
});


 /**
 * ======================================================
 *         Route - Selected Artist - Show Songs
 * ======================================================
 */
app.get('/artist/:id/songs', (request, response) => {
  // query database for selected artist by id to show songs
    let queryString = `SELECT * FROM songs INNER JOIN artists ON artists.id=songs.artist_id WHERE artists.id=$1`;

    let values = [request.params.id];

    pool.query(queryString, values, (err, result) => {

            if (err) {
                console.error('query error:', err.stack);
                response.send( 'query error' );

            } else if (result.rows.length === 0) {
                const newQuery = `SELECT * FROM artists WHERE id=$1`;
                let values = [request.params.id];
                pool.query(newQuery, values, (err, newResult) => {

                console.log(newResult);
                response.render('artistPage',newResult);

                })
            } else {

                response.render('artistPage',result);
            }
    });
});

 /**
 * ======================================================
 *       Route - Selected Artist - Add New Songs
 * ======================================================
 */
app.get('/artist/:id/songs/new', (request, response) => {
  // query database for selected artist by id
  // and display add song form
    const queryString = `SELECT * FROM songs INNER JOIN artists ON artists.id=songs.artist_id WHERE artists.id=$1`;

    let values = [request.params.id];

    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );

        } else if (result.rows.length === 0) {
            const newQuery = `SELECT * FROM artists WHERE id=$1`;
            let values = [request.params.id];
            pool.query(newQuery, values, (err, newResult) => {

            console.log(newResult);
            response.render('addSong',newResult);

            })
        } else {
            // response.send(result)
            response.render('addSong',result);
        }

    });
});

app.post('/artist/:id/songs', (request,response) => {
    console.log("request body is");
    console.log(request.body);

    const queryString = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES($1, $2, $3, $4, $5);`

    const values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id];

    pool.query(queryString, values, (err, result) => {

        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );

        } else {
        // console.log('query result:', result);
        // redirect to artist page
        response.redirect('/artist/'+request.params.id+'/songs');
        console.log("ADDED NEW SONG!!")
      }
    });
});


 /**
 * ======================================================
 *                Route - Create Account
 * ======================================================
 */
app.get('/register', (request, response) => {
  response.render('register')
});

app.post('/register', (request, response) => {

  let TUNR = "This is the secret tune"
  // hash the password
  let hashedPassword = sha256( request.body.password + TUNR );

  const queryString = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";

  const values = [request.body.username, hashedPassword];

  pool.query(queryString, values, (err, result) => {

    console.log("YAY");
    console.log(result.rows[0] );
    // [{name:"hh", password: "hhg"}]
    let username = request.cookies.username;

    let requestSessionCookie = sha256( username + TUNR );
    console.log("requestSessionCookie is: ")
    console.log(requestSessionCookie);
    // if( requestSessionCookie === request.cookies.loggedin ){

    //   console.log("ISSSSSS LOged in");
    //   message = "LOCATION IS DOWNSTAIRS"

    // }
    // check to see if err is null

    // they have succesfully registered, log them in
    response.cookie('loggedin', true);
    // response.cookie('username', request.body.username);

    response.redirect('/');
  });
});

app.get('/login', (request, response) => {

    const queryString = 'SELECT * FROM users';

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            // console.log(result);
            response.render('loginPage',result);
        }
    })
  // response.render('loginPage')
});


app.post('/login/check', (request, response) => {

    let TUNR = "This is the secret tune";
    const queryString = 'SELECT * FROM users WHERE username=$1 AND password=$2';
    let hashedPassword = sha256( request.body.password + TUNR );
    let values = [request.body.username, hashedPassword];
    // console.log("USER NAME IS")
    // console.log(request.body.username);
    // console.log("PASSWORD IS :")
    // console.log(hashedPassword);
    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

            if (result.rows[0] === undefined) {

                response.render('loginPage',result);
                console.log(result.rows)
            } else {
                response.cookie("username", result.rows[0].username);

                let currentSessionCookie = sha256(result.rows[0].username + 'logged_in' + TUNR);

                response.cookie('logged_in', currentSessionCookie);

                response.redirect("/");
            }
        }
    });
})







app.get('/test', (request, response) => {
// response.send(request.cookies.loggedin)
// if (request.cookies.loggedin === true) {
            if (request.cookies["loggedin"] === "false") {
                response.render('loginPage');
            } else if (request.cookies["loggedin"] === "true") {
                response.send("LOGGED IN")
            } else if (request.cookies.loggedin === undefined) {
                response.render('register')
            }
// response.send("YAY")

});




// app.get('/test',(request, response)=>{

//   console.log( request.cookies );

//   var message = "SORRY NO SECRET FOR U";

//   if( request.cookies.loggedin === undefined ){
//     console.log("NOT LOGGD IN");
//     response.status(403);

//   }else{

//     let username = request.cookies.username;

//     let requestSessionCookie = sha256( username + "TUNR" );

//     if( requestSessionCookie === request.cookies.loggedin ){

//       console.log("ISSSSSS LOged in");
//       message = "LOCATION IS DOWNSTAIRS"
//       // response.send(message);

//     }
//   }
//   response.send(message)


// });






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






 /**
 * ======================================================
 *         Route - Individual Artist - Show Songs
 * ======================================================
 */
// app.post('/artist/:id', (request,response) => {
//     console.log("request body is");
//     console.log(request.body);

//     const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES($1, $2, $3);`

//     const values = [request.body.name, request.body.photo_url, request.body.nationality];

//     pool.query(queryString, values, (err, result) => {

//         if (err) {
//         console.error('query error:', err.stack);
//         response.send( 'query error' );

//         } else {
//         console.log('query result:', result);

//         // redirect to home page
//         response.render('editArtist',result);
//       }
//     });
// });