CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name TEXT,
    photo_url TEXT,
    nationality TEXT
);

CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    name TEXT,
    title TEXT,
    album TEXT,
    preview_link TEXT,
    artwork TEXT,
    artist_id integer
);

CREATE TABLE IF NOT EXISTS playlists (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS playlistsongs (
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER REFERENCES playlists (id),
    song_id INTEGER REFERENCES songs (id)
)