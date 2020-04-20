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
  database: 'tunr_db',
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

// Express Routes for Playlists

// renders a form to create new playlist
app.get('/playlist/new', (req, res) => {
	res.render('form_create_playlist');
})

// show all playlists
app.get('/playlist', (req, res) => {
	const queryString = 'SELECT * FROM playlists;'

	pool.query(queryString, (err, result) => {
		if (err) {
			console.error('query error:', err.stack);
			res.send('query error');
		} else {
			data = {'playlists': result.rows}
			res.render('home', data);
		}
	})
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
			data = {'id': req.params.id, 'songs': result.rows}
			const secondQuery = 'SELECT name FROM playlists WHERE id=$1;'
			pool.query(secondQuery, values, (err, result) => {
				if (err) {
					console.error('query error:', err.stack);
					res.send('query error');
				} else {
					data.name = result.rows[0].name;
					console.log(data);
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
			console.log(result.rows)
			data = {'id': req.params.id, 'songs': result.rows}
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
			console.log(result.rows[0])
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



