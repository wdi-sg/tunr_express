console.log("starting up!!");
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
    const queryString = 'SELECT * from artists';

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            let data = {
                artistsKey : result.rows
            };
            response.render('home', data);
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

// app.get('/new', (request, response) => {
//   response.render('new');
// });

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// let onClose = function(){

//   console.log("closing");

//   server.close(() => {

//     console.log('Process terminated');

//     pool.end( () => console.log('Shut down db connection pool'));
//   })
// };

// process.on('SIGTERM', onClose);
// process.on('SIGINT', onClose);
