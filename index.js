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
        res.send(result.rows);
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
    console.log(req.body);
    res.send('WOWOWOW!')
});
/*================================================
╔═╗┬ ┬┌─┐┬ ┬
╚═╗├─┤│ ││││
╚═╝┴ ┴└─┘└┴┘
================================================*/
app.get('/artists/:id',(req,res)=>{});
/*================================================
╔═╗┌┬┐┬┌┬┐
║╣  │││ │
╚═╝─┴┘┴ ┴
================================================*/
app.get('/artists/:id/edit',(req,res)=>{});
/*================================================
╦ ╦┌─┐┌┬┐┌─┐┌┬┐┌─┐
║ ║├─┘ ││├─┤ │ ├┤
╚═╝┴  ─┴┘┴ ┴ ┴ └─┘
================================================*/
app.put('/artists/:id',(req,res)=>{});
/*================================================
╔╦╗┌─┐┌─┐┌┬┐┬─┐┌─┐┬ ┬
 ║║├┤ └─┐ │ ├┬┘│ │└┬┘
═╩╝└─┘└─┘ ┴ ┴└─└─┘ ┴
================================================*/
app.delete('/artists/:id',(req,res)=>{});
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