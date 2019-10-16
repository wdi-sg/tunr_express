CREATE TABLE playlists
(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE playlists_songs
(
    id SERIAL PRIMARY KEY,
    songs_id INTEGER,
    playlists_id INTEGER

);