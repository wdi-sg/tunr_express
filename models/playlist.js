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

  let getAddSongToPlayList = (id,callback)=>{
        let query = `SELECT * FROM playlist WHERE id = $1`;
        const values = [id]
        dbPoolInstance.query(query, values, (err,results)=>{
            callback(err,results);
        })
  }

  let getAddedSongToPlayList = (playListId,songName,callback)=>{
        let query = 'INSERT INTO playlist_songs (song_id,playlist_id)VALUES((SELECT id from songs WHERE title =$1 limit 1),$2)';
        const values = [songName,playListId];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getListPlayListSongs = (value,callback)=>{
        let query = 'SELECT title from (SELECT songs.title, playlist_songs.playlist_id FROM songs INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id =$1) AS combitable';
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
