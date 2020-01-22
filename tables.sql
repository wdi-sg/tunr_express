CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name TEXT,
    photo_url TEXT,
    nationality TEXT
);


CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    album TEXT,
    email TEXT,
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
    song_id INTEGER,
    playlist_id INTEGER
);