CREATE TABLE Artists (
  id serial PRIMARY KEY,
  name TEXT,
  photo_url TEXT,
  nationality TEXT
);

CREATE TABLE Songs (
  id serial PRIMARY KEY,
  title TEXT,
  album TEXT,
  preview_link TEXT,
  artwork TEXT,
  artist_id INTEGER
);