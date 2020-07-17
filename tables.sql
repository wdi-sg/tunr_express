
CREATE TABLE IF NOT EXISTS Artists (
    id SERIAL PRIMARY KEY,
    name text,
    photo_url text,
    nationality text
);


CREATE TABLE IF NOT EXISTS Songs (
    id SERIAL PRIMARY KEY,
    artist_id integer,
    title text,
    album text,
    preview_link text,
    artwork text,
    FOREIGN KEY (artist_id) REFERENCES Artists (id)
);
