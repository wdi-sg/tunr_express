console.log("start up");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

// Initialise postgres client
const configs = {
    user: 'ben',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

//configuration setup

// Init express app
const app = express();
app.use(express.static(__dirname + '/public/'));
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


app.get('/artists/:id/songs/new', (request, response) => {
    console.log(request.params.id);
    const queryString = `SELECT * from artists WHERE id=${request.params.id}`;
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                artists: result.rows
            }
            console.dir(data);
            response.render('newsong', data);
        }
    });
});


app.get('/artists/:id/edit', (request, response) => {
    console.log(request.params.id);
    const queryString = `SELECT * from artists WHERE id=${request.params.id}`;
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                artists: result.rows
            }
            response.render('edit', data);
        }
    });
});

app.get('/artists/:id/delete', (request, response) => {
    console.log(request.params.id);
    //response.render('edit', request.params.id);
    const queryString = `SELECT * from artists WHERE id=${request.params.id}`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                artists: result.rows
            }
            response.render('delete', data);
        }
    });
});

app.post('/register', (request, response)=> {
    let hashedPassword = sha256(request.body.password);
    const queryString = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
    const values = [request.body.username, hashedPassword];
    pool.query(queryString, values, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log("complete registration");
            console.log(result.rows[0] );
            response.cookie('loggedin', true);
            response.redirect('/artists');
        }
    });
});



app.post('/login', (request, response)=> {
    let hashedPassword = sha256(request.body.password);
    console.log(request.body);
    const queryString = `SELECT password FROM users WHERE username='${request.body.username}'`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log(result.rows);
            if (result.rows.length === 0)  {
                console.log("no such user");
            } else if (result.rows[0].password !== hashedPassword) {
                console.log("wrong password");
            } else {
                console.log("login ok!");
                console.log(result.rows[0] );
                let currentSessionCookie = sha256( request.body.username );
                response.cookie('loggedin', currentSessionCookie);
                response.cookie('username', request.body.username);
                response.redirect('/artists');
            }

        }
    });
});

app.post('/artist/:id/songs', (request, response) => {
    let newSong = request.body;
    console.log(newSong);
    const queryString = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ('${newSong.title}','${newSong.album}', '${newSong.preview_link}', '${newSong.artwork}', '${newSong.artist_id}') `;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            response.redirect('/artists/' + newSong.artist_id + '/songs');
        }
    });

});

app.put('/artist/:id', (request, response) => {
    let artistInfo = request.body;
    console.log(artistInfo);
    const queryString = `UPDATE artists SET name='${artistInfo.name}', photo_url='${artistInfo.photo_url}', nationality='${artistInfo.nationality}' WHERE id=${request.params.id}`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            response.redirect('/artists');
        }
    });
})

app.delete('/artist/:id', (request, response) => {
    let artistId = request.params.id;
    console.log(artistId);
    const queryString = `DELETE FROM artists WHERE id=${artistId}`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            response.redirect('/artists');
        }
    });

});

app.post('/artist', (request, response) => {
    let newArtist = request.body;
    console.log(newArtist);
    const queryString = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${newArtist.name}','${newArtist.photo_url}', '${newArtist.nationality}') `;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            response.redirect('/artists');
        }
    });

});

app.get('/artists/:id/songs', (request, response) => {
    const queryString = 'SELECT * from songs WHERE artist_id = ' + request.params.id;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                songs: result.rows
            }
            response.render('songs', data);
        }
    });
});
app.get('/artists/new', (request, response) => {
    response.render('new');
});

app.get('/artists', (request, response) => {
    const queryString = 'SELECT * from artists ORDER BY id ASC';
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            console.log('query result:', result.rows);
            let data = {
                artists: result.rows
            }
            response.render('home', data);
        }
    });
});

app.get('/login', (request, response) => {
    response.render('login');
});

app.get('/register', (request, response) => {
    response.render('register');
});

app.get('/new', (request, response) => {
    response.render('new');
});

app.get('/', (request, response) => {
    response.redirect('/artists');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('Tuning into 3000'));

let onClose = function() {

    console.log("closing");

    server.close(() => {

        console.log('Process stopped');

        pool.end(() => console.log('Close db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);