console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');


//Express cookie implementation
const cookieParser = require('cookie-parser')


// Hash Implementation
var sha256 = require('js-sha256');
var SALT = "sweet"

// Initialise postgres client
const configs = {
  user: 'tanweekiat',
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
app.use(cookieParser());

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/', (request, response) => {
//   // query database for all pokemon

//   // respond with HTML page displaying all pokemon
//   response.render('home');
// });

app.get('/artists/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('new');
});


app.get('/artists', (request, response) => {
  // query database for all pokemon
const queryString = 'SELECT * from artists';

pool.query(queryString, (err, result) => {
    let data = {
        artists: result.rows
    }
    console.log(data)
    response.render('showall', data );

    // response.send(result.rows)
  })
});

//***********************************************************************************************************************************

app.post('/artists',(request,response) =>{
    console.log(request.body);
    const artistArray = [request.body.name,request.body.photo_url,request.body.nationality];
    const queryString = 'INSERT INTO artists(name,photo_url,nationality) VALUES ($1,$2,$3) RETURNING *';
    console.log(queryString);

    pool.query(queryString,artistArray, (err,result) =>{
        if (err) {
            console.log('query error:',err.stack);
            response.send('query error');
        } else {
            console.log('query result: result');
            response.send(result.rows);
        }
    })
})

//***********************************************************************************************************************************

app.get('/artists/:id',(request,response)=>{


        let id = parseInt(request.params.id) ;

        const queryString = "SELECT * from artists WHERE id="+id;

        pool.query(queryString, (err, result) => {

        if(err){
            console.log(err);
        }
        else {
            response.send(result.rows);
            // for ( i = 0; i < obj.artists.length; i++){
            //     if(artist === id ){
            //         return artist;
            //     }
            // }if(artist === undefined){
            //     response.status(404);
            //     response.send("Artist not found");
            // }
            // else{
            //     let data = {
            //         id:id,
            //         artist:artist,
            //         photo_url:artist.photo_url,
            //         nationality: artist.nationality                }
            //     response.render('id',data);
            }
        })
    })
//***********************************************************************************************************************************


 app.get('/artists/:id/edit',(request, response)=> {

        let id = parseInt(request.params.id);
        let inputV = [id];
        let queryString = "SELECT * FROM artists WHERE id = ($1)";

        pool.query(queryString, inputV, (err, result) => {

        response.render("editArtistsContent", result.rows[0])
    });
});

//********************************************************************************************************************

    app.put('/artists/:id',(request,response) =>{
        console.log(request.body);
        let id = parseInt(request.params.id);
        let name = request.body.name;
        let photo_url = request.body.photo_url;
        let nationality = request.body.nationality;
        let inputV = [name,photo_url,nationality,id];

        const queryString = 'UPDATE artist set name = ($1),photo_url = ($2),nationality,id = ($3) WHERE id = ($4) RETURNING *' ;
        console.log(queryString);

        pool.query(queryString,inputV,(err,result)=>{
            response.redirect('/artists/' + request.params.id);
        })

    });
//**********************************************************************************************************

app.get('/playlist/new', (request, response) => {
  // respond with HTML page with form to create new playlist
  response.render('newPlaylist');
});

//**********************************************************************************************************
app.post('/playlist',(request,response) =>{
    console.log(request.body);
    const playlistArray = [request.body.name];
    const queryString = 'INSERT INTO playlist(name) VALUES ($1) RETURNING *';
    console.log(queryString);

    pool.query(queryString,playlistArray, (err,result) =>{
        if (err) {
            console.log('query error:',err.stack);
            response.send('query error');
        } else {
            console.log('query result: result');
            response.send(result.rows);
        }
    })
})
//**********************************************************************************************************
    app.get('/playlist/:id/newsong', (request, response) => {
      // respond with HTML page with form to create new playlis
      let data ={
        id : parseInt(request.params.id)
      }
      response.render('playlistSong',data);
    });
//********************************************************************************************************************

app.post('/playlist/:id',(request,response) =>{
    console.log(request.body);
    const songArray = [request.body.song_id,request.params.id];
    const queryString = 'INSERT INTO playlist_song(song_id,playlist_id) VALUES ($1,$2) RETURNING *';
    console.log(queryString);

    pool.query(queryString,songArray, (err,result) =>{
        if (err) {
            console.log('query error:',err.stack);
            response.send('query error');
        } else {
            console.log('query result: result');
            response.send(result.rows);
        }
    })
})
//********************************************************************************************************************

 app.get('/register', (request, response) => {
    response.render('register');
        console.log(request.body);
      });
//********************************************************************************************************************
app.post('/register', (request,response) => {

    let hashedPassword = sha256(request.body.password + SALT);

    const queryString = 'INSERT INTO users (name,password) VALUES ($1,$2) RETURNING *';

    const values = [request.body.name,hashedPassword];

    pool.query(queryString,values, (err,result) => {
        if(err){

            response.send('query error')
        }else {

        }
        response.send(result.rows);
    })

});
//********************************************************************************************************************

app.get('/login',(request,response) =>{
    response.render('login');
})
//********************************************************************************************************************


app.post('/login',(request,response) => {
    let requestUsername = request.body.name;
    let requestPassword = request.body.password;

    const queryString = "SELECT * from users WHERE name='"+requestUsername+"'";

    pool.query(queryString,(err,result) => {
        if (err) {
            response.send('query error')
        } else {
            console.log(result.rows);

            if ( result.rows.length > 0){
                let hashedRequestPassword = sha256(requestPassword + SALT);
                console.log(hashedRequestPassword);
                if(hashedRequestPassword === result.rows[0].password) {
                    let user_id = result.rows[0].id
                    let hashedCookie = sha256(SALT + user_id);

                    response.cookie('user_id', user_id);
                    response.cookie('hasLoggedIn',hashedCookie);

                    response.send('Lets go ready to RUMBLE!')

                }else {
                    response.status(403).send('wrong password');
                }
            }else{
        response.status(403).send('no username');
        }
    }
});
});
//********************************************************************************************************************

app.get('/favourites/new',(request,response) =>{
    const queryString = 'SELECT * FROM SONGS';
    pool.query(queryString,(err,result) => {
        if (err){
               response.send('query error')
           } else {
            let songData = {
                songs: result.rows
            }
            response.render('newFavourites',songData);
           }

    })
})


//********************************************************************************************************************
app.get('/special', (request,response) => {
    let user_id = request.cookie['user_id'];
    let hashedValue = sha256(user_id + SALT);

    if(request.cookies['hasLoggedIn'] === hashedValue){
        response.send("YOU CAN DO IT!!!, GROUP HUG IN THE SHOWER TONIGHT")
    } else{
        response.send('putang inamo');
    }
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