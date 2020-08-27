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

app.use(express.static(__dirname+'/public/'));
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

app.get('/', (request, response) => {

  response.render('home');
});

app.get('/artists/', (request, response) => {

    let text = 'SELECT * FROM Artists ORDER BY id';

    pool.query(text, (err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            console.log(results.rows);
            response.render('artist',results);
        }
    })

});

app.get('/artists/new', (request, response) => {

  response.render('new');
});

app.post('/artists', (request, response) => {

    let name = request.body.name;
    let photo_url = request.body.photo_url;
    let nationality = request.body.nationality;

    let text = 'INSERT INTO Artists (name, photo_url, nationality) VALUES ($1,$2,$3)'
    const values = [name,photo_url,nationality];

    pool.query(text,values,(err,result)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.send(request.body);
        }
    })
});

app.get('/artists/:id', (request, response) => {

    let text = 'SELECT * FROM Artists where id = $1'

    const values = [request.params.id]

    pool.query(text,values,(err,result)=>{
        if(err){
            console.log("err",err.message)
        } else {
            console.log(result.rows)
            response.render('id',result.rows[0])
        }
    })
});

app.get('/artists/:id/edit', (request, response) => {

    let text = 'SELECT * FROM Artists where id = $1'

    const values = [request.params.id];

    pool.query(text,values,(err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.render('update',results.rows[0])
        }
    })
});

app.put('/artists/:id', (request, response) => {
    console.log(response.body);
    let{name,photo_url,nationality} = request.body
    let text = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4'
    const values =[name,photo_url,nationality,request.params.id];

    pool.query(text,values,(err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.redirect(`/artists/${request.params.id}`)
        }
    })
});

app.delete('/artists/:id', (request, response) => {
    let text = 'DELETE FROM Artists WHERE id = $1'
    const values = [request.params.id]

    pool.query(text,values, (err,res)=>{
        if (err){
            console.log("err",err.message)
        } else {
            response.redirect('/artists/')
        }
    })

  response.render('new');
});

app.get('/artists/:id/songs', (request, response) => {

    let text = 'SELECT songs.*, Artists.name, Artists.photo_url FROM songs INNER JOIN Artists ON Artists.id = songs.artist_id where artist_id = $1'

    const values = [request.params.id];

    pool.query(text,values,(err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.render('songs',results)
        }
    })
});
//
//
//
// Restful Routes for Songs

app.get('/', (request, response) => {

  response.render('home');
});

app.get('/songs/', (request, response) => {

    let text = 'SELECT * FROM songs ORDER BY id ASC';

    pool.query(text, (err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.render('songslist',results);
        }
    })

});

app.get('/songs/new', (request, response) => {

  response.render('newsong');
});

app.post('/songs', (request, response) => {

    let {title, album, preview_link, artwork, artist_id} = request.body;
    console.log(title,album,preview_link,artist_id,artwork);
    let text = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1,$2,$3,$4,(SELECT id FROM Artists where name=$5))'
    const values = [title,album, preview_link, artwork, artist_id];

    pool.query(text,values,(err,result)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.redirect("/songs");
        }
    })
});

app.get('/songs/:id', (request, response) => {

    let text = 'SELECT songs.*, Artists.name, Artists.photo_url FROM songs INNER JOIN Artists ON Artists.id = songs.artist_id where songs.id = $1'

    const values = [request.params.id]

    pool.query(text,values,(err,result)=>{
        if(err){
            console.log("err",err.message)
        } else {
            console.log(result.rows)
            response.render('songid',result.rows[0])
        }
    })
});

app.get('/songs/:id/edit', (request, response) => {

    let text = 'SELECT songs.*, Artists.name, Artists.photo_url FROM songs INNER JOIN Artists ON Artists.id = songs.artist_id where songs.id = $1'

    const values = [request.params.id];

    pool.query(text,values,(err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.render('songedit',results.rows[0])
        }
    })
});

app.put('/songs/:id', (request, response) => {
    let id = request.params.id
    console.log(request.body)
  let{title,album,preview_link,artwork} = request.body
    let text = `UPDATE songs SET title = $1, album = $2, preview_link = $3, artwork = $4 WHERE id = ${request.params.id}`
    const values =[title, album, preview_link, artwork];

    pool.query(text,values,(err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.redirect(`/songs/${id}`)
        }
    })
});

app.delete('/songs/:id', (request, response) => {
    let text = 'DELETE FROM songs WHERE id = $1'
    const values = [request.params.id]

    pool.query(text,values, (err,res)=>{
        if (err){
            console.log("err",err.message)
        } else {
            response.redirect('/songs/')
        }
    })
});

app.get('/artists/:id/songs', (request, response) => {

    let text = 'SELECT songs.*, Artists.name, Artists.photo_url FROM songs INNER JOIN Artists ON Artists.id = songs.artist_id where artist_id = $1'

    const values = [request.params.id];

    pool.query(text,values,(err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.render('songs',results)
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
