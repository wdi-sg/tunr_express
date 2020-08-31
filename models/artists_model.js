module.exports = (dbPoolInstance) => {

    let allArtists_cb = (callback) => {

        let text = 'SELECT * FROM Artists';

        dbPoolInstance.query(text, (err,result) => {
            if (err) {
                console.log('error --- artists_model allArtists_cb', err.message);
                callback(null,null);
            }
            else {
                callback(null,result);
            }
        })
    }

    let createNewArtist_cb = (name, img_url, nationality, callback) => {
        
        let text = 'INSERT INTO Artists (name, photo_url, nationality) VALUES ($1, $2, $3)';

        let values = [name, img_url, nationality];

        dbPoolInstance.query(text, values, (err,result) => {
            if (err) {
                console.log('error --- artists_model createNewArtist_cb', err.message);
                callback(null,null);
            }
            else {
                callback(null,result);
            }
        })
    } 

    let getArtist_cb = (id, callback) => {
        
        let text = 'SELECT * FROM Artists WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- artists_model getArtist_cb', err.message);
                callback(null,null);
            }
            else {
                callback(null,result);
            }
        })
    }
    
    let deleteArtist_cb = (id, callback) => {
        
        let text = 'DELETE FROM Artists WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- artists_model deleteArtist_cb', err.message);
                callback(null,null);
            }
            else {
                callback(null,result)
            }
        })
    } 

    let editArtist_cb = (id, callback) => {
        
        let text = 'SELECT * FROM Artists WHERE id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- artists_model editArtist_cb', err.message);
                callback(null,null);
            }
            else {
                callback(null,result)
            }
        })
    }

    let editedArtist_cb = (name, img_url, nationality, id, callback) => {
        
        let text = 'UPDATE Artists SET name = $1, photo_url = $2, nationality = $3 WHERE id = $4';

        let values = [name, img_url, nationality, id];

        dbPoolInstance.query(text, values,  (err, result) => {
            if (err) {
                console.log('error --- artists_model editedArtist_cb', err.message);
                callback(null,null);
            }
            else {
                callback(null,result)
            }
        })
    } 

    let artistSongs_cb = (id, callback) => {
        
        let text = 'SELECT Songs.*, Artists.* FROM Songs INNER JOIN Artists ON Songs.artist_id = Artists.id WHERE artist_id = $1';

        let values = [id];

        dbPoolInstance.query(text, values, (err, result) => {
            if (err) {
                console.log('error --- artists_model artistSongs_cb', err.message);
                callback(null,null);
            }
            else {
                callback(null,result)
            }
        })
    }

    

    return {  
        allArtists_cb,
        createNewArtist_cb,
        getArtist_cb,
        deleteArtist_cb,
        editArtist_cb,
        editedArtist_cb,
        artistSongs_cb
    }
}