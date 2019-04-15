
const pg = require("pg");
const express = require("express");
const methodOverride = require("method-override");


// Initialise postgres client
const configs = {
  user: "asadullah",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432,
};


const pool = new pg.Pool(configs);

pool.on("error", function (err) {
  console.log("idle client error", err.message, err.stack);
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

app.use(methodOverride("_method"));
app.use(express.static("public"))

const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */



 // app.get('/' , (req, res, next) => {
 //    console.log('hello Asadullah');
 //    res.send('Hello Asadullah');
 // });

// app.get('/', (req, res) => {
//   // giving home.jsx file an object/context with `name` as a property
//   const queryString = "SELECT * FROM artist";
//   res.render('home', queryString);
// });

app.get("/", (request, response) => {
  // respond with HTML page displaying all pokemon
  let queryString = "SELECT * FROM artist";
  pool.query(queryString, (errorObject, result) => {
    let obj;
    if (errorObject === undefined) {
      // console.log(result.rows);
      obj = { data: result.rows };
    } else {
      console.error("query error");
      // result.send("query error");
    }
    response.render("home", obj);
  });
});

// app.get('/artist/:id', (req, res, next) => {
//   const foundArtist = getElementById(req.params.id, artist);
//   if (foundArtist) {
//     res.send(foundArtist);
//   } else {
//     res.status(404).send();
//   }
// });


app.get('/artist', (request, response) => {
    const queryArtist = 'SELECT * FROM artist ORDER BY id';
    pool.query(queryArtist, (err, result) => {

 if (err) {
          console.error('59 query error:', err.stack);
          response.send( 'query error' );
        } else {
          const data = { artist: result.rows };
          response.render('home', data );
        }
      });
});




    // const queryArtist = 'select * from artist';
//     response.render('home');
// });

    // pool.query(queryArtist, (err, result) => {
    //     if (err) {
    //         console.error('table error', err stack);
    //         response.send('query error');
    //     } else {
    //         const data = {artist: result.rows};
    //         response.render('home', data);
    //     }
    //     })
    // });
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
//   response.render('home');
// });







app.get('/artist/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artist', (request, response) => {



    const insertQuery = 'INSERT INTO artist (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
    const values = Object.values (request.body);

    pool.query(insertQuery, values, (err, result) => {
        if (err) {
            response.send("Query Error for Insert");
        } else {
            response.redirect('/artist/${result.rows[0].id}');
        }
    })
});



// 3

app.get('/artist/:id/edit', (request, response) => {

      const id = request.params.id;

      const updateQuery = `SELECT * FROM artist WHERE id='${id}'`;

      pool.query(updateQuery, (err, result) => {

        if (err) {
          console.error('96 query error:', err.stack);
          response.send( 'query error' );
        } else {
          const data = { artist: result.rows };
          response.render('editArtist', data );
        }
      });
    });

app.put('/artist/:id', (request, response) => {
        const Id = request.params.id;
        const object = request.body;
        const name = object.name;
        const nationality = object.nationality;
        const url = object.url;


        const updateQuery = `UPDATE artist SET name = '${name}', photo_url = '${url}', nationality = '${nationality}' WHERE id = '${Id}' returning id`;

        pool.query(updateQuery, (err, result) => {
            if (err) {
                console.log(err.message);
                response.send("Query Error for update");

            } else {
                response.send("/artist/${result.rows[0].id}");
            }
        })  // end of pool query
    });  // end of put - when editing


//  to delete

app.get('/artists/:id/delete', (request, response) => {

      const id = request.params.id;

      const deleteQuery = `SELECT * FROM artists WHERE id='${id}' ORDER BY id`;

      pool.query(deleteQuery, (err, result) => {

        if (err) {
          console.error('134 query error:', err.stack);
          response.send( 'query error' );
        } else {
          const data = { artist: result.rows };
          response.render('deleteArtist', data );
        }
      });
    });

    app.delete('/artist/:id', (request, response) => {
        const Id = request.params.id;

        const deleteQuery = "DELETE FROM artists WHERE id = '${id}'";

        pool.query(deleteQuery, (err, result) => {
            if (err) {
                console.log(err.message);
                response.send("Query Error for delete");

            } else {
                response.redirect("/artist");
            }

        })  // end of pool query

    })  // end of delete

    app.get('/artists/:id', (request, response) => {

      const id = request.params.id;

      const updateQuery = `SELECT * FROM artists WHERE id='${id}'`;

      pool.query(updateQuery, (err, result) => {

        if (err) {
          console.error('152 query error:', err.stack);
          response.send( 'query error' );
        } else {
          const data = { artist: result.rows };
          response.render('showSingleArtist', data );
        }
      });
    });

// +++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('/artist/:id/songs', (request, response) => {

      const artistId = request.params.id;
      const queryString = `SELECT *, songs.id FROM songs INNER JOIN artists ON (songs.artist_id=artists.id) where artist_id=${artistId}`;

      pool.query(queryString, (err, result) => {

        if (err) {
          console.error('203 query error:', err.stack);
          response.send( 'query error' );
        } else {
          const data = { songs: result.rows };
          response.render('listSongsOfAnArtist', data );
        }
      });
    });

    app.get('/artists/:id/songs/new', (request, response) => {

      const id = request.params.id;
      const queryString = `SELECT * FROM artists WHERE id=${id}`;

      pool.query(queryString, (err, result) => {

        if (err) {
          console.error('220 query error:', err.stack);
          response.send( 'query error' );
        } else {
          const data = { artist: result.rows };
          response.render('newSong', data );
        }
      });
    });

    app.post('/artists/:id/songs', (request, response) => {

      const id = request.params.id;
      const queryString = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1,$2,$3,$4,$5)`;
      let values = Object.values(request.body);
      values.push(id);
      pool.query(queryString, values, (err, result) => {

        if (err) {
          console.error('241 query error:', err.stack);
          response.send( 'query error' );
        } else {
          response.redirect(`/artists/${id}/songs`);
        }
      });
    });





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