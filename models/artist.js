// takes in dbPoolInstance as parameter from db.js
// export to db.js
module.exports = (dbPoolInstance) => {

    let getAllArtist = (callback) => {
        let query = 'SELECT * FROM artists ORDER BY id ASC';

        dbPoolInstance.query(query, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in selectAllArtist model", queryErr.message)
                callback(queryErr, null);
            } else {
                console.log(queryResult)
                callback(null, queryResult);
            }
        })
    };

    let createNewArtist = (values, callback) => {
        let query = `INSERT INTO artists(name, photo_url, nationality) VALUES($1, $2, $3)`;

        dbPoolInstance.query(query, values, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in createNewArtist model", queryErr.message)
                callback(queryErr, null);
            } else {
                callback(null, true);
            }
        })
    }

    let selectSingleArtist = (id, callback) => {
        let query = `SELECT * from artists WHERE id = ${id}`;

        dbPoolInstance.query(query, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in selectSingleArtist model", queryErr.message)
                callback(queryErr, null);
            } else {
                callback(null, queryResult.rows);
            }
        })
    }

    let updateArtist = (id, values, callback) => {
        let query = `UPDATE artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = ${id}`;

        dbPoolInstance.query(query, values, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in updateArtist model", queryErr.message)
                callback(queryErr, null)
            } else {
                callback(null, true)
            }
        })
    }

    let removeArtist = (id, callback) => {
        let query = `DELETE FROM artists WHERE id = ${id}`;

        dbPoolInstance.query(query, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in removeArtist model", queryErr.message)
                callback(queryErr, null)
            } else {
                callback(null, true)
            }
        })
    }

    let getArtistSongs = (id, callback) => {
        let query = `SELECT artists.name, artists.photo_url, songs.title FROM songs INNER JOIN artists ON (artists.id = songs.artist_id) WHERE artists.id = ${id}`;

        dbPoolInstance.query(query, (queryErr, queryResult) => {
            if (queryErr) {
                console.log("-- Error in getArtistSongs model", queryErr.message)
                callback(queryErr, null)
            } else {
                callback(null, queryResult)
            }
        })
    }

    return {
        getAllArtist,
        createNewArtist,
        selectSingleArtist,
        updateArtist,
        removeArtist,
        getArtistSongs
    }
};