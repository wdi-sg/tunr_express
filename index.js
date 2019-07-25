const express = require('express');
const methodOverride = require('method-override');
var sha256 = require('js-sha256');
const SALT = "SaLt AnD pEpPeR";
const cookieParser = require('cookie-parser')
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

app.use(express.static(__dirname+'/public/'));
app.use(methodOverride('_method'));
app.use(cookieParser());

/* React Views */
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/* Functions */

const showHome = (req, res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.redirect("/login");
	}
	else {
		res.render('home');
	}
};
const showArtists = (req, res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.redirect("/login");
	}
	else {
		let query = "SELECT * FROM artists";

		pool.query(query, (err, results) => {
			if (err) {
				console.log("ERRORS: " + err);
			} else {
				let data = {
					"artists": results.rows
				};
				res.render('artists', data);
			}
		});
	}
};
const showArtist = (req, res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.redirect("/login");
	}
	else {
		let query = "SELECT * FROM artists WHERE id = $1";
		let values = [req.params.id];
		pool.query(query, values, (err, results) => {
			if (err) {
				console.log("ERROR: " + err);
			} else {
				let data = {
					"artist": results.rows[0]
				};
				res.render('artist', data);
			}
		});
	}
};

const addArtistForm = (req, res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.redirect("/login");
	}
	else {
		res.render('new-artist');
	}
};

const addArtist = (req,res) => {
	let query = "INSERT INTO artists (name,photo_url,nationality) VALUES ($1,$2,$3) RETURNING id";
	let values = [req.body.name, req.body.photo_url, req.body.nationality];
	pool.query(query, values, (err, results) => {
		if (err) {
			console.log("ERROR: " + err);
		} else {
			res.redirect('/artists/' + results.rows[0].id);
		}
	})
};

const editArtistForm = (req, res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.redirect("/login");
	}
	else {
		let query = "SELECT * FROM artists WHERE id=$1";
		let values = [parseInt(req.params.id)];
		pool.query(query, values, (err, results) => {
			if (err) {
				console.log("ERROR: " + err);
			} else {
				let data = {
					"artists": results.rows[0]
				};
				res.render('edit-artist', data);
			}
		});
	}
};

const editArtist = (req,res) => {
	let id = parseInt(req.params.id);
	let query = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4";
	let values = [req.body.name, req.body.photo_url, req.body.nationality, id];
	pool.query(query, values, (err, results) => {
		if (err) {
			console.log("ERROR: " + err);
		} else {
			res.redirect('/artists/' + id);
		}
	})
};

const deleteArtist = (req,res) => {
	let query = "DELETE from artists WHERE id=$1";
	let values = [parseInt(req.params.id)];
	pool.query(query, values, (err, results) => {
		if (err) {
			console.log("ERROR: " + err);
		} else {
			res.redirect('/artists/');
		}
	})
};

const showArtistSongs = (req,res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.redirect("/login");
	}
	else {
		let query = 'SELECT * FROM songs WHERE artist_id=$1';
		let values = [parseInt(req.params.id)];
		pool.query(query, values, (err, results) => {
			if (err) {
				console.log("ERROR: " + err);
			} else {
				let data = {
					"id": values[0],
					"songs": results.rows
				};
				res.render('artist-song', data);
			}
		})
	}
};

const addArtistSongsForm = (req, res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.redirect("/login");
	}
	else {
		let data = {
			"id": parseInt(req.params.id)
		};
		res.render('new-song', data);
	}
};

const addArtistSongs = (req, res) => {
	let id = parseInt(req.params.id);
	let query = "INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES ($1,$2,$3,$4,$5)";
	let values = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, id];
	pool.query(query, values, (err, results) => {
		if (err) {
			console.log("ERROR: " + err);
		} else {
			res.redirect('/artists/' + id);
		}
	})
};

const showRegisterForm = (req,res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.render('register');
	}
	else {
		res.redirect("/artists");
	}
};

