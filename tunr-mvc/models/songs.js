/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope


let getSongsList = (callback)=> {
    let query = `SELECT * FROM songs`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getNewSong = (callback) => {
    let query = "SELECT * FROM songs"
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getCreateSong = (title, album, preview_link, artwork,artist_id,callback) => {
    let values = [title, album, preview_link, artwork,artist_id];
    let query = `INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES($1,$2,$3,$4,$5)`
    dbPoolInstance.query(query,values,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getIndividualSong = (id,callback)=> {
//need additional id arguments to identify students
    let query = `SELECT * FROM songs WHERE id='${id}'`;
    dbPoolInstance.query(query,(err,result)=>{
        callback(err,result)
    })
}

let getEditSong = (id,callback) => {
    let query = `SELECT * FROM songs WHERE id='${id}'`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getUpdateSong = (id,title, album, preview_link, artwork,callback) => {
    let values = [id,title, album, preview_link, artwork];
    const query = `UPDATE songs SET title=$2, album=$3, preview_link=$4, artwork=$5 WHERE id=$1`
    dbPoolInstance.query(query,values,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getDeleteSong= (id,callback) => {
     let query = `SELECT * FROM songs WHERE id='${id}'`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getSongDeleted = (id,title,callback) => {
    let query = `DELETE FROM songs WHERE id='${id}'`;
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}



  return {
    getSongsList,
    getNewSong,
    getCreateSong,
    getIndividualSong,
    getEditSong,
    getUpdateSong,
    getDeleteSong,
    getSongDeleted
  };
};
