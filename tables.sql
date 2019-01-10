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

CREATE TABLE IF NOT EXISTS playlists (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS playlists_songs (
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER,
    song_id INTEGER
);

-- psql -d tunr_db -U postgres -f tables.sql

-- psql -d tunr_db -U postgres -f artist_data.sql

-- psql -d tunr_db -U postgres -f songs.sql