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
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists (id)
);

CREATE TABLE IF NOT EXISTS playlist (
    id SERIAL PRIMARY KEY,
    name TEXT
);
CREATE TABLE IF NOT EXISTS playlist_song (
    id SERIAL PRIMARY KEY,
    song_id TEXT,
    playlist_id TEXT
);

CREATE TABLE IF NOT EXISTS users (
    username TEXT,
    password TEXT
);