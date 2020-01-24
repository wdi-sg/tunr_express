console.log("starting up!!");

var sha256 = require('js-sha256');
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser')

const SALT = "HAHAHAH";

// Initialise postgres client
const configs = {
  user: 'tsairenkun',
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
app.use(cookieParser())

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

//------ HOME PAGE-------------------
app.get('/', (request, response) => {
  let allquery = "SELECT * FROM artists";
  let user = request.cookies.user_name
  console.log("COOOOOSAOEOSODAOSDOASODOSDOSADOSAODSAOD" ,user);
  pool.query(allquery, (err,result)=>{

    var data = {artist:result.rows,
        username:user
    };
    response.render('home', data)
  })
});

app.get('/new', (request, response) => {

  // respond with HTML page with form to create new pokemon
  response.render('new');
});

app.post('/artists/new', (request,response)=>{

    let newquery = 'INSERT into artists (name, photo_url,nationality) VALUES ($1, $2, $3)';

  let values = [request.body.name, request.body.img, request.body.nationality]
  pool.query(newquery, values, (err,result)=>{

  })
})

//-----PLAYLIST----------------------------------------

app.get('/playlist/:id/newsong', (request,response)=>{
    let index = request.params.id;
    let query = 'SELECT * FROM songs';
    let checksongs = "SELECT playlist_song.song_id, songs.title, songs.id FROM songs INNER JOIN playlist_song ON (playlist_song.song_id = songs.id) WHERE playlist_song.playlist_id = '" + index + "'";
    var songdata = [];
    let check = false;
    pool.query(query,(err,result)=>{
        // console.log(result)
        pool.query(checksongs,(err,res)=>{
            if(err){
                console.log(err)
            }
            console.log("Running Loop");
            for (var i = 0; i < result.rows.length; i++) {
                console.log("checking first result")
                var songs = result.rows[i];

                for (var j = 0; j < res.rows.length; j++) {
                    var present = res.rows[j];
                    console.log("Checking second res")
                if(parseInt(songs.id) === parseInt(present.song_id)){
                    check = true;
                    console.log(check)
                    }
                    check = false;
                }
                 songdata.push(songs);
            }

        var data = {
            songs:songdata,
                    index:index
                };
        response.render('addingSong' , data)
        })
    })
})


app.post('/playlist/:id/newsong', (request,response)=>{
    let index = request.params.id;
    let query = 'INSERT into playlist_song (song_id, playlist_id) VALUES ($1,$2)';
    let values = [request.body.songs,index]
    console.log("THESESESESESE ARE MYYYYY VALALA: " + values)

    pool.query(query,values, (err,result)=>{
        console.log(result);
    })
})


app.get('/playlist/new', (request,response)=>{
    response.render('createplaylist');
})

app.post('/playlist/new', (request,response)=>{
    let query = 'INSERT into playlist (name) VALUES ($1)';
    let values = [request.body.name];
    console.log(values)
    pool.query(query,values, (err,result)=>{

    })
})

app.get('/playlist/:id', (request,response)=>{
    let index =  request.params.id
    let findquery = "SELECT * from playlist WHERE id ='"+ index + "'";
    pool.query(findquery,(err,result)=>{
        if(err){
            console.log(err);
        } else {
            joinQuery = "SELECT playlist_song.song_id, songs.title FROM songs INNER JOIN playlist_song ON (playlist_song.song_id = songs.id) WHERE playlist_song.playlist_id = '" + index + "'";
        }
            pool.query(joinQuery,(err,res)=>{
                if(err){
                    console.log(err)
                }

        var data = {playlist:result.rows,
            index:index,
            songs:res.rows
                    }
        response.render('playlist', data)
        })
    })
})

app.get('/playlist', (request,response)=>{
    let listquery = "SELECT * from playlist";
    pool.query(listquery,(err,result)=>{
        var data = {playlist:result.rows}
        response.render('Listofplaylist', data)
    })
})


//--------------Artists songs---------------
app.get('/artists/:id/songs', (request,response)=>{
    var index = request.params.id
    let query = "SELECT * FROM songs WHERE artist_id = '" + index + "'";

    pool.query(query,(err,result)=>{

    let artistquery = "SELECT * FROM artists WHERE id = '" + index + "'";
    pool.query(artistquery,(err,res)=>{


        var data = {
            songs:result.rows,
            index:index,
            artist:res.rows
        }
        response.render('listofsongs',data);
        })
    })
})

app.get('/artists/:id/songs/new', (request,response)=>{
    var index = request.params.id
    var query = "SELECT * from artists"
    pool.query(query,(err,res)=>{
        var data = {
            index:index,
            artists:res
        }
    response.render('newsong', data)
    })
})

app.post('/artists/:id/songs', (request,response)=>{
    var index = request.params.id
    var query = 'INSERT into songs (title, album,preview_link,artwork,artist_id) VALUES ($1,$2,$3,$4,$5)';
    let values = [request.body.title,request.body.album,request.body.preview_link,request.body.artwork,request.body.artist_id];
    pool.query(query,values,(err,result)=>{
        response.redirect("/artists/"+ request.body.artist_id +"/songs")
    })
})


//----------- LOGIN -------------------
app.get('/register', (request,response)=>{
    var data = {
        route:"/register",
        header: "Register"
    }
    response.render("login",data)
})

app.post('/register', (request,response)=>{
    var query = 'INSERT into users (username, password) VALUES ($1,$2) RETURNING id, username';

    let hashedPw = sha256( request.body.password + SALT );

    const values = [
    request.body.username,
    hashedPw
  ];
  pool.query(query, values, (err, result)=>{
    if(err){
        console.log(err);
    } else {
        console.log(result)
//-----SETTING COOKIES---------------------
        let hashedCookie = sha256(SALT+request.body.username);
        let user_name = result.rows[0].username;
        let user_id = result.rows[0].id;

        response.cookie('loggedIn', hashedCookie);
        response.cookie('userId', user_id);
        response.cookie('user_name', user_name);
         console.log("DONE", result.rows)
         response.redirect('/');
    }
  })
})


app.get('/login', (request,response)=>{
    var data = {
        route:"/login",
        header: "LOGIN"
    }
    response.render("login", data)
})

app.post('/login',(request,response)=>{
    console.log("LOGGIGIGNAINGIASNGIASGNSAIG INNNNNN")
    let query = "SELECT * FROM users WHERE username = $1"
    values = [request.body.username];
    console.log("ADSAD USERERERERERERERERERER" + values);
pool.query(query,values, (err, res)=>{
    console.log("REREARARAEREARAEREARAERE" ,res);
    if(err){
      console.log("ERRRR", err);
      response.status(500).send("error");

    }else{

      if( res.rows.length === 0 ){
            response.redirect('/register');

        }else{

        let hashedRequestPw = sha256(request.body.password + SALT);
            console.log("asdhasdhsadhsdas PASssssssss " +hashedRequestPw);
            console.log("THIS IS MY PASSWORD " + res.rows[0].password)
            if( res.rows[0].password === hashedRequestPw ){
            console.log("TRUE OR NOT DITCH" + res.rows[0].password === hashedRequestPw )
            let hashedCookie = sha256(SALT+request.body.username);
            let user_name = res.rows[0].username;
            let user_id = res.rows[0].id;

            response.cookie('loggedIn', hashedCookie);
            response.cookie('userId', user_id);
            response.cookie('user_name', user_name);

            response.redirect('/');

            }else{

            response.redirect('/login')
            }
        }
    }
})
})



app.get('/logout',(request,response)=>{
    response.clearCookie("loggedIn");
    response.clearCookie("userId");
    response.clearCookie("user_name");

response.redirect('/');
})
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