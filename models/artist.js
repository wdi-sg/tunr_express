module.exports = (poolInstance) => {

    /*
    export functions to enable crud in database
    callbacks are given by controller
    as model must not interact with views
     */
    let createSingle = (userInput, callback) => {
        let query =
            `insert into artists (name, photo_url, nationality)
        values ($1, $2, $3)
        returning *`;
        poolInstance.query(query, Object.values(userInput), (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    // see all the artists
    let read = (callback) => {
        let query = 'select * from artists';
        poolInstance.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    // see on artist
    let readSingle = (id, callback) => {
        let query = 'select * from artists where id = $1';
        poolInstance.query(query, [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let updateSingle = (userInput, callback) => {
        let query = `update artists
                     set
                     name=$1,
                     photo_url=$2,
                     nationality=$3
                     where id=$4`
        poolInstance.query(query, userInput, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, null);
            }
        })

    }

    let destroySingle = (id, callback) => {
        let query = `delete from artists
                     where id = $1`
        poolInstance.query(query, [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, null);
            }
        })
    }

    let readSongs = (id, callback) => {
        let query = `select
                     artists.id, name, photo_url,
                     nationality, title, album,
                     preview_link, artwork
                     from
                     artists inner join songs
                     on
                     artists.id = songs.artist_id
                     where artists.id = $1`

        poolInstance.query(query, [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.rows)
            }
        })
    }

    return {
        createSingle: createSingle,
        read: read,
        readSingle: readSingle,
        readSongs: readSongs,
        updateSingle: updateSingle,
        destroySingle: destroySingle,
    };
}