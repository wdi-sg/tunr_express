    console.log("starting up!!");

    const express = require('express');
    const methodOverride = require('method-override');
    const pg = require('pg');
    const cookieParser = require('cookie-parser');

    // Initialise postgres client
    const configs = {
      user: 'xxx',
      password: 'xxx',
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

    app.use(cookieParser());

    // Set react-views to be the default view engine
    const reactEngine = require('express-react-views').createEngine();
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jsx');
    app.engine('jsx', reactEngine);

    const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

    let onClose = function(){
        console.log("closing");
        server.close(() => {
            console.log('Process terminated');
            pool.end( () => console.log('Shut down db connection pool'));
        })
    };

    /**
     * ===================================
     * Routes
     * ===================================
     */

    // home screen
    app.get('/', (request, response) => {
      response.render('home');
    });

    //new artist form
    app.get('/new', (request, response) => {
      response.render('artist_new');
    });

    function showAllArtist(response)
    {
        const queryText = 'SELECT * FROM artists';

        pool.query(queryText, (err, res) => {
            if (err) {
                console.log("query error", err.message);
            } else {
                let data = {
                    artists: res.rows
                }
                response.render('artists', data)
            }
        });
    }

    function showAllSong(response, artist_id)
    {
        const queryText = 'SELECT artists.name, songs.title, songs.album, songs.preview_link FROM artists INNER JOIN songs ON artists.id = songs.artist_id where artists.id=$1';
            const values = [artist_id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    let data = {
                        songs: res.rows
                    }
                    response.render('songs', data)
                }
            });
    }

    function showAllFavoriteSong(response, id)
    {
        pool.connect((err) => {

             const queryText = 'SELECT artists.name, songs.title, songs.album, songs.preview_link FROM songs '
             + ' INNER JOIN favorites ON songs.id = favorites.song_id '
             + ' INNER JOIN artists ON artists.id= songs.artist_id '
             + ' where favorites.user_id=$1';
            const values = [id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else
                {
                    let data = {
                        songs: res.rows
                    }
                        response.render('songs', data)
                }
            });
        });
    }

    //show all artists
    app.get('/artists', (request, response) => {
      pool.connect((err) => {
            showAllArtist(response);
        });
    });

    //show an artist
    app.get('/artist/:id', (request, response) => {
      pool.connect((err) => {
            const queryText = 'SELECT * FROM artists where id=$1';
            const values = [request.params.id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    let data = {
                        artist: res.rows[0]
                    }
                    response.render('artist', data)
                }
            });
        });
    });

    // save an artist
    app.post('/artist', (request, response) => {
        pool.connect((err) => {

            const queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2,$3) RETURNING *';
            const values = [request.body.name, request.body.photo_url, request.body.nationality];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    showAllArtist(response);
                }
            });
        });
    });

    //edit an artist form
    app.get('/artist/:id/edit', (request, response) => {
        pool.connect((err) => {
            const queryText = 'SELECT * FROM artists where id=$1';
            const values = [request.params.id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    let data = {
                        artist: res.rows[0]
                    }
                    response.render('artist_edit', data)
                }
            });
        });
    });

    //post update artist
    app.put('/artist/:id', (request, response) => {
        pool.connect((err) => {
            const queryText = 'UPDATE artists SET name=$1, nationality=$2 where id=$3';
            const values = [request.body.name, request.body.nationality, request.params.id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    showAllArtist(response);
                }
            });
        });
    });

    //delete an artist form
    app.get('/artist/:id/delete', (request, response) => {
        pool.connect((err) => {
            const queryText = 'SELECT * FROM artists where id=$1';
            const values = [request.params.id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    let data = {
                        artist: res.rows[0]
                    }
                    response.render('artist_delete', data)
                }
            });
        });
    });

    //post delete an artist
    app.delete('/artist/:id', (request, response) => {
        pool.connect((err) => {
            const queryText = 'DELETE FROM artists where id=$1';
            const values = [request.params.id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    showAllArtist(response);
                }
            });
        });
    });

    //show songs of an artist
    app.get('/artist/:id/songs', (request, response) => {
      pool.connect((err) => {
            showAllSong(response, request.params.id);
        });
    });

    //create new song of an artist form
    app.get('/artist/:id/songs/new', (request, response) => {
         let data = {
            artist_id: request.params.id
        }
        response.render('song_new', data)
    });

    //post new songs of an artist
    app.post('/artist/:id/songs', (request, response) => {
      pool.connect((err) => {
            const queryText = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1,$2,$3,$4,$5)';
            const song = request.body;
            const values = [song.title, song.album,song.preview_link,song.artwork,song.artist_id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    showAllSong(response, request.params.id)
                }
            });
        });
    });

    //register user form
    app.get('/register', (request, response) => {
      pool.connect((err) => {
            response.render('register_user')
        });
    });

    //post register user
    app.post('/register', (request, response) => {
      pool.connect((err) => {
            const queryText = 'INSERT INTO users (name, password) VALUES ($1,$2)';
            const user = request.body;
            const values = [user.name, user.password];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    response.render('login')
                }
            });
        });
    });

    //user login form
    app.get('/login', (request, response) => {
      pool.connect((err) => {
            let displayMsg = {
                message : ''
            }
            response.render('login', displayMsg)
        });
    });

    //post user login
    app.post('/login', (request, response) => {
      pool.connect((err) => {
            let name = request.body.name;
            let password = request.body.password;

            const queryText = 'SELECT * FROM users where name=$1 and password=$2';
            const values = [name, password];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    if (res.rows.length > 0)
                    {
                        response.cookie('loggedIn', true);
                        response.cookie('name', name);
                        response.cookie('id', res.rows[0].id);
                        response.render('home')
                    }
                    else
                    {
                        let displayMsg = {
                            message :"Invalid user name or password",
                            name: name,
                            password:password
                        }
                        response.render('login', displayMsg)
                    }

                }
            });
        });
    });

    //create new favorite song form
    app.get('/favorites/new', (request, response) => {
      pool.connect((err) => {
            let user = {
                name: request.cookies['name']
            }

            response.render('favorite_new', user)
        });
    });

    //post new favorite song
    app.post('/favorites', (request, response) => {
        pool.connect((err) => {
            const queryText = 'INSERT INTO favorites (user_id, song_id) VALUES ($1,$2)';
            const values = [request.cookies['id'], request.body.song_id];

            pool.query(queryText, values, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    showAllFavoriteSong(response, request.cookies['id']);
                }
            });
        });
    });

    //show all favorite songs
    app.get('/favorites', (request, response) => {
        showAllFavoriteSong(response, request.cookies['id']);
    });
    process.on('SIGTERM', onClose);
    process.on('SIGINT', onClose);



//new artist form   >> [/new]        >> artist_new.jsx
//edit an artist    >> [/artist/:id/edit]   >>artist_edit.jsx
//delete an artist  >> [/artist/:id/delete]  >>artist_delete.jsx
//show an artist    >> [/artist/:id] >> artist.jsx
//show all artists  >> [/artists]    >> artists.jsx , artist.jsx

//add new song of an artist      >> [/artist/:id/songs/new]  >> song_new.jsx
//show songs of an artist           >> [/artist/:id/songs]      >> songs.jsx, song.jsx

//add new favorite song          >> [/fovorites/new]         >> favorite_new.jsx
//show songs of a user favorite  >> [/favorites]             >> songs.jsx, song.jsx

//register user         >> [/register]      >> register_user.jsx
//login user            >> [/login]         >> login.jsx

//remark : id of the songs start from 500

