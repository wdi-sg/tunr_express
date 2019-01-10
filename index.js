console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'apple',
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

app.get('/', (req, res) => {
  // query database for all pokemon

  // respond with HTML page displaying all artist
    let queryText = "SELECT * FROM artists"
    pool.query(queryText, (err, queryResult) => {
        res.send(queryResult.rows);
    })
});


app.get ('/artist/:id', (req, res) => {
    let id = req.params.id;
    let queryText1 =`SELECT * FROM artists WHERE id=${id}`;
    pool.query(queryText1, (err, queryResult) => {
        res.send(queryResult.rows);
    })
})

app.get ('/edit/:id', (req, res) => {
    let id = req.params.id;
    let queryText =`SELECT * FROM artists WHERE id=${id}`;
    pool.query(queryText, (err, queryResult) => {
        res.render('edit', queryResult.rows[0]);
    })
})

app.put("/artist/edit/:id", (request, response)=> {
    let id = request.params.id;
    let name = request.body.name;
    let photo_url = request.body.photo_url;
    let nationality = request.body.nationality;
    console.log(request.body);
    let queryText = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4';
    const values = [name, photo_url, nationality, id2];
    pool.query(queryText, values, (err, queryResult) => {
    })
    response.send("update artist id: " + id);
});

app.get("/artist/delete/:id", (request, respond) => {
    let queryText = 'SELECT * FROM artists WHERE id=$1';
    const values = [request.params.id];
    pool.query(queryText, values, (err, queryResult)=> {
        respond.render("delete", queryResult.rows[0]);
    })
})

app.delete("/artist/delete/:id", (request, respond) => {
    let queryText = 'DELETE FROM artists WHERE id=$1';
    const values = [request.params.id];
    pool.query(queryText, values, (err, queryResult)=> {
        respond.send("Artist of id " + request.params.id + " is deleted");
    })
})


app.get('/new/artist', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new',{});
});


app.post('/new/artist/updated', (request, response)=> {
    response.send(request.body);
    let queryText3 = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING id';
    const values = [request.body.name, request.body.photo_url, request.body.nationality]
    pool.query(queryText3, values, (err, res) => {
    });
});

app.get('/artist/:id/songs', (request, response) => {
    let id = request.params.id;
    let queryText1 =`SELECT name FROM artists WHERE id=${id}`;
    pool.query(queryText1, (err, queryResult) => {
        let name = queryResult.rows[0].name;
        let queryText =`SELECT title FROM songs WHERE artist_id=$1`;
        const values = ["" + request.params.id];
        let songsList = [];
        pool.query(queryText, values, (err, result) => {
            for (let i = 0; i < result.rows.length; i++) {
                let songFound = false;
                for (let j = 0; j < songsList.length; j++ ) {
                    if (result.rows[i].title === songsList[j]) {
                        songFound = true;
                        break;
                    }
                }
                if (!songFound) {
                    songsList.push(result.rows[i].title);
                }
            }
        var obj = { "name" : name,
                    "song" : songsList
                    };
        response.send(obj);
        })
    })
})

app.get('/artist/:id/songs/new', (request, response) => {
    let id = request.params.id;
    let queryText1 =`SELECT name FROM artists WHERE id=${id}`;
    pool.query(queryText1, (err, queryResult) => {
        let name = queryResult.rows[0].name;
        response.render('newSong', {"name": name});
    })
});

app.post('/artist/:id/songs', (request, response) => {
    let title = request.body.title;
    let album = request.body.album;
    let preview_link = request.body.preview_link;
    let artwork = request.body.artwork;
    let artist_id = request.params.id;
    let obj = {"title": title,
                "album": album,
                "preview_link": preview_link,
                "artwork": artwork,
                "artist_id": artist_id
                }

    let queryText ="INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)";
    const values = [title, album, preview_link, artwork, artist_id];
    pool.query(queryText, values, (err, queryResult) => {
        response.send(obj);
    })
})

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