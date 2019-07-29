CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    album TEXT,
    preview_link TEXT,
    artwork TEXT,
    artist_id INTEGER
);