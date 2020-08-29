// takes in dbPoolInstance as parameter from db.js
// export to db.js
module.exports = (dbPoolInstance) => {

    let getAllSong = (callback) => {
        let query = 'SELECT songs.id, artists.name, songs.title, songs.album, songs.preview_link, songs.artwork FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) ORDER BY songs.id';

        dbPoolInstance.query(query, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in getAllSong model", queryErr.message)
                callback(queryErr, null);
            } else {
                callback(null, queryResult);
            }
        })
    }

    let createNewSong = (values, callback) => {
        let query = `INSERT INTO songs(title, album, preview_link, artwork, artist_id) VALUES($1, $2, $3, $4, $5)`;

        dbPoolInstance.query(query, values, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in createNewSong model", queryErr.message)
                callback(queryErr, null);
            } else {
                callback(null, true);
            }
        })
    }

    let selectSingleSong = (id, callback) => {
        let query = `SELECT songs.id, artists.name, songs.title, songs.album, songs.preview_link, songs.artwork FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) WHERE songs.id = ${id}`

        dbPoolInstance.query(query, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in selectSingleSong model", queryErr.message)
                callback(queryErr, null);
            } else {
                callback(null, queryResult.rows);
            }
        })
    }

    let updateSong = (id, values, callback) => {
        let query = `UPDATE songs SET title = $1, album = $2, preview_link = $3, artwork = $4, artist_id = $5 WHERE id = ${id}`

        dbPoolInstance.query(query, values, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in updateSong model", queryErr.message);
                callback(queryErr, null);
            } else {
                callback(null, true)
            }
        })
    }

    let removeSong = (id, callback) => {
        let query = `DELETE FROM songs WHERE id = ${id}`;

         dbPoolInstance.query(query, (queryErr, queryResult) => {
             if (queryErr) {
                 console.log("-- Error in removeSong model", queryErr.message);
                 callback(queryErr, null);
             } else {
                 callback(null, true);
             }
         })
    }

    return {
        getAllSong,
        createNewSong,
        selectSingleSong,
        updateSong,
        removeSong
    }
};