console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser')

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
app.use(express.static(__dirname+'/public/'));
app.use(cookieParser());

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

let newSongUpdate = (request,response)=>{
    // response.send("Inside newSongUpdate function");
    var id = request.params.id;
    var newSongData = request.body;
    // response.send(newSongData);
    let addNewSong = "INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5)";
    let values = [newSongData.title, newSongData.album, newSongData.preview_link, newSongData.artwork, newSongData.artist_id];
    // response.send(values);
    pool.query(addNewSong, values, (err,result)=>{
        if (err){
            console.log("query error",err.stack);
            response.send("query error");
        }
        else {
            console.log(result.rows);
            response.redirect("/homepage/"+id);
        };
    });


}

let newSong = (request,response)=>{
    // response.send("Inside new song function");
    var data = {
        id : request.params.id
    }
    response.render('newSong', data);
}

let songs = (request,response)=>{
    var id = parseInt(request.params.id);
    var songs = "SELECT * FROM songs WHERE artist_id=$1";
    var values = [id];
    pool.query(songs,values,(err,result)=>{
        if(err){
            console.log("query error",err.stack);
            response.send("query error");
        }
        else
        {
            var data = {
                songsDetail : result.rows
            };

            var artist = "SELECT * FROM artists WHERE id=$1";

            pool.query(artist, values, (err,result) => {

                let artist = result.rows[0];
                data.artist = artist;
                // response.send(data);
                response.render('songs',data);
            })
        }
    })
}

 let deleteEntryUpdate = (request,response)=>{
    // response.send("Inside delete update function");
    var id = request.params.id;
    var deleteIndividual = "DELETE from artists WHERE id =$1";
    var values = [id];
    pool.query(deleteIndividual, values,(err,result)=>{
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

let realHome = (request,response)=>{
    // response.send("inside realHome function");
    // let userLog = request.cookies.logged_in
    console.log(request.cookies);
    if( request.cookies.logged_in === undefined ){
    console.log("NOT LOGGD IN");
    response.status(403);
    }
    else{
        // response.send("HAHAHAAHAHA IM IN THE ZONE");
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
            response.render('realHome',data);
        }
    });
    }
}

let home = (request,response)=>{
    let showAll = "SELECT * FROM artists order by id";
    let x = request.cookies
    console.log(x);
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
    });
}


var currentLogin = (request,response)=>{
    // response.send("Inside current login function");
    let userData = {}
    userData.name = request.body.name
    userData.password = sha256(request.body.password)
    // console.log(userData);
    // response.send(userData);
    let loginAcc = "SELECT id, name, password FROM users WHERE name=$1";
    let values = [userData.name];
    pool.query(loginAcc, values,(err,result)=>{
        if (err){
            // if error, table cannot be accesssed
            console.log("query error",err.stack);
            response.send("error checking database");
        }
        else{
            // if results.rows ARRAY contain an object => username already exists in table
            console.log("table result: "+result.rows[0].password)
            console.log("user input: "+userData.password)
            if (result.rows.length > 0) {
                if(result.rows[0].password == userData.password){

                    var user_id = result.rows[0].id;
                    console.log(user_id);
                    let currentSessionCookie = sha256(user_id + 'logged_id');
                    // console.log(currentSessionCookie);

                    response.cookie('logged_in', currentSessionCookie);
                    // console.log("logged_in: "+ currentSessionCookie);

                    response.cookie('loggedin', true);
                    // console.log("loggedin boolean");

                    response.cookie('user_id', user_id);
                    // console.log("user_id: "+user_id);
                    // response.send("OKOKOK");
                    // console.log(response.cookies)
                    response.redirect("/homepage");
                }
            }
            else{
                response.render('noacc')
            }
        };
    })
};

var login = (request,response)=>{
    // response.send("inside login function");
    response.render('login')
};

var newAccount = (request,response)=>{

    // process user's inputs into object
    let newData = {};
    newData.password = sha256(request.body.password);
    newData.name = request.body.name;

    // look into database to see if username exists
    let existacc = "SELECT name FROM users WHERE name=$1";
    let values = [newData.name];
    pool.query(existacc, values,(err,result)=>{
        if (err){
            // if error, table cannot be accesssed
            console.log("query error",err.stack);
            response.send("error checking database");
        }
        else{
            // if results.rows ARRAY contain an object => username already exists in table
            if (result.rows.length > 0) {
                response.render("accexist");
            } else {
                // since username doesn't exist in table, create new row
                let addNewAccount = `INSERT INTO users (name, password) VALUES ($1, $2)`;
                values = [newData.name, newData.password];
                pool.query(addNewAccount, values, (err,result)=>{
                    if (err){
                        // error creating user
                        console.log("query error",err.stack);
                        response.send("error saving new user");
                    }
                    else{
                        // account has been created, prepare to redirect user
                        response.render("acccreated");
                    };
                });
            }
        };
    })
};

var createAcc = (request,response)=>{
    // response.send("inside create account function");
    response.render('createacc');
};

/**
 * ===================================
 * Routes
 * ===================================
 */




app.post('/create',newAccount);
app.get('/create',createAcc);
app.post('/homepage/:id/',newSongUpdate)
app.get('/homepage/:id/songs/new',newSong)
app.get('/homepage/:id/songs',songs)
app.delete('/homepage/:id', deleteEntryUpdate);
app.get('/homepage/:id/delete',deleteEntry);
app.get('/homepage/new', newEntry);
app.post('/homepage', newEntryUpdate);
app.get('/homepage/:id/edit',edit);
app.put('/homepage/:id',editUpdate);
app.get('/homepage/:id', individual);
app.post('/login',currentLogin);
app.get('/homepage',realHome);
app.get('/login',login);
app.get('/home', home);




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