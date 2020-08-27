console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'alvischew',
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


app.get('/artists/:id/songs', (request, response) => {
    let {id} = request.params
    let query = `SELECT * FROM songs WHERE artist_id='${id}'`;
        pool.query(query,(err,res)=>{
        if(err){response.send("unable to save your data!")}
        else {
            let target = {songs: res.rows};
            response.render('songprofile', target)
            }
            });
    });

app.get('/artists/:id', (request, response) => {
    let {id} = request.params
    let query = `SELECT * FROM artists WHERE id='${id}'`;
        pool.query(query,(err,res)=>{
        if(err){response.send("unable to save your data!")}
        else {
            let target = res.rows[0];
        response.render('profile', target)
            }
            });
    });


app.get('/artists/new', (request, response) => {
  response.render('new');
});

app.post('/artists', (request, response) => {
    let {name, photo_url, nationality} = request.body;
    let values = [name,photo_url,nationality];
    let query = `INSERT INTO artists (name,photo_url,nationality) VALUES($1,$2,$3)`
       pool.query(query,values,(err,res)=>{
        if(err){response.send("unable to save your data!")}
    else {
        response.send(`Artist ${name} was added to the db successfully!`)
    }
});
});

app.get('/artists/', (request, response) => {
    let query = `SELECT * FROM artists`
    pool.query(query,(err,res)=>{
        if(err){response.send("unable to save your data!")}
    else {
        let target = {artists: res.rows};
        response.render('home', target);
    }
});
});



app.get('/artists/:id/edit', (request, response) => {
    let {id} = request.params
    let query = `SELECT * FROM artists WHERE id='${id}'`;
        pool.query(query,(err,res)=>{
        if(err){response.send("unable to save your data!")}
        else {
            let target = res.rows[0];
            response.render('editprofile', target)
            }
            });
       /* response.render('editprofile', target)*/
    });

app.put('/artists/:id', (request,response)=>{
    let {id} = request.params;
    let {name,photo_url,nationality} = request.body;
    let values = [id,name,photo_url,nationality];
    const query = `UPDATE artists SET name=$2, photo_url=$3, nationality=$4 WHERE id=$1`
    pool.query(query, values, (err,res)=>{
        if(err){
            console.log("query error", err.message)
        } else {
            response.send(`Artist data successfully updated!`)
    }
})
});

app.get('/artists/:id/delete', (request, response) => {
    let {id} = request.params;
    let query = `SELECT * FROM artists WHERE id='${id}'`;
        pool.query(query,(err,res)=>{
        if(err){response.send("unable to save your data!")}
        else {
            let target = res.rows[0];
            response.render('deleteprofile', target)
            }
            });
       /* response.render('editprofile', target)*/
    });

app.delete('/artists/:id', (request,response)=>{
    let {id} = request.params;
    let {name} = request.body;
    const query = `DELETE FROM artists WHERE id='${id}'`
    pool.query(query, (err,res)=>{
        if(err){
            console.log("query error", err.message)
        } else {
            response.send(`Artist ${name}'s data successfully deleted from database!`)
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
