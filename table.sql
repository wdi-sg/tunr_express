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

CREATE TABLE IF NOT EXISTS playlist(
	id SERIAL PRIMARY KEY,
	name TEXT
);

CREATE TABLE IF NOT EXISTS playlist_song (
	id SERIAL PRIMARY KEY,
	song_id INTEGER,
	playlist_id INTEGER
);

CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	username TEXT,
	hashPassword TEXT
);

CREATE TABLE IF NOT EXISTS favorite(
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	song_id INTEGER
);