console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'mohammadasshikin',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432
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
 * Function Declarations
 * ===================================
 */

 let deleteEntryUpdate = (request,response)=>{
    // response.send("Inside delete update function");
    var id = request.params.id;
    var deleteIndividual = `DELETE from artists WHERE id =${id} `;
    pool.query(deleteIndividual,(err,result)=>{
        if(err){
            console.log("query error",err.stack);
            response.send("query error");
        }
        else
        {
            // response.send(result.rows[0]);
            // response.send(data);
            response.redirect('/homepage');
        }
    })
}

 let deleteEntry = (request,response)=>{
    var id = request.params.id;
    let showIndividual = `SELECT * FROM artists WHERE id =${id}`;
    pool.query(showIndividual,(err,result)=>{
        if(err){
            console.log("query error",err.stack);
            response.send("query error");
        }
        else{
            // response.send(result.rows[0]);
            var data = {
                result: result.rows[0]
            }
            // response.send(data);
            response.render('delete',data);
        }
    })
 }

 let editUpdate = (request,response)=>{
    // response.send("inside edit update function");
    var id = request.params.id
    var editData = request.body;
    // response.send(editData);
    let editIndividual = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id = $4';
    let values = [editData.name, editData.photo_url, editData.nationality, id];
    pool.query(editIndividual, values,(err,result)=>{
        if (err){
            console.log("query error",err.stack);
            response.send("query error");
        }
        else{
            console.log(result.rows);
            response.redirect('/homepage/'+id);
        }
    })
 }

let edit = (request,response)=>{
    // response.send("Inside edit function");
    var id = request.params.id
    // response.send(id);
    let showIndividual = `SELECT * FROM artists WHERE id =${id}`;
    pool.query(showIndividual,(err,result)=>{
        if(err){
            console.log("query error",err.stack);
            response.send("query error");
        }
        else{
            // response.send(result.rows[0]);
            var data = {
                result: result.rows[0]
            }
            // response.send(data);
            response.render('edit',data);
        }
    })
}

let newEntryUpdate = (request,response)=>{
    // console.log("Inside new Entry function");
    // response.send("Inside new Entry function");
    var newEntry = request.body
    // console.log(newEntry);
    // response.send(newEntry);
    let addNewEntry = `INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3)`;
    let values = [newEntry.name, newEntry.photo_url, newEntry.nationality];
    pool.query(addNewEntry, values, (err,result)=>{
        if (err){
            console.log("query error",err.stack);
            response.send("query error");
        }
        else {
            console.log(result.rows);
            response.redirect("/homepage");
        };
    });
};

let newEntry = (request,response)=>{
    // console.log("Inside new entry function");
    // response.send("Inside new entry function");
    response.render('new');
}

let individual = (request,response)=>{
    // console.log("inside individual function");
    // response.send("inside individual function");
    var id = request.params.id;
    // response.send("The artist id is: "+id);
    let showIndividual = `SELECT * FROM artists WHERE id =${id}`;
    pool.query(showIndividual,(err,result)=>{
        if(err){
            console.log("query error",err.stack);
            response.send('query error');
        }
        else{
            // console.log("query result", result);
            // response.send(result.rows);
            let data = {
                result: result.rows[0]
            };
            // console.log(data);
            // response.send(data);
            response.render('individual',data);
        }
    })
}

let home = (request,response)=>{
    let showAll = "SELECT * FROM artists order by id";
    pool.query(showAll, (err,result)=>{
        if(err){
            console.log("query error",err.stack);
            response.send('query error');
        }
        else{
            let data = {
                result: result.rows
            }
            console.log(data);
            response.render('home',data);
        }
        // console.log("query result", result);
        // response.send(result.rows);
        // for( let i=0; i<result.rows.length; i++ ){
            // console.log(`Id: ${result.rows[i].id}. Name: ${result.rows[i].name}. PhotoUrl: ${result.rows[i].photo_url}. Nationality: ${result.rows[i].nationality}.`);
            // response.send(`Id: ${result.rows[i].id}. Name: ${result.rows[i].name}. PhotoUrl: ${result.rows[i].photo_url}. Nationality: ${result.rows[i].nationality}.`);
        // }
    });
}

// app.get('/new', (request, response) => {
//   // respond with HTML page with form to create new pokemon
//   response.render('new');
// });

// app.get('/', (request, response) => {
//     // query database for all pokemon
//     console.log("HELLO WORLD");
//     response.send("HELLO WORLD");
//     // respond with HTML page displaying all pokemon
//     // response.render('home');
// });





/**
 * ===================================
 * Routes
 * ===================================
 */

app.delete('/homepage/:id', deleteEntryUpdate);
app.get('/homepage/:id/delete',deleteEntry);
app.get('/homepage/new', newEntry);
app.post('/homepage', newEntryUpdate);
app.get('/homepage/:id/edit',edit);
app.put('/homepage/:id',editUpdate);
app.get('/homepage/:id', individual);



app.get('/homepage', home);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = 3008;
const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);