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
    text = `SELECT * FROM artists WHERE id=${id}`
    console.log("HERERE!!!!")
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
/*===================================
╔═╗┌─┐┬─┐┌┬┐
╠═╝│ │├┬┘ │
╩  └─┘┴└─ ┴
===================================*/
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