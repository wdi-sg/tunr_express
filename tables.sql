CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name TEXT,
    photo_url TEXT,
    nationality TEXT
);

CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    album TEXT,
    preview_link TEXT,
    artwork TEXT,
    artist_id INTEGER
);
 
 create table if not exists playlist (
     id serial primary key,
     name text
 );

 create table if not exists playlist_song (
     id serial primary key,
     playlist_id integer,
     song_id integer
 );

 create table if not exists users (
     id serial primary key,
     username text,
     pw text
 );

 create table if not exists favorites (
     id serial primary key,
     song_id integer,
     user_id integer
 );