const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'jessica',
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
const module.exports.reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
/**
 * ===================================
 * Functions
 * ===================================
 */

const addArtistPage = (request, response) => {
    response.render("new");
}
const addArtist = (request,response) =>{
     let text = 'INSERT INTO artists (name, photo_url, nationality) values($1, $2, $3) returning id';
    let values = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(text, values, (err,res)=>{
        if(err){
            console.log(err);
        }
        let id = res.rows[0].id;
        let path = '/artists/'+id;
        response.redirect(path);
    });
}
const showArtist = (request, response)=>{
    let queryText = "SELECT * FROM artists WHERE id=$1";
    let values = [request.params.id];
    pool.query(queryText,values,(err,res)=>{
        if(err){
            console.log(err);
        }else{
        response.render("showArtist",res.rows[0]);
        }
    })
}
const showArtistSongs = (request,response)=>{
            let queryText = 'SELECT * FROM songs WHERE artist_id=$1';
            let values = [request.params.id];
            pool.query(queryText, values, (err, res)=>{
                const data = {
                    songs: res.rows
                }
                response.render("artistSongs", data);
            })
};
const showArtists = (request,response)=>{
            let queryText = 'SELECT * FROM artists ORDER BY id asc';
            pool.query(queryText, (err, res)=>{
                const data = {
                    artists: res.rows
                }
                response.render("home", data);
            })
}
const editArtist = (request,response)=>{
    let queryText = 'SELECT * FROM artists WHERE id=$1';
    let values = [request.params.id];
    pool.query(queryText,values, (err,res)=>{
        response.render("editArtist",res.rows[0]);
    })
}
const storeEditArtist = (request,response)=>{
     let queryText = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4';
     let values = [request.body.name, request.body.photo_url, request.body.nationality, request.params.id];
     console.log("Here");
     pool.query(queryText, values, (err,res)=>{
        if(err){
            console.log(err);
        }
        let path ="/artists/"+request.params.id;
        response.redirect(path);
     });
}
const deleteArtist = (request,response)=>{
     let queryText = `DELETE FROM artists WHERE id=$1`;
     let values=[request.params.id];
     pool.query(queryText,values, (err,res)=>{
        if(err){
            console.log(err);
        }
      console.log('DELETED');
      response.redirect('/');
    });
  };