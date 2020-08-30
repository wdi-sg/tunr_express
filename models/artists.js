
//this will require access to allModels

module.exports = (dbPoolInstance) => {


let getAll = (fromController) => {
    let query = 'SELECT * FROM artists;'
    dbPoolInstance.query(query, (err, result) => fromController(err, result))
}

let postNewArtist = (values, fromController) => {
    dbPoolInstance.query("INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3);", values, (err, result) => {
        if (err) {
            console.log("Error", err.stack);
        } else {
            fromController(err, result);
        }
    })
}


let artistInfo = (id, fromController) => {
    dbPoolInstance.query('SELECT * FROM artists WHERE id = $1;', id, (err, result) => {
        if (err) {
            console.log("Error", err.stack);
        } else {
            fromController(err, result);
        }
    })
}

let editInfo = (id, fromController) => {
    dbPoolInstance.query("SELECT * FROM artists WHERE id = $1;", [id], (err, result) => {
        if (err) {
            console.log("Error", err.stack);
        } else {
           fromController(err, result);
        }
    })
}


let updateInfo = (values, fromController) => {
    dbPoolInstance.query("UPDATE artists SET name = $2, photo_url = $3, nationality = $4 WHERE id = $1;", values, (err, result) => {
        if (err) {
            console.log("Error", err.stack);
        } else {
           fromController(err, result);
        }
    })
}

let removeEntry = (id, fromController) => {
    dbPoolInstance.query("DELETE FROM artists WHERE id = $1;", [id], (err, result) => {
        console.log("this triggered");
        if (err) {
            console.log("Error", err.stack);
        } else {
           fromController(err, result);
        }
    })
}

let getSongs = (id, fromController) => {
    dbPoolInstance.query("SELECT * FROM songs WHERE artist_id = $1;", [id], (err, result) => {
        if (err) {
            console.log("Error", err.stack);
        } else {
           fromController(err, result);
        }
    })
}

    return {
        getAll: getAll,
        postNewArtist,
        artistInfo,
        editInfo,
        updateInfo,
        removeEntry,
        getSongs
    };

};