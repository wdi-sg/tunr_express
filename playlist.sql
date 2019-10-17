
CREATE TABLE IF NOT EXISTS playlist (
    id SERIAL PRIMARY KEY,
    name TEXT
);


CREATE TABLE IF NOT EXISTS playlist_song (
    id SERIAL PRIMARY KEY,
    song_id INTEGER,
    playlist_id INTEGER
);