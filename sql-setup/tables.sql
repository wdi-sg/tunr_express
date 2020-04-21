DROP TABLE IF EXISTS playlist_songs;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS artists, playlists, users, sessions;

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name TEXT,
  photo_url TEXT,
  nationality TEXT
  );

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title TEXT,
  album TEXT,
  preview_link TEXT,
  artwork TEXT,
  artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE
  );

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE playlist_songs (
  id SERIAL PRIMARY KEY,
  playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
  song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  salt TEXT
);

CREATE TABLE sessions (
  id CHAR(64) PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
