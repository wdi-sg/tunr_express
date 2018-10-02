DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
  id serial PRIMARY KEY,
  name text,
  photo_url text,
  nationality text
);

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id serial PRIMARY KEY,
  title text,
  album text,
  preview_link text,
  artwork text,
  artist_id integer,
  FOREIGN KEY(artist_id) REFERENCES artists(id)
);
