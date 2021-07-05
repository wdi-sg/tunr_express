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
    artist_id integer REFERENCES artists (id)
);

CREATE TABLE IF NOT EXISTS playlists (
    id SERIAL PRIMARY KEY,
    playlist TEXT
);

CREATE TABLE IF NOT EXISTS relations (
    song_id integer REFERENCES songs (id),
    playlist_id integer REFERENCES playlists (id)
);

INSERT INTO playlists(playlist) VALUES('Current Playlist');