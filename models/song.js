module.exports = (poolInstance) => {

    /*
    export functions to enable crud in database
    callbacks are given by controller
    as model must not interact with views
     */
    let createSingle = (userInput, callback) => {
        let query =
            `insert into songs
            (title, album, preview_link, artwork, artist_id)
            values ($1, $2, $3, $4,
            (select id from artists where name = $5))
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

    // see all the songs
    let read = (callback) => {
        let query = 'select * from songs';
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
        let query = `select
                     songs.id, songs.title, songs.album,
                     songs.preview_link, songs.artwork,
                     songs.artist_id,
                     artists.name, artists.photo_url,
                     artists.nationality
                     from
                     songs left join artists
                     on songs.artist_id = artists.id
                     where songs.id = $1`;

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
        let query = `update songs
                     set
                     title=$1,
                     album=$2,
                     preview_link=$3,
                     artwork=$4,
                     artist_id=
                     (select id from artists
                     where name = $5)
                     where id=$6`

        poolInstance.query(query, userInput, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, null);
            }
        })
    }

    let destroySingle = (id, callback) => {
        let query = `delete from songs
                     where id = $1`
        poolInstance.query(query, [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, null);
            }
        })
    }

    let newArtistSong = (id, callback) => {
        let query = `select name from artists
                     where id = $1`

        poolInstance.query(query, [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else if (result.rows.length > 0) {
                callback(null, result.rows);
            } else {
                callback(null, null);
            }
        })
    }

    return {
        createSingle: createSingle,
        read: read,
        readSingle: readSingle,
        newArtistSong: newArtistSong,
        updateSingle: updateSingle,
        destroySingle: destroySingle,
    };
}