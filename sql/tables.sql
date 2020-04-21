-- CREATE TABLE IF NOT EXISTS Artists (
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     photo_url TEXT,
--     nationality TEXT
-- );

-- CREATE TABLE IF NOT EXISTS Songs (
--       id SERIAL PRIMARY KEY,
--       title TEXT,
--       album TEXT,
--       preview_link TEXT,
--       artwork TEXT,
--       artist_id INTEGER,
--       FOREIGN KEY (artist_id) REFERENCES Artists(id)
-- );


-- CREATE TABLE IF NOT EXISTS Playlists (
--     id SERIAL PRIMARY KEY,
--     name TEXT
-- );

-- CREATE TABLE IF NOT EXISTS playlist_song (
--     id SERIAL PRIMARY KEY,
--     song_id INTEGER,
--     playlist_id INTEGER
-- );

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);