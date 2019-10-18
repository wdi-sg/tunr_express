
CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    song_id INTEGER,
    user_id INTEGER
);