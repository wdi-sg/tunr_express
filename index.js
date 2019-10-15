console.log("starting up!!");

//==========================================
//              Config
//==========================================
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'ryan',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

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

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
//==========================================
//==========================================



//==========================================
//          Code starts here
//==========================================

const showAll = (request, response)=>{

    let queryText = "SELECT * FROM artists";

    pool.query(queryText, (err, results)=>{
        let data = {
            artists : results.rows
        };
        response.render('home', data);
    });

};

const showCreateForm = (request, response)=>{
    response.render('new');
};

const showNew = (request, response)=>{

    let name = request.body.name;
    let photo = request.body.photo_url;
    let nationality = request.body.nationality;
    let inputValues = [name, photo, nationality];
    let queryText = "INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *";

    pool.query(queryText, inputValues, (err, results)=>{
        response.render('showNew', results.rows[0])
    });

};

const showOne = (request, response)=>{

    let id = parseInt(request.params.id);
    let inputValues = [id];
    let queryText = "SELECT * FROM artists WHERE id = ($1)";

    pool.query(queryText, inputValues, (err,results)=>{
        response.render("showOne", results.rows[0]);
    });
};

const showEditForm = (request, response)=>{

    let id = parseInt(request.params.id);
    let inputValues = [id];
    let queryText = "SELECT * FROM artists WHERE id = ($1)";

    pool.query(queryText, inputValues, (err,results)=>{
        response.render("showEditForm", results.rows[0]);
    });

};

const showUpdated = (request, response)=>{

    let name = request.body.name;
    let photo = request.body.photo_url;
    let nationality = request.body.nationality;
    let id = parseInt(request.params.id);
    let inputValues = [name, photo, nationality, id];
    let queryText = "UPDATE artists SET name=($1), photo_url=($2), nationality=($3) WHERE id=($4) RETURNING *";

    pool.query(queryText, inputValues, (err, results)=>{
        response.render('showUpdated', results.rows[0])
    });


};


const deleteArtist = (request, response)=>{

    let id = parseInt(request.params.id);
    let inputValues = [id];
    let queryText = "DELETE from artists WHERE id = ($1) RETURNING *";

    pool.query(queryText, inputValues, (err,results)=>{
        response.render("showDeleted", results.rows[0]);
    })

}


//==========================================
//          Restful Routes
//==========================================
app.get('/artists/', showAll);
app.get('/artists/new', showCreateForm);
app.post('/artists', showNew);
app.get('/artists/:id', showOne);
// app.get('/artists/:id/songs', showAllSongs);
app.get('/artists/:id/edit', showEditForm);
app.put('/artists/:id', showUpdated);
app.delete('/artists/:id', deleteArtist);








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