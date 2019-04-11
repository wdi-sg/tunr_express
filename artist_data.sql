-- FAKE DATA

-- ARTIST

INSERT INTO artists(name, photo_url, nationality) VALUES('Yeah Yeah Yeahs', 'http://www.athousandguitars.com/wp-content/uploads/2013/04/yeah-yeah-yeahs.jpg', 'USA');
INSERT INTO artists(name, photo_url, nationality) VALUES('Nosaj Thing', 'http://wertn.com/wp-content/uploads/2012/04/Nosaj-Thing_Mondrian_CL_High-3487.jpg', 'USA');
INSERT INTO artists(name, photo_url, nationality) VALUES('Norah Jones', 'http://entertainmentrealm.files.wordpress.com/2012/05/norahjones1.jpg', 'USA');
INSERT INTO artists(name, photo_url, nationality) VALUES('Lykke Li', 'http://www.chartattack.com/wp-content/uploads/2012/07/lykke-li-newmain1-photo-by-daniel-jackson.jpg', 'Sweeden');
INSERT INTO artists(name, photo_url, nationality) VALUES('Kendrick Lamar', 'http://www.xxlmag.com/wp-content/uploads/2013/06/kendricklamar_001-1600.jpg', 'USA');

-- PLAY LIST

INSERT INTO playlist(title) VALUES('Big Pimpin');
INSERT INTO playlist(title) VALUES('Jigga Whut');

-- PLAYLIST_SONGS

INSERT INTO playlist_songs(playlist_id, song_id) VALUES(1 , 23);
INSERT INTO playlist_songs(playlist_id, song_id) VALUES(1, 44);
INSERT INTO playlist_songs(playlist_id, song_id) VALUES(1, 43);
INSERT INTO playlist_songs(playlist_id, song_id) VALUES(2, 32);
INSERT INTO playlist_songs(playlist_id, song_id) VALUES(2, 78);