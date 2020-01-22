/*
Be strict with the syntax,
Remember to put datatype before stating key type I.E. primary or foreign

	
*/

CREATE TABLE IF NOT EXISTS artists (
	id SERIAL PRIMARY KEY,
	name TEXT,
	photo_url TEXT,
	nationality TEXT
);

CREATE TABLE IF NOT EXISTS songs(
	id SERIAL PRIMARY KEY,
	title TEXT,
	album TEXT,
	preview_link TEXT,
	artwork TEXT,
	artist_id INTEGER 
);

CREATE TABLE IF NOT EXISTS playlists(
	id SERIAL PRIMARY KEY,
	name TEXT
);

CREATE TABLE IF NOT EXISTS playlists_songs(
	id SERIAL PRIMARY KEY,
	playlists_id INTEGER,
	songs_id INTEGER
);

/*
	// Query 

	SELECT random.name, random.id, random.songs_id,songs.title FROM 
	(SELECT playlists.id, playlists.name, playlists_songs.songs_id
	FROM playlists
	INNER JOIN playlists_songs
	ON (playlists.id = playlists_songs.playlists_id)) AS random
	INNER JOIN songs
	ON (songs.id = random.songs_id)

*/

