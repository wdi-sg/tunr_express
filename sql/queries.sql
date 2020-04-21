SELECT *
FROM playlist_song
INNER JOIN playlists
ON playlist_song.playlist_id = playlists.id
INNER JOIN songs ON playlist_song.song_id = songs.id
WHERE playlists.id = 1;
