CREATE TABLE IF NOT EXISTS artists (
	id SERIAL PRIMARY KEY,
	name TEXT,
	photo_url TEXT,
	nationality TEXT
);

CREATE TABLE IF NOT EXISTS songs (
	id SERIAL PRIMARY KEY,
	title TEXT,
	album TEXT,
	preview_link TEXT,
	artwork TEXT,
	artist_id INTEGER
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT,
	  created_at DATE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
	  song_id INTEGER
);