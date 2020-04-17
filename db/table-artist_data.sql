--psql -U zachariah -d tunr_db -a -f ./db/table-artist_data.sql--

CREATE TABLE artists (
	id serial PRIMARY KEY,
	name VARCHAR (255) UNIQUE NOT NULL,
	photo_url VARCHAR (255),
	nationality VARCHAR (255)
);