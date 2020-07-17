console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

// Initialise postgres client
const configs = {
  user: 'sowyuen',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


app.get('/', (request, response) => {
  response.redirect('/artist');
});

app.get('/artist', (request, response) => {
    let text ="SELECT * FROM artists";
    pool.query(text,(err, result) => {

        if (err) {
            console.log(err);
            response.send("query error");
        }else {
            console.log("Showing artists!")
            var data = {
                artists : result.rows,
                cookies: request.cookies
            };
            response.render('home',data);
        }
    });
});

app.get('/artist/new',(request,response)=>{
    let data={
        title : "new"
    }
    response.render("new",data);
});

app.post('/artist',(request,response)=>{
    let text = "INSERT INTO artists (name,photo_url,nationality) VALUES($1,$2,$3) RETURNING *";
    let values = [request.body.name,request.body.photo_url,request.body.nationality];
    pool.query(text, values, (err, result) => {

        if (err) {
            console.log(err);
            response.send("query error");
        }else {
            let data = {
                artists : result.rows[0],
                cookies: request.cookies
            };
            response.render('artist', data);
        }
    });
});

app.get('/artist/:id', (request, response) => {

 let text = 'SELECT * from artists WHERE id=' + parseInt(request.params.id);

 pool.query(text, (err, result) => {

     if (err) {
        console.error('query error:', err.stack);
        response.send('query error');
    } else {
        let data = {
            artists: result.rows[0],
            cookies: request.cookies
        };
        response.render('artist', data);
    }
});
});

app.get('/artist/:id/edit', (request, response) => {

 let text = 'SELECT * from artists WHERE id=' + parseInt(request.params.id);

 pool.query(text, (err, result) => {

     if (err) {
        console.error('query error:', err.stack);
        response.send('query error');
    } else {
        let data = {
            artists: result.rows[0],
            cookies: request.cookies
        };
        response.render('edit', data);
    }
});
});

app.put('/artist/:id', (request, response) => {
    let text = 'UPDATE artists SET name=$1,photo_url=$2,nationality=$3 WHERE id =' + parseInt(request.params.id) + "RETURNING *";
    let value = [request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(text, value, (err, result) => {

     if (err) {
        console.error('query error:', err.stack);
        res.send('query error');
    } else {
        let data = {
            artists: result.rows[0],
            cookies: request.cookies
        };

        response.render('artist', data);
    }
});
})

app.delete('/artist/:id', (request, response) => {
    let text = "DELETE from artists WHERE id="+parseInt(request.params.id);
    pool.query(text, (err, result) => {

     if (err) {
        console.error('query error:', err.stack);
        response.send('query error');
    } else {

     response.redirect("/artist");
 }
});
});


app.get('/artist/:id/songs',(request,response)=>{
 let text = "SELECT * FROM artists WHERE id=" + parseInt(request.params.id);
 pool.query(text,(err,result)=>{
    if(err){
        console.log('query error:', err.stack);
        response.send('query error');
    }
    else{
        let songText = "SELECT * FROM songs WHERE artist_id=" + result.rows[0].id;
        pool.query(songText,(err,result2)=>{
            if(err){
                console.log('query error:',err.stack);
                response.send('query error');
            }
            else{
                let data = {
                    list : result2.rows[0],
                    artists : result.rows[0],
                    cookies: request.cookies
                };
                response.render('songlist',data);
            }
        });
    }
});
});

app.get('/artist/:id/songs/new',(request,response)=>{
    let text = 'SELECT * FROM artists WHERE id=' + parseInt(request.params.id);
    pool.query(text,(err,result)=>{
        let data = {
            artists : result.rows[0],
            cookies: request.cookies
        }
        response.render('songnew',data);

    })
});

app.post('/artist/:id/songs',(request,response)=>{
    let id = parseInt(request.params.id);
    let text = 'INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5)';
    let values = [request.body.title,request.body.album,request.body.preview_link, request.body.artwork, request.body.artist_id];

    pool.query(text, values, (err, result) => {

        if (err) {
            console.log(err);
            response.send("query error");
        }else {
            response.redirect('/artist/'+ id + '/songs');
        }

    });
});

var SALT = "Coconut is really salty";

app.get("/register",(request,response)=>{

 let data ={
    cookies : request.cookies
}
response.render('register',data);
});


app.post("/register",(request,response)=>{
    var hash = sha256(request.body.password);
    var text = 'INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *';
    var values = [request.body.name,request.body.password];
    pool.query(text,values,(err,result)=>{
        if(err){
            console.log("query error",err.stack);
            response.send("query error");
        }else{
            var newHash = sha256("loginid"+result.rows[0].id + SALT);
            response.cookie('username',request.body.username);
            response.cookie('loggedin', hash);
            response.cookie('loginstatus', true);
            response.redirect('/artist');
        }
    });
});


app.get("/secretpage",(request,response)=>{
    if(request.cookies.username){
        let text = 'SELECT * FROM users WHERE username= $1';
        let value = [request.body.username];
        pool.query(text,value,(err,result)=>{
            if(err){
                console.log("query error",err.stack);
                response.send("query error");
            }else{
                if(request.cookies.loggedin=== result.rows[0].password){
                    let data = {
                        name : request.cookies.username,
                        cookies: request.cookies
                    };
                    response.render('secretpage',data);
                }
            }
        });
        }else{
            response.redirect("/artist");
        }

});

app.get("/login",(request,response)=>{
    let data ={
        cookies :request.cookies
    };
    response.render("login",data);
});

app.post("/login",(request,response)=>{
    var text = 'SELECT * FROM users WHERE username=$1';
    var value = [request.body.username];
    var hash = sha256(request.body.password)
    pool.query(text,value,(err,result)=>{
        if (hash === result.rows[0].password){
          console.log("YAY CORRECT");
          response.cookie('username',request.body.username);
          response.cookie('loggedin', hash);
          response.cookie('loginstatus', true);
          response.redirect('/artist');
      }else{
          console.log("incorrect username or password")
          res.redirect('/artist')
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