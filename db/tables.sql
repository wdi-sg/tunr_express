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

CREATE TABLE IF NOT EXISTS playlist (
	id serial primary key,
	playlist_name text
);

CREATE TABLE IF NOT EXISTS songz (
	id serial primary key,
	title text,
	artist text,
	added_at text not null default TO_CHAR(NOW() :: DATE, 'dd/mm/yyyy')
);

CREATE TABLE IF NOT EXISTS playlist_song (
	id serial primary key,
	playlist_id integer,
	song_id integer
);

CREATE TABLE IF NOT EXISTS users (
	id serial primary key,
	username text,
	password text
);