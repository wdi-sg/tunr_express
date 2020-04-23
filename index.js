console.log("starting up!!");

const express = require('express');
const app = express();
const pg = require('pg');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

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
  database: 'tunr_db',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

//allows express to parse incoming requests with urlencoded payloads; based on body parser
app.use(express.urlencoded({
  extended: true
}));

//allows express to serve static files from the public directory
app.use(express.static('public'));

// initialization to use method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

//tells express to user cookie parser
app.use(cookieParser());






////////////////// Express Routes for Playlists////////////////

// registration
app.get('/register', (req, res) => {
	if (req.cookies['logged_in'] === sha256('yes_true')){
		res.redirect('/playlist');
	} else {
		res.render('register');
	}
})

app.post('/registered', (req, res) => {
	const insertQuery = 'INSERT INTO users (name, password) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM users WHERE users.name = $1) RETURNING *;';
	values = [req.body.name, sha256(req.body.password)]

	pool.query(insertQuery, values, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
			res.send('query error');
		} else {
			if (!result.rows[0]){
				res.redirect('/login')
			} else {
				res.cookie('logged_in', sha256('yes_true'));
				res.cookie('user', req.body.name);
				res.redirect('/playlist');
			}
		};	
	})
})

// login
app.get('/login', (req, res) => {
	if (req.cookies['logged_in'] === sha256('yes_true')){
		res.redirect('/playlist');
	}

	res.render('login');
})

app.post('/logged', (req, res) => {
	if (req.cookies['logged_in'] === sha256('yes_true')){
		res.redirect('/playlist');
	}

	const userQuery = 'SELECT users.password FROM users WHERE users.name=$1;';
	values = [req.body.name]

	pool.query(userQuery, values, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
			res.send('query error');
		} else {
			if (result.rows[0].password === sha256(req.body.password)){
				res.cookie('user', req.body.name)
				res.cookie('logged_in', sha256('yes_true'));
				res.redirect('/playlist');
			} else {
				res.send('wrong user or password');
			}
		}
	})
})

// logout
app.delete('/log_out', (req, res) => {
	res.clearCookie('user');
	res.clearCookie('logged_in');
	res.send('You have successfully logged out');
})

// favorites
app.get('/favorites/new', (req, res) => {
	const queryString = 'SELECT * FROM songs;';

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
			res.send('query error');
		} else {
			const data = {'songs': result.rows}
			res.render('create_favorites', data)
		}
	})
})

// accepts post request to create favorites
app.post('/favorites', (req, res) => {
	const queryString = 'INSERT INTO favorites (user_id, song_id) SELECT id, $2 FROM users WHERE name=$1';

	const values = [req.cookies['user'], req.body.song_id];

	pool.query(queryString, values, (err, result) => {
	  if (err) {
	    console.error('query error:', err.stack);
	    res.send( 'query error' );
	  } else {
	    res.send('show_favorites');
		}
	})
})


// show all playlists (home)
app.get('/playlist', (req, res) => {
	const queryString = 'SELECT * FROM playlists;'
	let visits = req.cookies['visits'];

	//set cookie
	if (!visits) {
		visits  = 1;
	} else {
		visits = parseInt(visits) + 1;
	}

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
			res.send('query error');
		} else {
			data = {'playlists': result.rows, 'visits': visits}
			res.cookie('visits', visits).render('home', data);
		}
	})
})


// renders a form to create new playlist
app.get('/playlist/new', (req, res) => {
	data = {'visits': req.cookies['visits']}
	res.render('form_create_playlist', data);
})


// show a specific playlist with id
app.get('/playlist/:id', (req, res) => {
	const queryString = `SELECT songs.title
						 FROM songs
						 INNER JOIN playlist_song
						 ON (playlist_song.song_id = songs.id)
						 WHERE playlist_song.playlist_id = $1;`
	const values = [req.params.id];

	pool.query(queryString, values, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
			res.send('query error');
		} else {
			data = {'id': req.params.id, 'songs': result.rows, 'visits': req.cookies['visits']};

			const secondQuery = 'SELECT name FROM playlists WHERE id=$1;'
			pool.query(secondQuery, values, (err, result) => {
				if (err) {
					console.error('query error:', err.stack);
					res.send('query error');
				} else {
					data.name = result.rows[0].name;
					res.render('show_playlist', data);
				}
			})
		}
	})
})


// accepts post request to create new playlist in playlist table
app.post('/playlist', (req, res) => {
	const queryString = `INSERT INTO playlists (name) VALUES ($1) RETURNING id;`;

	const values = [req.body.name];

	pool.query(queryString, values, (err, result) => {
	  if (err) {
	    console.error('query error:', err.stack);
	    res.send( 'query error' );
	  } else {
	    res.redirect(`/playlist/${result.rows[0].id}`);
		}
	})
})

// renders form to add songs to playlist :id
app.get('/playlist/:id/newsong', (req, res) => {
	const queryString = 'SELECT * FROM songs;';

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('querry error:', err.stack);
			res.send('query error');
		} else {
			data = {'id': req.params.id, 'songs': result.rows, 'visits': req.cookies['visits']};
			const secondQuery = 'SELECT name FROM playlists;'
			pool.query(secondQuery, (err, result) => {
				if (err) {
					console.error('querry error:', err.stack);
					res.send('query error');
				} else {
					data.name = result.rows[0].name;
					res.render('form_add_song', data)
				}
			})
		}
	})
})

// accepts post request to connect songs to playlist
app.post('/playlist/:id', (req, res) => {
	const queryString = `INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2);`;
	const values = [req.body.song_id, req.params.id]

	pool.query(queryString, values, (err, result) => {
		if (err) {
			console.error('querry error:', err.stack);
			res.send('query error');
		} else {
			res.redirect(`/playlist/${req.params.id}`);
		}
	})
})

// routes for Artists




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



