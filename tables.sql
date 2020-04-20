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

  CREATE TABLE IF NOT EXISTS playlist (
  id SERIAL PRIMARY KEY,
  name TEXT
  );

  CREATE TABLE IF NOT EXISTS playlist_song (
  id SERIAL PRIMARY KEY,
  song_id INTEGER,
  playlist_id INTEGER
  );

SELECT songs.id
FROM songs
INNER JOIN playlist_song 
ON (songs.id = playlist_song.song_id);

SELECT ps.playlist_id, ps.song_id, s.title, s.album, a.name, s.artist_id, s.preview_link, s.artwork
FROM playlist AS p
INNER JOIN playlist_song AS ps ON ps.playlist_id = p.id
INNER JOIN songs AS s ON s.id = ps.song_id
INNER JOIN artists AS a ON s.artist_id = a.id; 