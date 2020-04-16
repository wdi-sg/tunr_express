
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
    artist_id INT
);


CREATE TABLE IF NOT EXISTS playlist (
    id SERIAL PRIMARY KEY,
    name TEXT
);


CREATE TABLE IF NOT EXISTS songs_playlist (
    id SERIAL PRIMARY KEY,
    song_id INT,
    playlist_id INT
);


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);


CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    song_id INT,
    user_id INT
);