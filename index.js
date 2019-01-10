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
  password: 'pg'
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

//ROUTES FOR PLAYLISTS
//INDEX ,SHOW ALL PLAYLISTSS
app.get('/playlists', (req, res) => {
    let text = "SELECT * FROM playlists";
    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            let resultArr = [result.rows];
            res.render('playlists', resultArr);
        }
    });
});

//SHOW AN PLAYLIST
app.get('/playlists/:playlist', (req, res) => {
    // let text = `SELECT * FROM artists WHERE name='${req.params.artist}'`;
    // pool.query(text, (err, result) => {
    //     if (err) {
    //         console.error('query error:', err.stack);
    //         res.send( 'query error' );
    //     } else {
    //         res.render('artist', result.rows);
    //     }
    // });
    console.log("**SHOW PLAYLIST**");
});

//CREATE NEW PLAYLIST
app.post('/playlists/new', (req, res) => {
    // let text = `INSERT INTO artists(name, photo_url, nationality) VALUES ($1, $2, $3);`;

    // const values = [`${req.body.name}`, `${req.body.photo_url}`, `${req.body.nationality}`];

    // pool.query(text, values, (err, result) => {
    //     if (err) {
    //         console.error('query error:', err.stack);
    //         res.send( 'query error' );
    //     } else {
    //         res.redirect('/');
    //     }
    // });
    console.log("**CREATE PLAYLIST**");
});

//UPDATE AN PLAYLIST
app.put('/playlists/:playlist', (req, res) => {
    // let text = `UPDATE artists SET name='${req.body.name}', photo_url='${req.body.photo_url}', nationality='${req.body.nationality}' WHERE name='${req.params.artist}'`;

    // pool.query(text, (err, result) => {
    //     if (err) {
    //         console.error('query error:', err.stack);
    //         res.send( 'query error' );
    //     } else {
    //         res.redirect(`/${req.body.name}`);
    //     }
    // });
    console.log("**UPDATE PLAYLIST**");
});

//DELETE AN PLAYLIST
app.delete('/playlists/:playlist', (req, res) => {
    // let text = `DELETE from artists WHERE name='${req.params.artist}'`;

    // pool.query(text, (err, result) => {
    //     if (err) {
    //         console.error('query error:', err.stack);
    //         res.send( 'query error' );
    //     } else {
    //         res.redirect('/');
    //     }
    // });
    console.log("**DELETE PLAYLIST**");
});

//ROUTES FOR ARTISTS
//INDEX ,SHOW ALL ARTISTS
app.get('/', (req, res) => {
    let text = "SELECT * FROM artists";
    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            let resultArr = [result.rows];
            res.render('artists', resultArr);
        }
    });
});

//SHOW AN ARTIST
app.get('/:artist', (req, res) => {
    let text = `SELECT * FROM artists WHERE name='${req.params.artist}'`;
    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            res.render('artist', result.rows);
        }
    });

});

//CREATE NEW ARTIST
app.post('/', (req, res) => {
    let text = `INSERT INTO artists(name, photo_url, nationality) VALUES ($1, $2, $3);`;

    const values = [`${req.body.name}`, `${req.body.photo_url}`, `${req.body.nationality}`];

    pool.query(text, values, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            res.redirect('/');
        }
    });
});

//UPDATE AN ARTIST
app.put('/:artist', (req, res) => {
    let text = `UPDATE artists SET name='${req.body.name}', photo_url='${req.body.photo_url}', nationality='${req.body.nationality}' WHERE name='${req.params.artist}'`;

    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            res.redirect(`/${req.body.name}`);
        }
    });
});

//DELETE AN ARTIST
app.delete('/:artist', (req, res) => {
    let text = `DELETE from artists WHERE name='${req.params.artist}'`;

    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            res.redirect('/');
        }
    });
});


//ROUTES FOR SONGS
//SHOW ALL SONGS FOR THIS ARTIST
app.get('/:artist/songs', (req, res) => {
    let text = `SELECT * FROM artists WHERE name='${req.params.artist}'`;
    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            let artistResult = result.rows;
            let text = `SELECT * FROM songs WHERE artist_id='${result.rows[0].id}'`;
            pool.query(text, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    res.send( 'query error' );
                } else {
                    let resultArr = [result.rows, artistResult];
                    res.render('songs', resultArr);
                }
            });
        }
    });
});

//SHOW A SONG OF THIS ARTIST
app.get('/:artist/songs/:song', (req, res) => {
    let text = `SELECT * FROM songs WHERE title='${req.params.song}'`;
    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            let resultArr = [result.rows, req.params.artist];
            res.render('song', resultArr);
        }
    });

});

//CREATE NEW SONG FOR THIS ARTIST
app.post('/:artist/songs/new', (req, res) => {
    let text = `SELECT id FROM artists WHERE name = '${req.params.artist}'`;
    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error', err.stack);
            res.send( 'query error' );
        } else {
            let artistId = result.rows[0].id;
            let text = `INSERT INTO songs(title, album, preview_link, artwork, artist_id) VALUES ('${req.body.title}', '${req.body.album}', '${req.body.preview_link}', '${req.body.artwork}', '${artistId}');`;
            pool.query(text, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    res.send( 'query error' );
                } else {
                    res.redirect(`/${req.params.artist}/songs`);
                }
            });
        }
    });
});

//UPDATE A SONG FOR THIS ARTIST
app.put('/:artist/songs/:song', (req, res) => {
    let text = `UPDATE songs SET title='${req.body.title}', album='${req.body.album}', preview_link='${req.body.preview_link}', artwork='${req.body.artwork}' WHERE title='${req.params.song}'`;
    console.log(req.body);

    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            res.redirect(`/${req.body.artist}/songs/${req.body.title}`);
        }
    });
});

//DELETE A SONG FOR THIS ARTIST
app.delete('/:artist/songs/:song', (req, res) => {
    let text = `DELETE from songs WHERE title='${req.params.song}'`;

    pool.query(text, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            res.send( 'query error' );
        } else {
            res.redirect(`/${req.params.artist}/songs`);
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