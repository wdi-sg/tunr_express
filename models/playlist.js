module.exports = (dbPoolInstance) => {

    let getAllPlaylist = (callback) => {
        let query = "SELECT * FROM playlist";
        dbPoolInstance.query(query, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in getAllPlaylist model", queryErr.message);
            } else {
                callback(null, queryResult);
            }
        })
    }

    let createNewPlaylist = (values, callback) => {
        let query = "INSERT INTO playlist (name) VALUES ($1)";
        dbPoolInstance.query(query, values, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in createNewPlaylist model", queryErr.message);
            } else {
                callback(null, true);
            }
        })
    }


    let showSongInPlaylist = (id, callback) => {
        let query = `select songs.title, playlist.name from (songs inner join playlist_song on songs.id = playlist_song.song_id) inner join playlist on playlist.id = playlist_song.playlist_id where playlist_id = ${id}`;
        dbPoolInstance.query(query, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in showSongInPlaylist model", queryErr.message);
            } else {
                if (queryResult.rows.length < 1) {
                    callback(null, queryResult.rows.length)
                } else {
                    callback(null, queryResult)
                } 
            }
        })
    }

    let addPlaylistSong = (values, callback) => {
        let query = `INSERT INTO playlist_song (song_id, playlist_id) VALUES ((select songs.id from songs where songs.title = $1), $2)`;
        dbPoolInstance.query(query, values, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in addPlaylistSong model", queryErr.message)
            } else {
                callback(null, true)
            }
        })
    }

    return {
        getAllPlaylist,
        createNewPlaylist,
        showSongInPlaylist,
        addPlaylistSong
    }
};