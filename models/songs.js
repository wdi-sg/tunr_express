module.exports = (dbPoolInstance) => {
    console.log("songs models accessed")

    let getAll = (callback) =>{
        dbPoolInstance.query("SELECT * FROM songs;", (err, result) =>{
            if (err) {
                console.log(err.stack)
            } else {
                callback(err, result);
            }
        })
    }

    let postNewSong = (values, callback) => {
        dbPoolInstance.query("INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1, $2, $3, $4, $5);", values, (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                callback(err, result);
            }
        })
    }

    let getSong = (id, callback) => {
        dbPoolInstance.query("SELECT * FROM songs WHERE id = $1;", [id], (err, result) =>{
            if (err) {
                console.log(err.stack)
            } else {
                callback(err, result);
            }
        })
    }

    let editInfo = (id, callback) => {
        dbPoolInstance.query("SELECT * FROM songs WHERE id = $1;", [id], (err, result) => {
        if (err) {
            console.log("Error", err.stack);
        } else {
            console.log(result);
           callback(err, result);
        }
    })
}
    let updateInfo = (values, callback) => {
        console.log(values);
        dbPoolInstance.query("UPDATE songs SET title = $2, album = $3, preview_link = $4, artwork = $5, artist_id = $6 WHERE id = $1;", values, (err, result) => {
            if (err) {
                console.log("Error", err.stack);
            } else {
                callback(err, result);
        }
    })
}

    let removeEntry = (id, callback) => {
        dbPoolInstance.query("DELETE FROM songs WHERE id = $1;", [id], (err, result) => {
            if (err) {
                console.log("Error", err.stack);
            } else {
                callback(err, result);
        }
    })
}

    return {
        getAll,
        postNewSong,
        getSong,
        editInfo,
        updateInfo,
        removeEntry
    }
}