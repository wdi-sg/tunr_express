CREATE TABLE IF NOT EXISTS Artists (
	  id SERIAL PRIMARY KEY,
    name TEXT,
    photo_url TEXT,
    nationality TEXT
);

CREATE TABLE IF NOT EXISTS Songs (
	  id SERIAL PRIMARY KEY,
    title TEXT,
    album TEXT,
    preview_link TEXT,
    artwork TEXT,
    artist_id INTEGER, FOREIGN KEY(artist_id) REFERENCES Artists (id)
);





































