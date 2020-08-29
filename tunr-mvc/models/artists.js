/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope


let getArtistSongs = (id,callback)=> {
    let query = `SELECT * FROM songs WHERE artist_id='${id}'`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getIndividualArtist = (id,callback)=> {
//need additional id arguments to identify students

    let query = `SELECT * FROM artists WHERE id='${id}'`;

    dbPoolInstance.query(query,(err,result)=>{
        callback(err,result)
    })

}

let getNewArtist = (callback) => {
    let query = "SELECT * FROM artists"
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getCreateArtist = (name,photo_url,nationality,callback) => {
    let values = [name,photo_url,nationality];
    let query = `INSERT INTO artists (name,photo_url,nationality) VALUES($1,$2,$3)`
    dbPoolInstance.query(query,values,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getAllArtists = (callback) => {
    let query = "SELECT * FROM artists"
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getEditArtist = (id,callback) => {
    let query = `SELECT * FROM artists WHERE id='${id}'`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getUpdateArtist = (id,name,photo_url,nationality,callback) => {
    let values = [id,name,photo_url,nationality];
    const query = `UPDATE artists SET name=$2, photo_url=$3, nationality=$4 WHERE id=$1`
    dbPoolInstance.query(query,values,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getDeleteArtist = (id,callback) => {
    let query = `SELECT * FROM artists WHERE id='${id}'`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getArtistDeleted = (id,name,callback) => {
    let query = `DELETE FROM artists WHERE id='${id}'`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getArtistNewSong = (id,callback) => {
    let query = `SELECT * FROM artists INNER JOIN songs ON artists.id = songs.artist_id WHERE artist_id='${id}'`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getAddArtistNewSong = (title, album, preview_link, artwork,artist_id,callback) => {
    let values = [title, album, preview_link, artwork,artist_id];
    const query = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES($1,$2,$3,$4,$5)`
    dbPoolInstance.query(query,values,(error, queryResult) => {
        callback(error,queryResult)
    })
}


  return {
    getArtistSongs,
    getIndividualArtist,
    getNewArtist,
    getCreateArtist,
    getAllArtists,
    getEditArtist,
    getUpdateArtist,
    getDeleteArtist,
    getArtistDeleted,
    getArtistNewSong,
    getAddArtistNewSong
  };
};
