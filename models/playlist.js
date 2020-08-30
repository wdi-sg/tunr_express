/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope


  let getPlayList = (callback)=>{
        let query = 'SELECT * FROM Playlist ORDER BY id';
        dbPoolInstance.query(query,(err,result)=>{
            callback(err,result)
        })
    }

  let getNewPlayList = (callback)=>{
        callback(null,null);
  }

  let getCreatePlayList = (name,callback)=>{
        let query ='INSERT INTO Playlist (name) VALUES ($1)'
        const values = [name]
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result);
        })
  }

  let getAddSongToPlayList = ( callback)=>{
        callback(null,null);
  }

  let getAddedSongToPlayList = (playListId,songName,callback)=>{
        let query = 'INSERT INTO playlist_song (song_id,playlist_id)VALUES((SELECT id from songs WHERE name =$1),$2)';
        const values = [songName,playListId];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getListPlayListSongs = (value,callback)=>{
        let query = 'SELECT * FROM playlist_song where playlist_id = $1';
        const values = [value];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }



  return {
    getPlayList:getPlayList,
    getNewPlayList,
    getCreatePlayList,
    getAddSongToPlayList,
    getListPlayListSongs,
    getAddedSongToPlayList,

      };
};
