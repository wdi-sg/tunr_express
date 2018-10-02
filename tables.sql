CREATE TABLE artists (
  id serial PRIMARY KEY,
  name text,
	photo_url text,
	nationality text
);

CREATE TABLE songs (
  id serial PRIMARY KEY,
  title text,
	album text,
	preview_link text,
	artwork text,
	artist_id integer REFERENCES artists(id)
);
