CREATE TABLE playlists_songs (
	id serial PRIMARY KEY,
	playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
	song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE
);