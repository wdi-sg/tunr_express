SELECT * FROM songs
WHERE songs.id
IN(SELECT song_id FROM playlist
	INNER JOIN playlist_song
	ON (playlist.id = playlist_id)
	WHERE playlist_id = 1);