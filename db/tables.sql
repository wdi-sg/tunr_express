create table artist
(
	id serial
		constraint artist_pk
			primary key,
	name text,
	photo text,
	nationality text
);

create table song
(
	id serial
		constraint song_pk
			primary key,
	title text,
	album text,
	preview_link text,
	artwork text,
	artist_id int
		constraint song_artist_id_fk
			references artist
				on delete set null
);

