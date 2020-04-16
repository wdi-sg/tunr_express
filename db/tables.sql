CREATE TABLE if not exists artists (
	id serial primary key,
	name text,
	photo_url text,
	nationality text
);

CREATE TABLE if not exists songs (
	id serial primary key,
	title text,
	album text,
	preview_link text,
	artwork text,
	artist_id integer
);