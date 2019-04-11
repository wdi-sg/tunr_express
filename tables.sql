-- CREATE TABLE IF NOT EXISTS artists (
-- id SERIAL PRIMARY KEY,
-- name TEXT,
-- photo_url TEXT,
-- nationality TEXT
-- );

-- CREATE TABLE IF NOT EXISTS songs (
-- id SERIAL PRIMARY KEY,
-- title TEXT,
-- album TEXT,
-- preview_link TEXT,
-- artwork TEXT,
-- artist_id INTEGER
-- );

-- CREATE TABLE IF NOT EXISTS playlists (
-- id SERIAL PRIMARY KEY,
-- playlist_name TEXT
-- );



CREATE TABLE IF NOT EXISTS playlists_songs (
id SERIAL PRIMARY KEY,
playlist_id INTEGER,
songs_id INTEGER
);