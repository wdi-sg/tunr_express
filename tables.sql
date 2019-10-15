DROP TABLE IF EXISTS artists;

CREATE TABLE IF NOT EXISTS artists (
	id SERIAL PRIMARY KEY,
	name TEXT,
	photo_url TEXT,
	nationality TEXT
);

DROP TABLE IF EXISTS songs;

CREATE TABLE IF NOT EXISTS songs (
	id SERIAL PRIMARY KEY,
	title TEXT,
	album TEXT,
	preview_link TEXT,
	artwork TEXT,
	artist_id TEXT
);