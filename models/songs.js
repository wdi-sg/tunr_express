/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getSongs = (request,callback)=>{
        let query = 'SELECT * FROM songs ORDER BY id ASC';
        dbPoolInstance.query(query, (err,result)=>{
            callback(err,result)
        })
  }

  let getNewSong = (request,callback)=>{
            callback(null,null);
  }

  let getPostSong = (request,callback)=>{
        let {title, album, preview_link, artwork, artist_id} = request.body;
        let query = 'INSERT INTO songs (title, album, preview_link, artwork, artist_id) VALUES ($1,$2,$3,$4,(SELECT id FROM Artists where name=$5))';
        const values = [title,album, preview_link, artwork, artist_id];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getIdSong = (request,callback)=>{
        let query = 'SELECT songs.*, Artists.name, Artists.photo_url FROM songs INNER JOIN Artists ON Artists.id = songs.artist_id where songs.id = $1';
        const values = [request.params.id];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getEditSong = (request,callback)=>{
        let query = 'SELECT songs.*, Artists.name, Artists.photo_url FROM songs INNER JOIN Artists ON Artists.id = songs.artist_id where songs.id = $1';
        const values = [request.params.id];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getUpdateSong = (id,data,callback)=>{
        let query = `UPDATE songs SET title = $1, album = $2, preview_link = $3, artwork = $4 WHERE id = ${id}`;
        console.log(data)
        const values = data;
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getDelSong = (request,callback)=>{
        let query = 'DELETE FROM songs WHERE id = $1';
        const values = [request.params.id];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }


  return {
    getSongs: getSongs,
    getNewSong,
    getPostSong,
    getIdSong,
    getEditSong,
    getUpdateSong,
    getDelSong,
      };
};
