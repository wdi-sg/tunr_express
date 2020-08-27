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

app.get('/artists/new', (request, response) => {
    response.send(`<form method="POST" action="/artists/new">
                <input type="text" name="name" placeholder="Name"/>
                <input type="text" name="photo_url" placeholder="Photo URL"/>
                <input type="text" name="nationality" placeholder="nationality"/>
                <input type="Submit" value="submit"/>
            </form>`)
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
    let getArtist = (`SELECT name,photo_url,nationality FROM Artists WHERE id=${request.params.id}`)
    pool.query(getArtist, (err, res) => {
        if(err || request.params.id == 0){response.send("Invalid Id")}
        response.send(`<h1> ${res.rows[0].name} </h1>
                       <img src= ${res.rows[0].photo_url} width='500'>
                       <div>Nationality: ${res.rows[0].nationality}.</div>`);
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
                // <input type="text" name="id" placeholder="" value={id}/>
})

app.put('/artists/:id',(request, response) => {
    let input = request.body;
    let index = request.params.id;
    let editQuery = `UPDATE artists SET name='${input.name}',photo_url='${input.photo_url}',nationality='${input.nationality}' WHERE id=${index}`
    pool.query(editQuery, (err, res) =>{if(err) console.log(err)})
    response.send("Successfully Updated!");
})



app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
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