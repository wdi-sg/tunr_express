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

-- CREATE TABLE IF NOT EXISTS playlist (
--     id SERIAL PRIMARY KEY,
--     playlist_name TEXT
-- );

-- CREATE TABLE IF NOT EXISTS playlist_songs (
--     id SERIAL PRIMARY KEY,
--     playlist_name TEXT,
--     song_title TEXT
-- );

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password TEXT
);

CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    song_id INTEGER,
    user_id INTEGER
);