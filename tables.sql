CREATE TABLE Artists (
    id SERIAL PRIMARY KEY,
    name TEXT,
    photo_url TEXT,
    nationality TEXT
);

CREATE TABLE Songs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    album TEXT,
    preview_link TEXT,
    artwork TEXT,
    artist_id INTEGER
);

CREATE TABLE Playlist (
    id SERIAL PRIMARY KEY,
    name TEXT,
);

CREATE TABLE Playlist_Song (
    id SERIAL PRIMARY KEY,
    song_id INTEGER,
    playlist_id INTEGER
);