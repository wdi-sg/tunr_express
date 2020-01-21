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

