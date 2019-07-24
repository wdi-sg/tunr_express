console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const configs = {
    user: 'kach92',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
    password: "Kenny Ang"
};
const pool = new pg.Pool(configs);
pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
app.use(express.static(__dirname + '/public/'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
    // query database for all pokemon

    // respond with HTML page displaying all pokemon
    response.redirect('/artist');
});



app.get('/artist', (req, res) => {
    const queryString = 'SELECT * from artists ORDER BY id ASC'

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                title: "Home",
                artists: result.rows
            };
            res.render('home', data);
        }
    });
});

app.get('/artist/new', (req, res) => {
    let data = {
        title: "Add"
    }
    res.render("add", data);
})

app.post('/artist', (req, res) => {

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
            res.render('artist', data);
        }
    });
})

app.get('/artist/:id', (req, res) => {

    const queryString = 'SELECT * from artists WHERE id=' + parseInt(req.params.id);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            res.render('artist', data);
        }
    });
});



app.get('/artist/:id/edit', (req, res) => {

    const queryString = 'SELECT * from artists WHERE id=' + parseInt(req.params.id);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };
            res.render('edit', data);
        }
    });
});

app.put('/artist/:id', (req, res) => {
    const queryString = 'UPDATE artists SET name=$1,nationality=$2,photo_url=$3 WHERE id =' + parseInt(req.params.id) + "RETURNING *";
    let arr = [req.body.name, req.body.nationality, req.body.photo_url];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            let data = {
                title: result.rows[0].name,
                artists: result.rows[0]
            };

            res.render('artist', data);
        }
    });
})

app.delete('/artist/:id', (req, res) => {
    const queryString = 'DELETE from artists WHERE id=' + parseInt(req.params.id);
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

            res.redirect("/artist");
        }
    });
})


app.get('/artist/:id/songs', (req, res) => {
    const queryString = 'SELECT id FROM artists WHERE id=' + parseInt(req.params.id);
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {
            const songString = 'SELECT * from songs WHERE artist_id=' + result.rows[0].id;

            pool.query(songString, (err, result2) => {

                if (err) {
                    console.error('query error:', err.stack);
                    res.send('query error');
                } else {
                    data = {
                        title: "Song List",
                        songs: result2.rows
                    }
                    res.render("songlist", data);
                }
            });
        }
    });
})

app.get('/artist/:id/songs/new', (req, res) => {
    let id = parseInt(req.params.id);
    let data = {
        title: "New Song",
        id: id
    }
    res.render("newsong", data);
})

app.post('/artist/:id/songs', (req, res) => {
    let id = parseInt(req.params.id);
    const queryString = 'INSERT INTO songs (title, album, preview_link, artwork,artist_id) VALUES ($1,$2,$3,$4,$5)';
    let arr = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

            let url = "/artist/" + id + "/songs";
            res.redirect(url);
        }
    });

})

app.get('/artist/:id/songs/:id2', (req, res) => {
    const queryString = 'SELECT * FROM songs WHERE id=' + parseInt(req.params.id2);
    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else {

        }
    });
})


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