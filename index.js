console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'sean',
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

app.use(express.static("public"));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Part 1: Routes For Artists
 * ===================================
 */

app.get('/', (request, response) => {
  response.render('home');
});


/**
 * ===================================
 * Index
 * ===================================
 */



app.get('/artists/', (request, response) => {
  // query database for all pokemon
  const queryString = "SELECT * FROM artists ORDER BY id";

  pool.query(queryString, (errorObj, result) => {
    if(errorObj) {
        console.log(errorObj.stack);
        response.send("query error test 1");
    } else {
        const data = { artists: result.rows }

        response.render( "artist_index", data );
    }
  })

});

/**
 * ===================================
 * Create
 * ===================================
 */

app.get('/artists/new', (request, response) => {
   response.render("artist_create");
})


app.post('/artists', (request, response) => {

    console.log(request.body);
    const queryString = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)";

    const values = [request.body.name, request.body.photo_url, request.body.nationality];

    pool.query(queryString, values, (errorObj, result) => {
        if(errorObj) {
            console.log(errorObj.stack);
            response.send("query error test 2");
        } else {
            response.send("A new artist has been added!" + "<br><br><a href=/artists/>Home</a>");
        }
    })

})


/**
 * ===================================
 * Edit
 * ===================================
 */


app.get('/artists/:id/edit', (request, response) => {

    const queryString = "SELECT * FROM artists WHERE id=" + request.params.id;

    pool.query(queryString, (errorObj, result) => {
        if(errorObj) {
            console.log(errorObj.stack);
            response.send("query error test 3");
        } else {
            const data = { artist: result.rows }
            response.render("artist_edit", data );
        }
    })


});

 app.put('/artists/:id', (request, response) => {

        const queryString = "UPDATE artists SET name = $1, photo_url=$2, nationality=$3 WHERE id=$4";

        const values = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id];

        pool.query(queryString, values, (errorObj, result) => {
            if(errorObj) {
                console.log(errorObj.stack);
                response.send("query error test 4");
            } else {
                response.send("Artist has been edited!" + "<br><br><a href=/artists/>Home</a>");
            }
        })

  });


 /**
 * ===================================
 * Delete
 * ===================================
 */


app.get('/artists/:id/delete',(request, response) => {

    const queryString = "SELECT * FROM artists WHERE id=" + request.params.id;

    pool.query(queryString, (errorObj, result)=> {
        if(errorObj) {
            console.log(errorObj.stack);
            respons.send("query error test 5");
        } else {

            const data = { artist: result.rows };
            response.render("artist_delete", data);
        }
    })

});


 app.delete('/artists/:id', (request, response) => {

    const queryString = "DELETE from artists WHERE id =" + request.params.id;

        pool.query(queryString, (errorObj, result) => {
            if(errorObj) {
                console.log(errorObj.stack);
                response.send("query error test 6");
            } else {
                response.send("Artist has been deleted!" +"<br><br><a href=/artists/>Home</a>");
            }
        })

});


/**
 * ===================================
 * View
 * ===================================
 */



app.get('/artists/:id', (request, response) => {

  const artistId = request.params.id;

  const queryString = "SELECT * FROM artists WHERE id=" + artistId;

  pool.query(queryString, (errorObj, result) => {
    if(errorObj) {
        console.log(errorObj.stack);
        response.send("query error test 7");
    } else {
        if(result.rows.length == 0) {
            response.status(404).send("Page not found");
        } else {
            const data = { artist: result.rows,
                       artistIdKey: artistId };

        response.render( "artist_show", data );
        }
    }
  })

});


/**
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
* ==================================================================
*/




/**
 * ===================================
 * Part 1: Routes For Songs
 * ===================================
 */

app.get('/', (request, response) => {
  response.render('home');
});


/**
 * ===================================
 * Index
 * ===================================
 */



