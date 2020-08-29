DROP TABLE IF EXISTS Artists;
DROP TABLE IF EXISTS Songs;

CREATE TABLE Artists (
	id SERIAL PRIMARY KEY,
	name TEXT,
	photo_url TEXT,
	nationality TEXT
);

CREATE TABLE IF NOT EXISTS Songs (
	id SERIAL PRIMARY KEY,
	title TEXT,
	album TEXT,
	preview_link TEXT,
	artwork TEXT,
	artist_id INTEGER
);