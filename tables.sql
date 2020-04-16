CREATE TABLE artists (
id SERIAL PRIMARY KEY,
name TEXT,
photo_url TEXT,
nationality TEXT
);

CREATE TABLE songs (
id SERIAL PRIMARY KEY,
title TEXT,
album TEXT,
preview_link TEXT,
artwork TEXT,
artist_id INTEGER
);