app.get('/songs/', (request, response) => {
  // query database for all pokemon
  const queryString = "SELECT * FROM songs ORDER BY id";

  pool.query(queryString, (errorObj, result) => {
    if(errorObj) {
        console.log(errorObj.stack);
        response.send("query error test 8");
    } else {
        const data = { songs: result.rows }

        response.render( "song_index", data );
    }
  })

});

/**
 * ===================================
 * Create
 * ===================================
 */

app.get('/songs/new', (request, response) => {
   response.render("song_create");
})


app.post('/songs', (request, response) => {

    console.log(request.body);
    const queryString = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)";

    const values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id];

    pool.query(queryString, values, (errorObj, result) => {
        if(errorObj) {
            console.log(errorObj.stack);
            response.send("query error test 9");
        } else {
            response.send("A new song has been added!" + "<br><br><a href=/songs/>Home</a>");
        }
    })

})


/**
 * ===================================
 * Edit
 * ===================================
 */


app.get('/songs/:id/edit', (request, response) => {


    const queryString = "SELECT * FROM songs WHERE id=" + request.params.id;

    pool.query(queryString, (errorObj, result) => {
        if(errorObj) {
            console.log(errorObj.stack);
            response.send("query error test 10");
        } else {
            const data = { song: result.rows }
            response.render("song_edit", data );
        }
    })


});

 app.put('/songs/:id', (request, response) => {

        const queryString = "UPDATE songs SET title=$1, album=$2, preview_link=$3, artwork=$4, artist_id=$5 WHERE id=$6";

        const values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, request.body.artist_id, request.params.id];

        pool.query(queryString, values, (errorObj, result) => {
            if(errorObj) {
                console.log(errorObj.stack);
                response.send("query error test 11");
            } else {
                response.send("Song has been edited!" + "<br><br><a href=/songs/>Home</a>");
            }
        })

  });


 /**
 * ===================================
 * Delete
 * ===================================
 */


app.get('/songs/:id/delete',(request, response) => {

    const queryString = "SELECT * FROM songs WHERE id=" + request.params.id;

    pool.query(queryString, (errorObj, result)=> {
        if(errorObj) {
            console.log(errorObj.stack);
            respons.send("query error test 12");
        } else {

            const data = { song: result.rows };
            response.render("song_delete", data);
        }
    })

});


 app.delete('/songs/:id', (request, response) => {

    const queryString = "DELETE from songs WHERE id =" + request.params.id;

        pool.query(queryString, (errorObj, result) => {
            if(errorObj) {
                console.log(errorObj.stack);
                response.send("query error test 13");
            } else {
                response.send("Song has been deleted!" +"<br><br><a href=/artists/>Home</a>");
            }
        })

});


/**
 * ===================================
 * View
 * ===================================
 */



app.get('/songs/:id', (request, response) => {

console.log(request.params.id)
  const songId = request.params.id;

  const queryString = "SELECT * FROM songs WHERE id=" + songId;

  pool.query(queryString, (errorObj, result) => {
    if(errorObj) {
        console.log(errorObj.stack);
        response.send("query error test 14");
    } else {
        const data = { song: result.rows }

        response.render( "song_show", data );
    }
  })

});



/**
 * ===================================
 * Part 2: Routes For Songs of Artists
 * ===================================
 */



 /**
 * ===================================
 * View All Songs Of An Artist
 * ===================================
 */


app.get('/artist/:id/songs', (request, response) => {

  const artistId = request.params.id;

  const queryString = "SELECT * FROM songs WHERE artist_id=" + artistId;

  pool.query(queryString, (errorObj, result) => {
    if(errorObj) {
        console.log(errorObj.stack);
        response.send("query error test 15");
    } else {
        const data = { songs: result.rows }

        response.render( "artist_song_list_show", data );
    }
  })

});


/**
 * ===================================
 * Create A New Song For An Artist
 * ===================================
 */



app.get('/artist/:id/songs/new', (request, response) => {

    const artist_id = request.params.id;
    const data = { idKey : artist_id };
   response.render("artist_song_list_create", data);
})

