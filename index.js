console.log('starting up!!');

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
	user: 'Daniel',
	host: '127.0.0.1',
	database: 'tunr_db',
	port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
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
app.use(
	express.urlencoded({
		extended: true
	})
);

app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Landing page
app.get('/', (request, response) => {
	response.render('home');
});

// add artist form
app.get('/artists/new', (request, response) => {
	// respond with HTML page with form to create new artists
	console.log('rendering new artist form!');
	response.render('new');
});

// add a NEW artist
app.post('/artists', (req, res) => {
	console.log('creating new artist!');

	const queryString = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING*;';
	let newArtistArry = [ req.body.name, req.body.photo_url, req.body.nationality ];

	pool.query(queryString, newArtistArry, (err, result) => {
		if (err) {
			console.error('query error:', err.message);
			res.send('query error');
		} else {
			console.log('query result:', result);
			// redirect to home page
			res.send(result.rows);
		}
	});
});

// see an artist!
app.get('/artists/:id', (req, res) => {
	console.log('finding artist!');
	let id = req.params.id;
	const queryString = `SELECT * FROM artists WHERE id = ${id}`;

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.message);
			res.send('query error');
		} else {
			console.log('found artist!');
			console.log('query result:', result);
			// console.log();
			// redirect to home page
			// let artistData =
			console.log(result.rows);
			console.log(result.rows[0].name);
			res.send(result.rows);
		}
	});
});

// edit an artist!
app.get('/artists/:id/edit', (req, res) => {
	console.log('loading edit page!');
	let id = parseInt(req.params.id);
	const queryString = `SELECT * FROM artists WHERE id = ${id}`;

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.message);
		} else {
			console.log('getting artist details');
			const data = {
				id: id,
				name: result.rows[0].name,
				photo: result.rows[0].photo_url,
				nationality: result.rows[0].nationality
			};
			console.log(data);
			res.render('edit', data);
		}
	});
});

app.put('/artists/:id', (req, res) => {
	// let name = req.body.name;
	// let photo = req.body.photo_url;
	// let nationality = req.body.nationality;
	// let { name, photo_url, nationality } = req.body;
	let id = req.params.id;
	console.log(id);
	let editArtist = [ req.body.name, req.body.photo_url, req.body.nationality, id ];
	console.log(id);
	const queryString = `UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4 RETURNING *`;
	pool.query(queryString, editArtist, (err, result) => {
		if (err) {
			console.log(id);
			console.log(queryString);
			console.log('edited artist is', editArtist);
			console.error('query error:', err.message);
		} else {
			console.log(id);
			console.log('artist edited!');
			res.send(result.rows[0]);
		}
	});
});

// see all songs of from an artist!
app.get('/artists/:id/songs', (req, res) => {
	console.log('tracking discography!');
	let id = req.params.id;
	const queryString = `SELECT * FROM songs WHERE artist_id = ${id}`;
	let allsongs = `SELECT * FROM songs`;

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.message);
			res.send('query error');
		} else {
			console.log("found artist's songs!");
			console.log('query result:', result);
			// console.log();
			// redirect to home page
			// let artistData =
			// console.log(result.rows);
			res.send(result.rows);

			console.log(allsongs);
		}
	});
});

// see all artists
app.get('/artistsall/', (req, res) => {
	console.log('getting all the artists!');
	let queryString = 'SELECT * FROM artists ORDER BY id ASC;';
	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.message);
			res.send('query error');
		} else {
			console.log('got all artists!');
			// // console.log();
			// // redirect to home page
			// // let artistData =
			// console.log(result.rows);
			res.send(result.rows);
		}
	});
});

//  * ===================================
//  * PLAYLIST SECTION !!!!!!!!!!!!!!!
//  * ===================================

// renders form for new playlist
app.get('/playlists/new', (req, res) => {
	console.log('creating new playlist form!');
	res.render('playlistform');
});

// add new playlist into table
app.post('/playlists', (req, res) => {
	console.log('playlist almost done!');
	const queryString = 'INSERT INTO playlists (name) VALUES ($1) RETURNING*;';
	let newArtistArry = [ req.body.name ];

	pool.query(queryString, newArtistArry, (err, result) => {
		if (err) {
			console.error('query error:', err.message);
			res.send('query error');
		} else {
			console.log('query result:', result);
			console.log('playlist created!');
			// redirect to home page
			res.send(result.rows);
		}
	});
});

// see playlist by its id

app.get('/playlists/:id', (req, res) => {
	console.log('finding requested playlist!');
	let id = req.params.id;
	const queryString = `SELECT * FROM playlists WHERE id = ${id}`;

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.message);
			res.send('query error');
		} else {
			console.log('found playlist!');
			res.send(result.rows);
		}
	});
});

// see all playlists

app.get('/playlistsall/', (req, res) => {
	console.log('gathering all playlists!');
	let queryString = 'SELECT * FROM playlists;';
	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.message);
			res.send('query error');
		} else {
			console.log('got all playlists!');
			// // console.log();
			// // redirect to home page
			// // let artistData =
			// console.log(result.rows);
			res.send(result.rows);
		}
	});
});

// add existing song to playlist
app.get('/playlists/:id/newsong', (req, res) => {
	console.log('find songs to add to playlist!');
	let id = req.params.id;
	const queryString = 'SELECT * FROM songs';
	pool.query(queryString, (err, result) => {
		if (err) {
			console.log('query error:', err.stack);
		} else {
			let data = {
				songs: result.rows,
				id: id
			};
			res.render('choosesong', data);
		}
		console.log('new playlist song form rendered!');
	});
});

app.post('/playlists/:id', (req, res) => {
	console.log('adding selected song to playlist!');
	let playlistSongs = 'SELECT * FROM playlists_songs';
	let playlistId = req.params.id;
	let songId = req.body.id;
	let array = [ songId, playlistId ];
	const queryString = `INSERT INTO playlists_songs (songs_id, playlists_id) VALUES ($1, $2)`;

	pool.query(queryString, array, (err, result) => {
		if (err) {
			console.log('query error:', err.stack);
		} else {
			console.log('song successfully added!');
			res.send('song successfully added');
		}
	});
});

// see song id's in a given playlist
app.get('/playlists/:id/songs', (req, res) => {
	console.log('collating all songs in playlist');
	let queryString = `SELECT * FROM playlists_songs`;
	pool.query(queryString, (err, result) => {
		if (err) {
			console.log('query error:', err.stack);
		} else {
			console.log('loaded all songs successfully');
			res.send(result.rows);
		}
	});
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3020, () => console.log('~~~ Tuning in to the waves of port 3020 ~~~'));

let onClose = function() {
	console.log('closing');

	server.close(() => {
		console.log('Process terminated');

		pool.end(() => console.log('Shut down db connection pool'));
	});
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
