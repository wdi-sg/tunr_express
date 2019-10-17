console.log("RUNNING INDEX.JS!!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const configs = {
  user: 'kevin',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
};
const pool = new pg.Pool(configs);
pool.on('error',err=> console.log('idle client error', err.message, err.stack));
/*===================================
╔═╗┌─┐┌┬┐  ╦ ╦┌─┐
╚═╗├┤  │   ║ ║├─┘
╚═╝└─┘ ┴   ╚═╝┴
===================================*/
// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const sha256 = require('js-sha256');
const SALT = "iodine";
/*================================================
╦  ┌─┐┌┐┌┌┬┐┬┌┐┌┌─┐
║  ├─┤│││ │││││││ ┬
╩═╝┴ ┴┘└┘─┴┘┴┘└┘└─┘
================================================*/
app.get('/',(req,res)=>{res.render('home')});
/*================================================
╦┌┐┌┌┬┐┌─┐─┐ ┬
║│││ ││├┤ ┌┴┬┘
╩┘└┘─┴┘└─┘┴ └─
================================================*/
app.get('/artists/',(req,res)=>{
    text = 'SELECT * FROM artists ORDER BY id';
    pool.query(text,(err,result)=>{
        if (err) console.log(err);
        res.render('index',result);
    });
});
/*================================================
╔╗╔┌─┐┬ ┬
║║║├┤ │││
╝╚╝└─┘└┴┘
================================================*/
app.get('/artists/new',(req,res)=>{res.render('new')});
/*================================================
╔═╗┬─┐┌─┐┌─┐┌┬┐┌─┐
║  ├┬┘├┤ ├─┤ │ ├┤
╚═╝┴└─└─┘┴ ┴ ┴ └─┘
================================================*/
app.post('/artists',(req,res)=>{
    let {name, photo_url, nationality} = req.body;
    text = `INSERT INTO artists (name, photo_url, nationality) VALUES ('${name}', '${photo_url}', '${nationality}') RETURNING *`
    pool.query(text,(err,result)=>{
        res.render('show',result.rows[0]);
    });
});
/*================================================
╔═╗┬ ┬┌─┐┬ ┬
╚═╗├─┤│ ││││
╚═╝┴ ┴└─┘└┴┘
================================================*/
app.get('/artists/:id',(req,res)=>{
    let {id} = req.params;
    text = `SELECT * FROM artists WHERE id=${id}`;
    pool.query(text,(err,result)=>{
        res.render('show',result.rows[0]);
    });
});
/*================================================
╔═╗┌┬┐┬┌┬┐
║╣  │││ │
╚═╝─┴┘┴ ┴
================================================*/
app.get('/artists/:id/edit',(req,res)=>{
    let {id} = req.params;
    text = `SELECT * FROM artists WHERE id=${id}`
    pool.query(text,(err,result)=>{
        res.render('edit',result.rows[0]);
    });
});
/*================================================
╦ ╦┌─┐┌┬┐┌─┐┌┬┐┌─┐
║ ║├─┘ ││├─┤ │ ├┤
╚═╝┴  ─┴┘┴ ┴ ┴ └─┘
================================================*/
app.put('/artists/:id',(req,res)=>{
    let {id} = req.params;
    let {name, photo_url, nationality} = req.body;
    text = `UPDATE artists SET name='${name}', photo_url='${photo_url}', nationality='${nationality}' WHERE id=${id} RETURNING *`;
    pool.query(text,(err,result)=>{
        res.render('show',result.rows[0]);
    });
});
/*================================================
╔╦╗┌─┐┌─┐┌┬┐┬─┐┌─┐┬ ┬
 ║║├┤ └─┐ │ ├┬┘│ │└┬┘
═╩╝└─┘└─┘ ┴ ┴└─└─┘ ┴
================================================*/
app.delete('/artists/:id',(req,res)=>{
    let {id} = req.params;
    text = `DELETE FROM artists WHERE id=${id}`;
    pool.query(text,(err,result)=>{
        res.render('home');
    });
});
/*================================================
╔═╗┬ ┬┌─┐┬ ┬  ╔═╗┌─┐┌┐┌┌─┐┌─┐
╚═╗├─┤│ ││││  ╚═╗│ │││││ ┬└─┐
╚═╝┴ ┴└─┘└┴┘  ╚═╝└─┘┘└┘└─┘└─┘
================================================*/
app.get('/artists/:id/songs',(req,res)=>{
    let {id} = req.params;
    text = `SELECT * FROM songs WHERE artist_id=${id}`;
    pool.query(text,(err,result)=>{
        res.render('showsongs',result);
    });
});
/*================================================
╔═╗┬  ┌─┐┬ ┬┬  ┬┌─┐┌┬┐
╠═╝│  ├─┤└┬┘│  │└─┐ │
╩  ┴─┘┴ ┴ ┴ ┴─┘┴└─┘ ┴
================================================*/
/*================================================
╦┌┐┌┌┬┐┌─┐─┐ ┬
║│││ ││├┤ ┌┴┬┘
╩┘└┘─┴┘└─┘┴ └─
================================================*/
app.get('/playlists/',(req,res)=>{
    text = 'SELECT * FROM playlist ORDER BY id';
    pool.query(text,(err,result)=>{
        if (err) console.log(err);
        res.render('pindex',result);
    });
});
/*================================================
╔╗╔┌─┐┬ ┬
║║║├┤ │││
╝╚╝└─┘└┴┘
================================================*/
app.get('/playlists/new',(req,res)=>{res.render('pnew')});
/*================================================
╔═╗┬─┐┌─┐┌─┐┌┬┐┌─┐
║  ├┬┘├┤ ├─┤ │ ├┤
╚═╝┴└─└─┘┴ ┴ ┴ └─┘
================================================*/
app.post('/playlists',(req,res)=>{
    values = [req.body.name];
    text = `INSERT INTO playlist (name) VALUES ($1) RETURNING *`
    pool.query(text,values,(err,result)=>{
        res.render('pshow',result.rows[0]);
    });
});
/*================================================
╔═╗┬ ┬┌─┐┬ ┬
╚═╗├─┤│ ││││
╚═╝┴ ┴└─┘└┴┘
================================================*/
app.get('/playlists/:id',(req,res)=>{
    values = [req.params.id];
    text = "SELECT playlist.name,songs.title,songs.id FROM playlist INNER JOIN playlist_song ON (playlist.id = playlist_song.playlist_id) INNER JOIN songs ON (playlist_song.song_id = songs.id) WHERE playlist.id=$1";
    pool.query(text,values,(err,result)=>{
        result.playlistId = req.params.id;
        res.render('pshow',result);
    });
});
/*================================================
╔═╗┌┬┐┬┌┬┐
║╣  │││ │
╚═╝─┴┘┴ ┴
================================================*/
app.get('/playlists/:id/newsong',(req,res)=>{
    values = [req.params.id];
    text = "SELECT * FROM playlist WHERE id=$1";
    pool.query(text,values,(err,result)=>{
        res.render('pedit',result.rows[0]);
    });
});
/*================================================
╦ ╦┌─┐┌┬┐┌─┐┌┬┐┌─┐
║ ║├─┘ ││├─┤ │ ├┤
╚═╝┴  ─┴┘┴ ┴ ┴ └─┘
================================================*/
app.put('/playlists/:id',(req,res)=>{
    values = [req.body.title];
// retrieve song id
    text = "SELECT id FROM songs WHERE title=$1";
    pool.query(text,values,(err,result)=>{
        if (result.rows[0]===undefined) {
            res.send("NO SUCH SONG!");
        } else if (false) {
            res.send("ALREADY IN PLAYLIST!");
        } else {
            text = `INSERT INTO playlist_song (playlist_id,song_id) VALUES (${req.params.id},${result.rows[0].id}) RETURNING *`;
            pool.query(text,(err,result)=>{
                text = `SELECT playlist.name,songs.title,songs.id FROM playlist INNER JOIN playlist_song ON (playlist.id = playlist_song.playlist_id) INNER JOIN songs ON (playlist_song.song_id = songs.id) WHERE playlist.id=${req.params.id}`;
                pool.query(text,(err,result)=>{
                    result.playlistId = req.params.id;
                    res.render('pshow',result);
                });
            });
        };
    });
});
/*================================================
╦═╗┌─┐┌─┐┬┌─┐┌┬┐┌─┐┬─┐
╠╦╝├┤ │ ┬│└─┐ │ ├┤ ├┬┘
╩╚═└─┘└─┘┴└─┘ ┴ └─┘┴└─
================================================*/
/*================================================
╔╗╔┌─┐┬ ┬
║║║├┤ │││
╝╚╝└─┘└┴┘
================================================*/
app.get('/register',(req,res)=>{res.render('register')});
/*================================================
╔═╗┬─┐┌─┐┌─┐┌┬┐┌─┐
║  ├┬┘├┤ ├─┤ │ ├┤
╚═╝┴└─└─┘┴ ┴ ┴ └─┘
================================================*/
app.post('/register',(req,res)=>{
    let values = [req.body.username,sha256(req.body.password+SALT)];
    text = `INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`;
    pool.query(text,values,(err,result)=>{
        console.log();
        res.cookie('username',req.body.username);
        res.cookie('loggedIn',sha256('yes'));
        res.cookie('userId',result.rows[0].id);
        res.redirect('/');
    });
});
/*================================================
╦  ┌─┐┌─┐┬┌┐┌
║  │ ││ ┬││││
╩═╝└─┘└─┘┴┘└┘
================================================*/
/*================================================
╔╗╔┌─┐┬ ┬
║║║├┤ │││
╝╚╝└─┘└┴┘
================================================*/
app.get('/login',(req,res)=>{res.render('login')});
/*================================================
╔═╗┬─┐┌─┐┌─┐┌┬┐┌─┐
║  ├┬┘├┤ ├─┤ │ ├┤
╚═╝┴└─└─┘┴ ┴ ┴ └─┘
================================================*/
app.post('/login',(req,res)=>{
    let values = [req.body.username,sha256(req.body.password+SALT)];
    text = `SELECT * FROM users WHERE username=$1 AND password=$2`;
    pool.query(text,values,(err,result)=>{
        if (result.rows[0] !== undefined) {
            res.cookie('username',req.body.username);
            res.cookie('loggedIn',sha256('yes'));
            res.cookie('userId',result.rows[0].id);
            res.redirect('/');
        } else {
            res.send('WRONG USERNAME OR PASSWORD!');
        };
    });
});
/*================================================
╔═╗┌─┐┬  ┬┌─┐┬─┐┬┌┬┐┌─┐┌─┐
╠╣ ├─┤└┐┌┘│ │├┬┘│ │ ├┤ └─┐
╚  ┴ ┴ └┘ └─┘┴└─┴ ┴ └─┘└─┘
================================================*/
/*================================================
╔╗╔┌─┐┬ ┬
║║║├┤ │││
╝╚╝└─┘└┴┘
================================================*/
app.get('/favorites/new',(req,res)=>{
    let {loggedIn,username,userId} = req.cookies;
// check if user is logged in
    if (loggedIn === sha256('yes')) {
        text = "SELECT * FROM songs";
        pool.query(text,(err,result)=>{
            res.render('allsongs',result);
        });
    } else {
        res.redirect('/login');
    }
});
/*================================================
╔═╗┬─┐┌─┐┌─┐┌┬┐┌─┐
║  ├┬┘├┤ ├─┤ │ ├┤
╚═╝┴└─└─┘┴ ┴ ┴ └─┘
================================================*/
app.post('/favorites',async function(req,res){
    try{
        let selectedSongIdArray = Object.keys(req.body);
        let {loggedIn,username,userId} = req.cookies;
        if (selectedSongIdArray.length===0) {
            res.send('nothing selected');
        } else {
            selectedSongIdArray.forEach(async function(songId){
                text = `INSERT INTO favorites (song_id,user_id) VALUES (${parseInt(songId)},${parseInt(userId)})`;
                let result = await pool.query(text);
            });
            text = `SELECT * FROM favorites INNER JOIN songs ON (favorites.song_id = songs.id) WHERE favorites.user_id=${userId}`
            pool.query(text,(err,result)=>{
                console.log(result.rows);
                res.render('usersongs',result);
            });
        };
    } catch(err) {
        console.log(err);
    }
});
/*================================================
╔═╗┬ ┬┌─┐┬ ┬
╚═╗├─┤│ ││││
╚═╝┴ ┴└─┘└┴┘
================================================*/
app.get('/favorites',(req,res)=>{
    let {loggedIn,username,userId} = req.cookies;
    if (userId === undefined) {
        res.redirect('/login');
    } else {
        text = `SELECT * FROM favorites INNER JOIN songs ON (favorites.song_id = songs.id) WHERE favorites.user_id=${userId}`
        pool.query(text,(err,result)=>{
            res.render('usersongs',result);
        });
    };
});
/*================================================
╔═╗┌─┐┬─┐┌┬┐
╠═╝│ │├┬┘ │
╩  └─┘┴└─ ┴
================================================*/
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
let onClose = function(){
    console.log("closing");
    server.close(() => {
        console.log('Process terminated');
        pool.end( () => console.log('Shut down db connection pool'));
    });
};
process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);