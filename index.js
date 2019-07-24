const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const configs = {
	user: 'shirleytan',
	host: '127.0.0.1',
	database: 'tunr_db',
	port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
	console.log('idle client error', err.message, err.stack);
});

/* Config */
const app = express();


app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use(methodOverride('_method'));

/* React Views */
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/* Functions */

const showHome = (req, res) => {
	res.render('home');
};
const showArtists = (req, res) => {
	let query = "SELECT * FROM artists";

	pool.query(query, (err, results) => {
		if (err) {
			console.log("ERRORS: " + err);
		}
		else {
			let data = {
				"artists": results.rows
			};
			res.render('artists',data);
		}
	});
};
const showArtist = (req, res) => {
	let query = "SELECT * FROM artists WHERE id = $1";
	let values = [req.params.id];
	pool.query(query, values, (err, results) => {
		if (err) {
			console.log("ERROR: " + err);
		}
		else {
			let data = {
				"artist": results.rows[0]
			};
			res.render('artist',data);
		}
	});
};

const addArtistForm = (req, res) => {
	res.render('new-artist');
};

const addArtist = (req,res) => {
	let query = "INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3) RETURNING id";
	let values = [req.body.name, req.body.photo_url, req.body.nationality];
	pool.query(query,values, (err,results)=> {
		if (err) {
			console.log("ERROR: "+ err);
		}
		else {
			res.redirect('/artists/'+results.rows[0].id);
		}
	})
};

const editArtistForm = (req, res) => {
	let query = "SELECT * FROM artists WHERE id=$1";
	let values = [parseInt(req.params.id)];
	pool.query(query,values, (err,results) => {
		if (err) {
			console.log("ERROR: "+ err);
		}
		else {
			let data = {
				"artists": results.rows[0]
			};
			res.render('edit-artist',data);
		}
	});
};

const editArtist = (req,res) => {
	let id = parseInt(req.params.id);
	let query = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4";
	let values = [req.body.name, req.body.photo_url, req.body.nationality, id];
	pool.query(query,values, (err,results)=> {
		if (err) {
			console.log("ERROR: "+ err);
		}
		else {
			res.redirect('/artists/'+id);
		}
	})
};

const deleteArtist = (req,res) => {
	let query = "DELETE from artists WHERE id=$1";
	let values = [parseInt(req.params.id)];
	pool.query(query,values, (err,results)=> {
		if (err) {
			console.log("ERROR: "+ err);
		}
		else {
			res.redirect('/artists/');
		}
	})
};

/* Routes */
app.get('/', showHome);

app.get('/artists/', showArtists);

app.get('/artists/add', addArtistForm);

app.get('/artists/:id/edit', editArtistForm);

app.get('/artists/:id', showArtist);

app.post('/artists/', addArtist);

app.delete('/artists/:id', deleteArtist);

app.put('/artists/:id', editArtist);

/* Listen to requests on port 3000 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {
	console.log("closing");
	server.close(() => {
		console.log('Process terminated');
		pool.end(() => console.log('Shut down db connection pool'));
	})
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);