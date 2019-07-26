console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const sha256 = require('js-sha256');

// Initialise postgres client
const configs = {
  user: 'hockie2',
  password:'bhhorse2',
  host: '127.0.0.1',
  port: 5432,
  database: 'tunr_db',
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
app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  response.redirect('/artists');
});

////////////////////////////////////////////////////////////////////////////
app.get('/artists', (request, response) => {

    const queryText = 'SELECT * FROM artists ORDER BY id ASC';

    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        }
        else {

            var data = {
              artists: result.rows
            }

            response.render('home',data);
        }
    })
});

////////////////////////////////////////////////////////////////////////////
app.get('/artists/new', (request, response) => {

    response.render("new");
})

////////////////////////////////////////////////////////////////////////////
app.post('/artists', (request, response) => {

    const queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1,$2,$3) RETURNING *';
    let arr = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(queryText, arr, (err, result) => {

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

////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id', (request, response) => {

    const queryText = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);

    pool.query(queryText, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

            let data = {
                artists: result.rows[0]
            };
            response.render('artist', data);
        }
    });
});


////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id/edit', (request, response) => {

    const queryText = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);

    pool.query(queryText, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                artists: result.rows[0]
            };
            response.render('edit', data);
        }
    });
});


////////////////////////////////////////////////////////////////////////////
app.put('/artists/:id', (request, response) => {
    const queryText = 'UPDATE artists SET name=$1,nationality=$2,photo_url=$3 WHERE id =' + parseInt(request.params.id) + 'RETURNING *';
    let arr = [request.body.name, request.body.nationality, request.body.photo_url];
    pool.query(queryText, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                artists: result.rows[0]
            };

            response.render('artist', data);
        }
    });
})


////////////////////////////////////////////////////////////////////////////
app.delete('/artists/:id', (request, response) => {
    const queryText = 'DELETE FROM artists WHERE id=' + parseInt(request.params.id);
    pool.query(queryText, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

            response.redirect("/artists");
        }
    });
})

////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id/songs', (request, response) => {
    const queryText = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);
    pool.query(queryText, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        else {
            const songText = 'SELECT * FROM songs WHERE artist_id=' + result.rows[0].id;

            pool.query(songText, (err, result2) => {

                if (err) {
                    console.error('query error:', err.stack);
                    response.send('query error');
                } else {
                    let data = {
                        songsList: result2.rows,
                        artists:result.rows[0]
                    }

                    response.render("songlist", data);
                }
            });
        }
    });
})
////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id/songs/new', (request, response) => {
    const queryText = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);
    pool.query(queryText, (err, result) => {

        let data={
            artists:result.rows[0]
        }

    response.render("songnew", data);
    })
})

////////////////////////////////////////////////////////////////////////////
app.post('/artists/:id/songs', (request, response) => {
    let id = parseInt(request.params.id);
    const queryText = 'INSERT INTO songs (title, album, preview_link, artwork,artist_id) VALUES ($1,$2,$3,$4,$5)';
    let arr = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id];
    pool.query(queryText, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {

            response.redirect("/artists/" + id + "/songs");
        }
    });

})

////////////////////////////////////////////////////////////////////////////
app.get('/register', (request, response) => {

    response.render("register");

})

////////////////////////////////////////////////////////////////////////////
const SALT = "bananas are delicious";

app.post('/user', (request, response) => {
  const queryString = "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *";

  // hash the password
  let hashedPassword = sha256( request.body.password + SALT );
  let username = request.body.user_name;
  const values = [username, hashedPassword];

  pool.query(queryString, values, (err, result) => {

    // check to see if err is null
   if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

            if (result.rows[0] === undefined) {
                response.redirect("/login");
            }
            else {

                const queryString = 'SELECT * FROM users WHERE user_name=$1 AND password=$2';
                const values = [username, hashedPassword];

                pool.query(queryString, values, (err, result) => {

                // they have succesfully registered, log them in
                response.cookie('user_name', username);

                let currentSessionCookie = sha256(parseInt(result.rows[0].id) + 'logged_in' + SALT);
                response.cookie('logged_in', currentSessionCookie);

                response.cookie("user_id", parseInt(result.rows[0].id));

                response.redirect("/artists");
                })
            }
        }
  });

})

////////////////////////////////////////////////////////////////////////////
app.get('/login', (request, response) => {

    response.render("login");

})
////////////////////////////////////////////////////////////////////////////
app.post('/login', (request, response)=>{
  const queryString = "SELECT * FROM users WHERE user_name=$1 AND password=$2";

  let hashedPassword = sha256( request.body.password + SALT );
  let username = request.body.user_name;
  const values = [username, hashedPassword];

  pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        }
        else {

        // they have succesfully registered, log them in
        response.cookie('user_name', username);

        let currentSessionCookie = sha256(parseInt(result.rows[0].id) + 'logged_in' + SALT);
        response.cookie('logged_in', currentSessionCookie);

        response.cookie("user_id", parseInt(result.rows[0].id));

        response.redirect("/artists");
        }
    })
  });
////////////////////////////////////////////////////////////////////////////
app.get('/favorites/new', (request, response) => {
    response.render("favorites");
})
////////////////////////////////////////////////////////////////////////////
app.post('/favorites', (request, response)=>{
  const queryString = "INSERT INTO favorites (song_id, user_id) VALUES ($1, $2) RETURNING *";


  if( sha256( request.cookies["user_id"] + 'logged_id' + SALT ) === request.cookies["logged_id"] ){

  // you know that the user is logged in
}

  const values = [request.body.user_name];

  pool.query(queryString, values, (err, result) => {


    if( err ){
      console.log( "ERRR!", err );

    }else{

      // they entered the correct password if
      // the one in the request is the same as the one in the db query

      let hashedPassword = sha256( request.body.password + SALT );
      if(result.rows[0].password === hashedPassword){

        var user_id = result.rows[0].id;

        console.log("CORRECT")

        let currentSessionCookie = sha256( user_id + 'logged_id' + SALT );


        response.cookie('user_name', values);
        response.cookie('loggedin', currentSessionCookie);
        response.cookie('user_id', user_id);

        response.redirect('/artists');
      }else{
        console.log("WRONG")

      }

    }
  });
})








/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// let onClose = function(){

//   console.log("closing");

//   server.close(() => {

//     console.log('Process terminated');

//     pool.end( () => console.log('Shut down db connection pool'));
//   })
// };

// process.on('SIGTERM', onClose);
// process.on('SIGINT', onClose);
