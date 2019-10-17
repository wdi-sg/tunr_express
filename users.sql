CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
user_name TEXT,
pw TEXT,
song_id INTEGER
);


CREATE TABLE IF NOT EXISTS favorites(
id SERIAL PRIMARY KEY,
user_id TEXT,
song_id INTEGER
);
