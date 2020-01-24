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

CREATE TABLE IF NOT EXISTS playlist (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS playlist_song (
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER,
    song_id INTEGER
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    passHash TEXT,
    UNIQUE(name)
);

CREATE TABLE IF NOT EXISTS favs (
    id SERIAL PRIMARY KEY,
    song_id INTEGER,
    users_id INTEGER
);