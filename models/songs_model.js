module.exports = (dbPoolInstance) => {

    let allSongs_cb = (callback) => {
        
        let text = 'SELECT * FROM Songs';

        dbPoolInstance.query(text, (err, result) => {
            if (err) {
                console.log('error --- songs_model allSongs_cb', err.message);
                callback(null,null);
            }
            else {
                callback(err,result)
            }
        })
    }

    let createNewSong_cb = (title, album, preview_link, artwork, artistName, callback) => {
        
        let text = 'INSERT INTO Songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, (SELECT id FROM Artists WHERE lower(name) = lower($5)))';

        let values = [title, album, preview_link, artwork, artistName]; 

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- songs_model createNewSong_cb', err.message);
                callback(null,null);
            }
            else {
                callback(err,result)
            }
        })
    }

    let getSong_cb = (id, callback) => {
        
        let text = 'SELECT * FROM Songs WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- songs_model getSong_cb', err.message);
                callback(null,null);
            }
            else {
                callback(err,result);
            }
        })
    }

    let deleteSong_cb = (id, callback) => {
        
        let text = 'DELETE FROM Songs WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- songs_model deleteSong_cb', err.message);
                callback(null,null);
            }
            else {
                callback(err,result)
            }
        })
    }

    let editSong_cb = (id, callback) => {
        
        let text = 'SELECT * FROM Songs WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- songs_model editSong_cb', err.message);
                callback(null,null);
            }
            else {
                callback(null,result);
            }
        })
    }

    let editedSong_cb = (title, album, preview_link, artwork, id, callback) => {
        
        let text = 'UPDATE Songs SET title = $1, album = $2, preview_link = $3, artwork = $4 WHERE id = $5';

        let values = [title, album, preview_link, artwork, id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- songs_model editedSong_cb', err.message);
                callback(null,null);
            }
            else {
                callback(err,result)
            }
        })
    }

    return {
        allSongs_cb,
        createNewSong_cb,
        getSong_cb,
        deleteSong_cb,
        editSong_cb,
        editedSong_cb
    }
}