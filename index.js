console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'eugenelim',
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
let page;
app.get('/', (request, response) => {
  // query database for all pokemon
  response.send("Hello world");
  // respond with HTML page displaying all pokemon
  // response.render('home');
});

app.get('/artists', (request , response) => {
    let queryShow = "SELECT * FROM Artists"
    pool.query(queryShow, (err, res) => {
        if(err){console.log(err);}
        let artistList = []
        res.rows.forEach(item => {
            artistList += (`<li> ${item.name} </li> <br>`)
        })
        response.send(`<h1>Artists</h1> <ol>${artistList}</ol>`);
    })
})
app.get('/songs', (request , response) => {
    let queryShow = "SELECT * FROM songs"
    pool.query(queryShow, (err, res) => {
        if(err){console.log(err);}
        let songList = []
        res.rows.forEach(item => {
            songList += (`<li> ${item.title} </li> <br>`)
        })
        response.send(`<h1>Song List</h1> <ol>${songList}</ol>`);
    })
})

app.get('/artists/new', (request, response) => {
    response.send(`<form method="POST" action="/artists/new">
                <input type="text" name="name" placeholder="Name"/>
                <input type="text" name="photo_url" placeholder="Photo URL"/>
                <input type="text" name="nationality" placeholder="nationality"/>
                <input type="Submit" value="submit"/>
            </form>`)
})

app.get('/songs/new', (request, response) => {
    response.send(`<form method="POST" action="/songs/new">
                <input type="text" name="title" placeholder="Title"/>
                <input type="text" name="album" placeholder="album"/>
                <input type="text" name="preview_link" placeholder="preview_link"/>
                <input type="text" name="artwork" placeholder="artwork"/>
                <input type="text" name="artist_id" placeholder="artist_id"/>
                <input type="Submit" value="submit"/>
            </form>`)
})
app.get('/songs/new/:id', (request, response) => {
    let index = request.params.id;
    response.send(`<form method="POST" action="/songs/new">
                <input type="text" name="title" placeholder="Title"/>
                <input type="text" name="album" placeholder="album"/>
                <input type="text" name="preview_link" placeholder="preview_link"/>
                <input type="text" name="artwork" placeholder="artwork"/>
                <input type="text" name="artist_id" value='${index}'/>
                <input type="Submit" value="submit"/>
            </form>`)
})
app.post('/songs/new', (request, response) =>{
    let input = request.body;
    let insertQuery = `INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES ('${input.title}','${input.album}','${input.preview_link}','${input.artwork}','${input.artist_id}')`
    pool.query(insertQuery, (err, res) => {
        if(err){response.send("Did not add successfully.")}
        response.send("Successfully Added!");
    })
})
app.post('/artists/new', (request, response) =>{
    let input = request.body;
    let insertQuery = `INSERT INTO artists (name,photo_url,nationality) VALUES ('${input.name}','${input.photo_url}','${input.nationality}')`
    pool.query(insertQuery, (err, res) => {
        if(err){response.send("Did not add successfully.")}
        response.send("Successfully Added!");
    })
})


app.get('/artists/:id', (request, response) =>{
    let index = request.params.id;
    let getArtist = (`SELECT name,photo_url,nationality FROM Artists WHERE id=${index}`)
    pool.query(getArtist, (err, res) => {
        if(err || request.params.id == 0){response.send("Invalid Id")}
        else{
        response.send(`<h1> ${res.rows[0].name} </h1>
                       <img src= ${res.rows[0].photo_url} width='500'/>
                       <div>Nationality: ${res.rows[0].nationality}.</div>
                       <br>
                       <form method ="POST" action='/artists/${index}?_method=delete'>
                            <input type="Submit" value="Delete this Artist"/>
                       </form>`);}
    })
})
app.get('/songs/:id', (request, response) =>{
    let index = request.params.id;
    let getSong = (`SELECT title,album,preview_link,artwork,artist_id FROM songs WHERE id=${index}`)
    pool.query(getSong, (err, res) => {
        if(err || request.params.id == 0){response.send("Invalid Id")}
        else{
        response.send(`<h1> ${res.rows[0].title} </h1>
                       <img src= ${res.rows[0].artwork} width='500'/>
                       <div>${res.rows[0].album}</div>
                       <div><${res.rows[0].preview_link}/div>
                       <br>
                       <form method ="POST" action='/songs/${index}?_method=delete'>
                            <input type="Submit" value="Delete this Song"/>
                       </form>`);}
    })
})

