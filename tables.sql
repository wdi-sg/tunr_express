CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name TEXT,
    photo_url VARCHAR(2083),
    nationality TEXT
);

CREATE TABLE IF NOT EXISTS songs (
	id SERIAL PRIMARY KEY,
	title TEXT,
	album TEXT,
	preview_link VARCHAR(2083),
	artwork VARCHAR(2083),
	artist_id INTEGER
);