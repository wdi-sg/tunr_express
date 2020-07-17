console.log("Let there be light");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const configs = {
  user: 'yoda14',
  host: '127.0.0.1',
  database: 'tunr_db',
  port: 5432,
  password: 'Asecret1'
};
const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
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

app.get('/', (request, response) => {
    response.redirect('/artists');
});

app.get('/artists', (request, response) => {
    const queryString = 'SELECT * from artists ORDER BY id ASC';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            let data = {
                artistsKey : result.rows
            };
            response.render('home', data);
            // response.send(data);
  }
});
});

app.get('/artists/:id', (request, response) => {
    const queryString = 'SELECT * from artists';
    let inputId = parseInt( request.params.id );

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            for( let i=0; i<result.rows.length; i++ ){

                let currentArtist = result.rows[i];

                if( currentArtist.id === inputId ){
                    artist = currentArtist;
                }
            }

            if (inputId > result.rows.length || inputId <= 0) {

                response.status(404);
                response.send("No such artist exist yet. Please add more artists or navigate to the correct artist page.");
            } else{

            response.render('artist', artist);
        }
  }
});
});

app.get('/artist/new', (request, response) => {
    const queryString = 'SELECT * from artists';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            let data = {
                artistsKey : result.rows
            };
            response.render('new', data);
  }
});
});

app.post('/artists/', (request, response) => {

    const queryString = 'INSERT INTO artists (id, name, photo_url, nationality) VALUES ($1,$2,$3,$4) RETURNING *';
    let arr = [request.body.id, request.body.name, request.body.photo_url, request.body.nationality];
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else{
            let data = {
                artistsKey : result.rows
            };
            response.render('home', data);
        }
    });
});

app.get('/artists/:id/edit', (request, response) => {

    const queryString = 'SELECT * from artists WHERE id=' + parseInt(request.params.id);
    let inputId = parseInt( request.params.id );

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            res.send('query error');
        } else{
            let data = {
                artistsKey : result.rows[0]
            };
            response.render('edit', data);
    }
    });
});

app.put('/artists/:id', (request, response) => {
    const queryString = 'UPDATE artists SET name=$1,nationality=$2,photo_url=$3 WHERE id =' + parseInt(request.params.id) + "RETURNING *";
    console.log(queryString);
    let arr = [request.body.name, request.body.nationality, request.body.photo_url];
    console.log(arr);
    pool.query(queryString, arr, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send('query error');
        } else {
            let data = {
                artistsKey: result.rows[0],
            };

            response.render('newedit', data);
        }
    });
});

const server = app.listen(3000, () => console.log('local host love you 3000'));

// let onClose = function(){

//   console.log("closing");

//   server.close(() => {

//     console.log('Process terminated');

//     pool.end( () => console.log('Shut down db connection pool'));
//   })
// };

// process.on('SIGTERM', onClose);
// process.on('SIGINT', onClose);
