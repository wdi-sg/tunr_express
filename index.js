console.log('starting up!!');

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const sha256 = require('js-sha256');
var SALT = 'apple';
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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
	let id = req.params.id;
	let queryString = `SELECT * FROM playlists_songs WHERE playlists_id =${id}`;
	pool.query(queryString, (err, result) => {
		if (err) {
			console.log('query error:', err.stack);
		} else {
			console.log('loaded all songs successfully');
			res.send(result.rows);
		}
	});
});

// see which songs are in which playlists
app.get('/playlists/:id/songtitles', (req, res) => {
	console.log('getting you all song names in this playlist');
	let playlistId = parseInt(req.params.id);
	let queryString = `SELECT songs.title, songs.album FROM songs INNER JOIN playlists_songs ON (playlists_songs.songs_id = songs.id) WHERE (playlists_songs.playlists_id = ${playlistId})`;
	pool.query(queryString, (err, result) => {
		if (err) {
			console.log('query error:', err.stack);
		} else {
			console.log('search completed!');
			res.send(result.rows);
		}
	});
});

/**
 * ===================================
 * PASSWORD AND COOKIES
 * ===================================
 */

app.get('/register', (req, res) => {
	console.log('creating registration form');
	res.render('register');
});

app.post('/register', (req, res) => {
	console.log('saving your login details');
	console.log(req.body);

	let hashedPassword = sha256(req.body.password + SALT);

	const data = [ req.body.name, hashedPassword ];
	const queryString = `INSERT INTO users (name, password) VALUES ($1, $2) RETURNING*`;

	pool.query(queryString, data, (err, result) => {
		let userId = result.rows[0].id;
		let hashedCookie = sha256(userId + 'loggedin' + SALT);

		if (err) {
			console.log('query error:', err.stack);
		} else {
			console.log('registration successful!');
			console.log('query result:', result);
			console.log(hashedCookie);
			// cookie for their hashed loggin cookie
			res.cookie('loggedin', hashedCookie);
			// cookie for userid
			res.cookie('user_id', userId);
			res.redirect(`/login`);
		}
	});
});

/**
 * ===================================
 * LOGINGINGNIGNING
 * ===================================
 */

app.get('/login', (req, res) => {
	console.log('bringing you to login page!');
	res.render('login');
});

app.post('/login', (req, res) => {
	console.log('logging you in!');
	let returningUserName = req.body.name;
	let returningUserPassword = req.body.password;
	const data = [ returningUserName ];
	// grabbing user name from db
	const queryString = `SELECT * FROM users WHERE name=$1`;

	pool.query(queryString, data, (err, result) => {
		let hashedPassword = sha256(returningUserPassword + SALT);

		if (err) {
			console.log('query error:', err.stack);
		} else {
			let user = result.rows[0];
			// if name/password is incorrect
			if (user === undefined) {
				console.log('Incorrect username/password, please try again');
				// console.log(returningUser);
				console.log(hashedPassword);
				res.redirect(`/login`);
				// if entire account is correct - this is logical, so that hackers can't know if a username exists
			} else if (returningUserName === user.name && hashedPassword === user.password) {
				// console.log(returningUser.name);
				// console.log(returningUserName);
				console.log('login successful');
				let hashedLoginCookie = sha256(user.id + 'loggedin' + SALT);
				console.log('login successful!');
				// cookie for hashedlogin cookie
				res.cookie('loggedin', hashedLoginCookie);
				// cookie for user id
				res.cookie('user_id', user.id);
				res.redirect('/');
				// if password is incorrect
			} else {
				res.redirect('/login');
			}
		}
	});
});

/**
 * ===================================
 * FAVORITEIEITES
 * ===================================
 */

app.get('/favorites/new', (req, res) => {
	console.log('rendering favorites form');
	const queryString = `SELECT * FROM songs`;
	pool.query(queryString, (err, result) => {
		if (err) {
			console.log('query error:', err.stack);
		} else {
			const data = {
				songs: result.rows
			};
			res.render('favorites', data);
		}
	});
	console.log('new favorites form rendered');
});

app.post('/favorites', (req, res) => {
	console.log('creating your favorites list!');
	let newFavSongId = req.body.id;
	let usering_id = parseInt(req.cookies['user_id']);
	let data = [ newFavSongId, usering_id ];
	const queryString = `INSERT INTO favorites (songs_id, users_id) VALUES ($1, $2) RETURNING *`;

	pool.query(queryString, data, (err, result) => {
		if (err) {
			console.log('query error:', err.stack);
		} else {
			console.log('song added to favorites success!');
			res.redirect('/favorites/new');
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
