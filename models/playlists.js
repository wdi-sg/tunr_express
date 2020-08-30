module.exports = (dbPoolInstance) => {

    let postNewPlaylist = (values, callback) => {
        dbPoolInstance.query("INSERT INTO playlists (id, name) VALUES ($1, $2);", values, (err, result) => {
                if (err) {
                    console.log(err.message);
                } else {
                    callback(err, result);
            }
        })
    }

    let getAll = (id, callback) => {
        dbPoolInstance.query("SELECT * FROM playlists where id = $1;", [id], (err, result) => {
                if (err) {
                    console.log(err.message);
                } else {
                    callback(err, result);
            }
        })
    }

    return {
        postNewPlaylist,
        getAll
    }
}