const addUser = (req,res) => {
	let query = "SELECT * FROM users WHERE LOWER(name) = $1";
	let values = [req.body.username.toLowerCase()];
	pool.query(query,values,(err,results)=>{
		if (err) {
			console.log("ERROR: "+ err);
		}
		else {
			if (results.rows.length) {
				res.send('There is an existing username');
			}
			else {
				let query = "INSERT INTO users (name,password) VALUES ($1,$2) RETURNING id";
				let values = [req.body.username,sha256(req.body.password)];
				pool.query(query,values, (err,results)=> {
					if (err) {
						console.log("ERROR: "+ err);
					}
					else {
						let user_id = results.rows[0].id;
						let currentSessionCookie = sha256( user_id + 'logged_id' + SALT );
						res.cookie('loggedin', currentSessionCookie);

						// response.cookie('user_id', user_id);
						res.redirect('/artists');
					}
				})
			}
		}
	});

};

const showLoginForm = (req,res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.render('login');
	}
	else {
		res.redirect('/artists');
	}
};

const loginUser = (req,res) => {
	let query = "SELECT * FROM users WHERE LOWER(name) = $1";
	let values = [req.body.username.toLowerCase()];
	pool.query(query,values,(err,results)=>{
		if (err) {
			console.log("ERROR: "+ err);
		}
		else {
			if (results.rows.length) {
				if (sha256(req.body.password) === results.rows[0].password) {
					let user_name = results.rows[0].name;
					let user_id = results.rows[0].id;
					let currentSessionCookie = sha256( user_id + 'logged_id' + SALT );
					res.cookie('loggedin', currentSessionCookie);
					res.cookie('user_name', user_name);
					res.cookie('user_id', user_id);

					res.redirect("/artists");
				}
				else {
					res.send('Wrong password');
				}
			}
			else {
				res.send("There is no such user");
			}
		}
	});
};

const logoutUser = (req,res) => {
	let currentSessionCookie = sha256('logged_out' + SALT );
	res.cookie('loggedin', currentSessionCookie);
	res.redirect("/login");
};
const showFave = (req,res) => {
	let currentSessionCookie = req.cookies['loggedin'];
	if (currentSessionCookie === undefined || currentSessionCookie === sha256('logged_out' + SALT )) {
		res.redirect("/login");
	}
	else {
		let query = "SELECT * FROM songs INNER JOIN favourite_songs ON (songs.id = favourite_songs.song_id) WHERE favourite_songs.user_id = $1"
		let values = [parseInt(req.cookies.user_id)];
		pool.query(query, values, (err, results) => {
			if (err) {
				console.log("ERROR: " + err);
			} else {
				let data = {
					faves: results.rows
				};
				res.render("favourites", data);
			}
		});
	}
};

const addFave = (req,res) => {
	let currentUser = parseInt(req.cookies.user_id);
	let currentSong = parseInt(req.params.song_id);
	let query = "SELECT * FROM favourite_songs WHERE song_id = $1 AND user_id = $2";
	let values = [currentSong,currentUser];
	pool.query(query,values,(err,results)=> {
		if (err) {
			console.log("ERROR: " + err);
		} else {
			if (results.rows.length) {
				res.send('Already been favourited');
			} else {
				let query = "INSERT INTO favourite_songs (song_id,user_id) VALUES ($1,$2)";
				let values = [currentSong, currentUser];
				pool.query(query, values, (err, results) => {
					if (err) {
						console.log("ERROR: " + err);
					} else {
						res.redirect('/favourites');
					}
				})
			}
		}
	});
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

app.get('/artists/:id/songs', showArtistSongs);
app.get('/artists/:id/songs/new', addArtistSongsForm);
app.post('/artists/:id', addArtistSongs);

app.get('/register', showRegisterForm);
app.post('/register', addUser);

app.get('/login', showLoginForm);
app.post('/login', loginUser);

app.get('/favourites', showFave);
app.post('/favourites/:song_id', addFave);

app.get('/logout', logoutUser);

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