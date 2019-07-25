console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

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
                artists : result.rows
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
                artists : result.rows[0]
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
                artists: result.rows[0]
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
                artists: result.rows[0]
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
                artists: result.rows[0]
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