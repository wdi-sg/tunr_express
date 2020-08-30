CREATE TABLE IF NOT EXISTS Artists(
    id serial PRIMARY KEY,
    name TEXT,
    photo_url TEXT,
    nationality TEXT
);

CREATE TABLE IF NOT EXISTS Songs(
    id serial PRIMARY KEY,
    title TEXT,
    album TEXT,
    preview_link TEXT,
    artwork TEXT,
    artist_id integer
);

CREATE TABLE IF NOT EXISTS Playlist(
    id serial PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS playlist_songs(
    id serial PRIMARY KEY,
    song_id integer,
    playlist_id integer
)
