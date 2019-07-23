console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'huiyu',
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
  // respond with HTML page displaying all pokemon
  res.render('home');
});

app.get('/artists', (req, res) =>{
    const queryString = 'SELECT * FROM artists';

    pool.query(queryString, (err, result) => {
      if (err) {
        console.error('query error:', err.stack);
        res.send( 'query error' );
      } else {
        console.log('query result:', result);
        let str = "<h3>Click on artist name to view details</h3>";
        for (let i=0; i<result.rows.length; i++){
            str = str + `
            <a href="/artists/${result.rows[i].id}">${result.rows[i].name}</a></br>
            `
        }
        res.send(str);
      }
    });
});

app.get('/artists/add', (req, res) =>{
    let form = `
    <form method="POST" action="/artists">
        <input name="name" value="Artist Name"></input></br>
        <input name="photo_url" value="Image URL"></input></br>
        <input name="nationality" value="Nationality"></input></br>
        <button type="submit">Submit</button>
    </form>
    `
    res.send(form);
});

app.post('/artists', (req, res) =>{
    const queryString = "INSERT into artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";
    let values = [req.body.name, req.body.photo_url, req.body.nationality];
    pool.query(queryString, values, (err, res) =>{
        if(err){
            console.error('query error', err.stack);
            res.send('query error');
        }else{
            console.log("add done");
        }
    })
})

app.get('/artists/:id', (req, res) =>{
    const queryString = 'SELECT * FROM artists WHERE id =' + req.params.id;
    pool.query(queryString, (err, result) =>{
        if(err){
            console.error('query error:', err.stack);
            res.send('query error');
        }else{
            let str = `
            Name: ${result.rows[0].name}</br>
            Photo: ${result.rows[0].photo_url}</br>
            Nationality: ${result.rows[0].nationality}</br></br>
            `
            res.send(str);
        }
    });
});

app.get('/new', (req, res) => {
  res.render('new');
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