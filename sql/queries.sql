SELECT songs.* FROM favourites INNER JOIN songs ON favourites.song_id = songs.id WHERE favourites.user_id = 3;