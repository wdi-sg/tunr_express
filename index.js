console.log("starting up!!");

const express = require('express');
const app = express();
const pg = require('pg');



// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


// Initialise postgres client
const configs = {
  user: 'Mac',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
	res.send('hello');
})

app.get('/hello', (req, res) => {
  // query database for all pokemon
	const queryString = 'SELECT * from pokemon'

	pool.query(queryString, (err, result) => {

	  if (err) {
	    console.error('query error:', err.stack);
	    res.send( 'query error' );
	  } else {
	    console.log('query result:', result);

	    // redirect to home page
	    res.send( result.rows );
	  }
	});  

// respond with text that lists the names of all the pokemons
  // res.send('hello');
});


app.get('/create', (req, res) => {
	res.render('insert');
})

app.post('/insert', (req, res) => {
 

	pool.query(queryString, values, (err, result) => {

	  if (err) {
	    console.error('query error:', err.stack);
	    res.send( 'query error' );
	  } else {
	    console.log('query result:', result);
		}
	})
})

// boilerplate for listening and ending the program

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