app.post('/artist/:id/songs', (request, response) => {

    const artist_id = request.params.id;
    console.log(request.body);

    const queryString = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const values = [request.body.title, request.body.album, request.body.preview_link, request.body.artwork, artist_id];

    pool.query(queryString, values, (errorObj, result) => {
        if(errorObj) {
            console.log(errorObj.stack);
            response.send("query error test 16");
        } else {
            response.send("A new song has been added for artist with artist_id=" + artist_id + "<br><br><a href=/artists/>Home</a>");
        }
    })

})



/**
 * ===================================
 * List all playlists
 * ===================================
 */

app.get('/playlist', (request, response) => {

    const queryString = "SELECT * FROM playlists";

    pool.query(queryString, (errorObj, result) => {
        if(errorObj) {
            console.log(errorObj.stack);
            response.send("query error test 17");
        } else {
            console.log(result.rows);
            const data = { playlists : result.rows }
            response.render("playlist_index", data)
        }
    })
})



/**
 * ===================================
 * Create a new playlist
 * ===================================
 */

app.get('/playlist/new', (request, response) => {

   response.render("playlist_create");
})

app.post('/playlist', (request, response) => {


    console.log(request.body);

    const queryString = "INSERT INTO playlists (playlist_name) VALUES ($1) RETURNING *";

    const values = [request.body.name];

    pool.query(queryString, values, (errorObj, result) => {
        if(errorObj) {
            console.log(errorObj.stack);
            response.send("query error test 18");
        } else {

            response.send("Added new playlist!" + "<br><br><a href=/playlist>Home</a>");
        }
    })

})



/**
 * ===================================
 * Show all songs in a playlist
 * ===================================
 */


app.get('/playlist/:id', (request, response) => {

    const playlistId = request.params.id;

    const queryString1 = `SELECT playlists_songs.playlist_id, songs.title, songs.album
        FROM songs INNER JOIN playlists_songs ON (playlists_songs.songs_id = songs.id) WHERE playlists_songs.playlist_id =${playlistId};`

        pool.query(queryString1, (errorObj, result1) => {
            if(errorObj) {
                console.log(errorObj.stack);
                response.send("query error test 19");
            } else {

                let data1 = result1.rows;

                const queryString2 = `SELECT *
                 FROM playlists WHERE id =${playlistId};`

                pool.query(queryString2, (errorObj, result2) => {
                    if(errorObj) {
                        console.log(errorObj.stack);
                        response.send("query error test 20");
                    } else {

                        let data2 = result2.rows;
                        let data = { key1: data1, key2: data2 };
                        response.render("playlist_songs", data);
                    }
                })

            }
        })
})


app.post('/playlist/:id', (request, response) => {

    const playlistId = request.params.id;

    const queryString = "INSERT INTO playlists_songs (playlist_id, songs_id) VALUES ($1, $2) RETURNING *";

    const values = [playlistId, request.body.songs_id];

    pool.query(queryString, values, (errorObj, result) => {
        if(errorObj) {
            console.log(errorObj.stack);
            response.send("query error test 20");
        } else {
            response.redirect("/playlist/" + playlistId);
        }
    })



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



// try {
//         const values = [request.body.name];
//         let playlistSqlQuery = `INSERT INTO playlists (name) VALUES ($1) RETURNING id`;
//         let songSqlQueryTBC = `INSERT INTO playlist_songs (playlist_id, song_id) VALUES `;

//         const playlistResult = await pool.query(playlistSqlQuery, values);

//         request.body.songs.forEach((song, index) => {
//             songSqlQueryTBC += `(${ playlistResult.rows[0].id }, ${ song }),`;
//         });

//         // final step to remove a comma to complete the query string
//         let songSqlQuery = songSqlQueryTBC.slice(0, -1);

//         await pool.query(songSqlQuery);

//         response.send("Added new Playlist!");

//     } catch(e) {
//         console.log(e);
//     }