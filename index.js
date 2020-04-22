console.log("starting up!!");

const sha256 = require('js-sha256');
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'kokchuantan',
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

app.use(express.static('public'))

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
const cookieParser = require('cookie-parser')

app.use(cookieParser());
/**
 * ===================================
 * Routes
 * ===================================
 */

const addArtist = (request, response) => {
    userEntry = request.body;
    name = userEntry.name;
    url = userEntry.photo_url;
    nationality = userEntry.nationality;
    const queryString = 'insert into artists (name,photo_url,nationality) values ($1,$2,$3) returning id'
    let values = [name, url, nationality]
    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            // console.log('query result:', result);
            console.log(result.rows[0].id)
            link = '/artists/' + result.rows[0].id;
            response.redirect(link);
        }
    });
}

const addPlaylist = (request, response) => {
    userEntry = request.body;
    name = userEntry.name;
    const queryString = 'insert into playlist (name) values ($1) returning id'
    let values = [name]
    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            // console.log('query result:', result);
            console.log(result.rows[0].id)
            link = '/playlist/' + result.rows[0].id;
            response.redirect(link);
        }
    });
}

const addSong = (request, response) => {
    userEntry = request.body;
    name = userEntry.name;
    const queryString = 'insert into playlist (name) values ($1) returning id'
    let values = [name]
    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            // console.log('query result:', result);
            console.log(result.rows[0].id)
            link = '/playlist/' + result.rows[0].id;
            response.redirect(link);
        }
    });
}
app.get('/register', (request, response) => {
    response.render('register')
});

app.post('/register', (request, response) => {
    userName = request.body.username;
    passWord = request.body.password;
    loginStatus = sha256('false');
    const whenQueryDone = (queryError, result) => {
        if (queryError) {
            console.log(queryError, 'error');
            response.status(500);
            response.send('error');
        } else {
            response.cookie('username', userName);
            response.cookie('password', passWord);
            response.cookie('loggedIn', loginStatus);
            response.redirect('/');
        }
    };

    const queryString = "INSERT INTO users (username,password) values ($1,$2)";
    values = [userName, passWord]
    pool.query(queryString, values, whenQueryDone)
});

app.get('/login', (request, response) => {
    response.render('login')
});

app.post('/login', (request, response) => {
    userName = request.body.username;
    passWord = request.body.password;
    const queryString = 'SELECT * from users where username = ($1)'
    values = [userName]
    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            if (result.rows[0] == undefined) {
                response.send('wrong username')
            } else {
                const query = 'SELECT * from users where username = ($1)'
                value = [result.rows[0]]
                pool.query(query, value, (err, result) => {
                    if (err) {
                        console.error('query error:', err.stack);
                        response.send('query error');
                    } else {
                        if (result.rows[0] == undefined) {
                            response.send('wrong password')
                        } else {
                            var expires = {
                                expires: new Date(Date.now() + 60000)
                            }
                            response.cookie('loggedIn', sha256('true'), expires);
                            response.redirect('/');
                        }
                    }
                });
            }
        }
    });
});

app.get('/artists', (request, response) => {
    const whenQueryDone = (queryError, result) => {
        if (queryError) {
            console.log(queryError, 'error');
            response.status(500);
            response.send('error');
        } else {
            // const data = {
            //     artists: result.rows
            // };
            var expires = {
                expires: new Date(Date.now() + 5000)
            }
            var visits = request.cookies['visits'];
            if (visits === undefined) {
                visits = 1;
            } else {
                visits = parseInt(visits) + 1;
            }
            const data = {
                artists: result.rows,
                num: visits
            };
            response.cookie('visits', visits, expires);
            response.render('home', data);
        }
    };

    const queryString = "SELECT * FROM artists";

    pool.query(queryString, whenQueryDone)
});

app.get('/playlist', (request, response) => {
    const whenQueryDone = (queryError, result) => {
        if (queryError) {
            console.log(queryError, 'error');
            response.status(500);
            response.send('error');
        } else {
            const data = {
                playlists: result.rows
            };
            response.render('playlist', data);
        }
    };

    const queryString = "SELECT * FROM playlist";
    pool.query(queryString, whenQueryDone)
});

app.get('/artists/new', (request, response) => {
    // respond with HTML page with form to create new pokemon
    var expires = {
        expires: new Date(Date.now() + 5000)
    }
    var visits = request.cookies['visits'];
    if (visits === undefined) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    const data = {
        num: visits
    };
    response.cookie('visits', visits, expires);
    response.render('new', data);
});

app.get('/playlist/new', (request, response) => {
    // respond with HTML page with form to create new pokemon
    response.render('newplaylist');
});

app.get('/artists/:id', (request, response) => {
    let userInput = request.params.id;
    const queryString = 'SELECT * from artists where id = ($1)'
    values = [userInput]
    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            var expires = {
                expires: new Date(Date.now() + 5000)
            }
            var visits = request.cookies['visits'];
            if (visits === undefined) {
                visits = 1;
            } else {
                visits = parseInt(visits) + 1;
            }
            const data = {
                artist: result.rows,
                num: visits
            };
            response.cookie('visits', visits, expires);
            //console.log(data)
            // console.log('query result:', result.rows);
            response.render('artist', data);
        }
    });
});

app.get('/playlist/:id', (request, response) => {
    let userInput = request.params.id;
    const queryString = 'SELECT songs.title FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_song.playlist_id = $1;'
    values = [userInput]
    pool.query(queryString, values, (err, result) => {
        console.log(result.rows)
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            data = {
                playlist: result.rows
            }
            console.log(data)
            // console.log('query result:', result.rows);
            response.render('playlist', data);
        }
    });
});

app.get('/playlist/:id/newsong', (request, response) => {
    let userInput = request.params.id;
    const queryString = 'SELECT name from playlist where id = ($1)'
    values = [userInput]
    pool.query(queryString, values, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            data = {
                playlist: result.rows
            }
            const query = 'SELECT * from songs'
            pool.query(query, data, (err, result) => {

                if (err) {
                    console.error('query error:', err.stack);
                    response.send('query error');
                } else {
                    allSongs = {
                        songs: result.rows
                    }
                    response.render('addsongs', allSongs, data);
                }
            });
        }
    });
});

app.get('/artists/:id/songs', (request, response) => {
    let userInput = request.params.id;
    const queryString = 'SELECT * from artists where id = ($1)'
    values = [userInput]
    pool.query(queryString, values, (err, artistResult) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let selectedArtist = artistResult.rows[0].id
            const query = 'select * from songs where artist_id = $1'
            value = [selectedArtist]
            pool.query(query, value, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    response.send('query error');
                } else {
                    var expires = {
                        expires: new Date(Date.now() + 5000)
                    }
                    var visits = request.cookies['visits'];
                    if (visits === undefined) {
                        visits = 1;
                    } else {
                        visits = parseInt(visits) + 1;
                    }
                    const data = {
                        artist: artistResult.rows[0].name,
                        song: result.rows,
                        num: visits
                    };
                    response.cookie('visits', visits, expires);
                    response.render('songs', data);

                }
            });
        }
    });
});

app.post('/artists', addArtist)

app.post('/playlist', addPlaylist)

app.post('/playlist/newsong', addSong)

app.get('/', (request, response) => {
    response.redirect('/artists');
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

    console.log("closing");

    server.close(() => {

        console.log('Process terminated');

        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);