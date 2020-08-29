
module.exports = (dbPoolInstance) => {

let getNewPlaylist = (callback) => {
    let query = "SELECT * FROM playlist"
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}

let getCreatePlaylist = (name, callback) => {
    let query = `INSERT INTO playlist (name) VALUES('${name}')`
    dbPoolInstance.query(query,(error, queryResult) => {
        callback(error,queryResult)
    })
}


let getIndividualPlaylist = (id,callback)=> {
//need additional id arguments to identify students
    let query = `SELECT playlist_song.id AS id, playlist.name AS playlist_name,songs.title AS songs_title,artists.name AS artist_name,songs.album FROM playlist INNER JOIN playlist_song ON playlist.id = playlist_song.playlist_id AND playlist_id='${id}' INNER JOIN songs ON playlist_song.song_id = songs.id INNER JOIN artists ON songs.artist_id = artists.id`;
    dbPoolInstance.query(query,(err,result)=>{
        callback(err,result)
    })
}


// let query = `SELECT * FROM artists INNER JOIN songs ON artists.id = songs.artist_id WHERE artist_id='${id}'`;

// let getSongsList = (callback)=> {
//     let query = `SELECT * FROM songs`;
//     dbPoolInstance.query(query,(error, queryResult) => {
//         callback(error,queryResult)
//     })
// }




// let getEditSong = (id,callback) => {
//     let query = `SELECT * FROM songs WHERE id='${id}'`;
//     dbPoolInstance.query(query,(error, queryResult) => {
//         callback(error,queryResult)
//     })
// }

// let getUpdateSong = (id,title, album, preview_link, artwork,callback) => {
//     let values = [id,title, album, preview_link, artwork];
//     const query = `UPDATE songs SET title=$2, album=$3, preview_link=$4, artwork=$5 WHERE id=$1`
//     dbPoolInstance.query(query,values,(error, queryResult) => {
//         callback(error,queryResult)
//     })
// }

// let getDeleteSong= (id,callback) => {
//      let query = `SELECT * FROM songs WHERE id='${id}'`;
//     dbPoolInstance.query(query,(error, queryResult) => {
//         callback(error,queryResult)
//     })
// }

// let getSongDeleted = (id,title,callback) => {
//     let query = `DELETE FROM songs WHERE id='${id}'`;
//     dbPoolInstance.query(query,(error, queryResult) => {
//         callback(error,queryResult)
//     })
// }



  return {
    getNewPlaylist,
    getCreatePlaylist,
    getIndividualPlaylist
  };
};
