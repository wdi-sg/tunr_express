module.exports = (dbPoolInstance) => {

    let allPlaylists_cb = (callback) => {

        let text = 'SELECT * FROM playlists';

        dbPoolInstance.query(text, (err, result) => {
            if (err) {
                console.log('error at playlists_model, allPlaylists_cb ---', err.message);
                callback(null,null);
            }
            else {
                callback(null, result);
            }
        })
    }

    let createNewPlaylist_cb = (name, callback) => {

        let text = 'INSERT INTO playlists (name) VALUES ($1)';

        let values = [name];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error at playlists_model, createNewPlaylist_cb ---', err.message);
            }
            else {
                callback(null, result);
            }
        })
        
    } 

    let getPlaylist_cb = (id, callback) => {

        let text = 'SELECT * FROM playlists WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error at playlists_model, getPlaylist_cb ---', err.message);
                callback(null, null);
            }
            else {
                callback(null,result);
            }
        })
    }

    let editPlaylist_cb = (id, callback) => {
        
        let text = 'SELECT * FROM playlists WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text,values, (err, result) => {
            if (err) {
                console.log('error at playlists_model, editPlaylist_cb ---', err.message);
                callback(null, null);
            }
            else {
                callback(null,result);
            } 
        })
    }

    let editedPlaylist_cb = (name, id, callback) => {

        let text = 'UPDATE playlists SET name = $1 WHERE id = $2';

        let values = [name, id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error at playlists_model, editedPlaylist_cb ---', err.message);
                callback(null, null);
            }
            else {
                callback(null,result);
            }
        })
    }

    let deletePlaylist_cb = (id, callback) => {

        let text = 'DELETE FROM playlists WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error at playlists_model, deletePlaylist_cb ---', err.message);
                callback(null, null);
            }
            else {
                callback(null,result);
            }
        })
    }

    let addSongToPlaylist_cb = (name, id, callback) => {

        let text = 'INSERT INTO playlist_songs (song_id, playlist_id) VALUES ((SELECT id FROM songs WHERE name = $1), $2) ;

        let values = [name, id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error at playlists_model, addSongToPlaylist_cb ---', err.message);
                callback(null, null);
            }
            else {
                callback(null,result);
            }
        })
    }




    return {
        allPlaylists_cb,
        createNewPlaylist_cb,
        getPlaylist_cb,
        editPlaylist_cb,
        editedPlaylist_cb,
        deletePlaylist_cb,
        addSongToPlaylist_cb
    }
}