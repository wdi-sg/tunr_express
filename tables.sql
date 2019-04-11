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
CREATE TABLE IF NOT EXISTS playlists (
    id SERIAL PRIMARY KEY,
    title TEXT
);
CREATE TABLE IF NOT EXISTS playlists_songs (
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER,
    song_id INTEGER
);
CREATE TABLE IF NOT EXISTS passwords (
    id SERIAL PRIMARY KEY,
    user_hash TEXT,
    password_hash TEXT
);
CREATE TABLE IF NOT EXISTS usernames (
    id SERIAL PRIMARY KEY,
    username TEXT
);
CREATE TABLE IF NOT EXISTS cookies (
    id SERIAL PRIMARY KEY,
    cookie TEXT
);
CREATE TABLE IF NOT EXISTS favourites (
    id SERIAL PRIMARY KEY,
    cookie TEXT,
    song_id INTEGER
);