app.get('/songs/:id/edit', (request,response) => {
    let index = request.params.id;
    let getArtist = (`SELECT title,album,preview_link,artwork,artist_id FROM songs WHERE id='${index}'`)
    pool.query(getArtist, (err, res) => {
        let index2 = res.rows[0].id;
        response.send(`<form method='POST' action='/songs/${index}?_method=put'>
                <input type="text" name="title" value='${res.rows[0].title}'>
                <input type="text" name="album" value='${res.rows[0].album}'>
                <input type="text" name="preview_link" value='${res.rows[0].preview_link}'>
                <input type="text" name="artwork" value='${res.rows[0].artwork}'>
                <input type="Submit" value="submit"/>
                </form>`)
    })
})
app.get('/artists/:id/edit', (request,response) => {
    let index = request.params.id;
    let getArtist = (`SELECT name,photo_url,nationality,id FROM artists WHERE id='${index}'`)
    pool.query(getArtist, (err, res) => {
        let index2 = res.rows[0].id;
        response.send(`<form method='POST' action='/artists/${index2}?_method=put'>
                <input type="text" name="name" value='${res.rows[0].name}'>
                <input type="text" name="photo_url" value='${res.rows[0].photo_url}'>
                <input type="text" name="nationality" value='${res.rows[0].nationality}'>
                <input type="Submit" value="submit"/>
                </form>`)
    })
})

app.put('/songs/:id',(request, response) => {
    let input = request.body;
    let index = request.params.id;
    let editQuery = `UPDATE songs SET title='${input.title}',album='${input.album}',preview_link='${input.preview_link}',artwork='${input.artwork}' WHERE id=${index}`
    pool.query(editQuery, (err, res) =>{if(err) console.log(err)})
    response.send("Successfully Updated!");
})
app.put('/artists/:id',(request, response) => {
    let input = request.body;
    let index = request.params.id;
    let editQuery = `UPDATE artists SET name='${input.name}',photo_url='${input.photo_url}',nationality='${input.nationality}' WHERE id=${index}`
    pool.query(editQuery, (err, res) =>{if(err) console.log(err)})
    response.send("Successfully Updated!");
})

app.delete('/songs/:id', (request, response) => {
    let index = request.params.id;
    let deleteQuery = `DELETE FROM songs WHERE id='${index}'`
    pool.query(deleteQuery, (err, res)=>{
        response.send("Deleted!")
})
})
app.delete('/artists/:id', (request, response) => {
    let index = request.params.id;
    let deleteQuery = `DELETE FROM artists WHERE id='${index}'`
    pool.query(deleteQuery, (err, res)=>{
        response.send("Deleted!")
})
})

app.get('/artists/:id/songs', (request, response) => {
    let index = request.params.id;
    let query = `SELECT songs.title,artists.name FROM songs INNER JOIN artists ON songs.artist_id='${index}' WHERE artists.id='${index}'`;
    // let query = `SELECT songs.title FROM songs WHERE songs.artist_id='${index}'`;
    pool.query(query, (err, res)=> {
        let songList = [];
        let artist;
        res.rows.forEach(item => {
            songList += (`<li> ${item.title} </li> <br>`)
            if(item.name) {
                artist = item.name;
            }
        })
        response.send(`<h1>${artist}</h1> <ol>${songList}</ol> <a href='/songs/new/${index}'>Create a new song</a>`)
    })
})



// app.get('/new', (request, response) => {
//   // respond with HTML page with form to create new pokemon
//   response.render('new');
// });




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
//  */
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