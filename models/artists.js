/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope


  let getArtists = (callback)=>{
        let query = 'SELECT * FROM Artists ORDER BY id';
        dbPoolInstance.query(query,(err,result)=>{
            callback(err,result)
        })
    }

  let getNewArtist = (callback)=>{
        callback(null,null);
  }

  let getPostArtist = (callback)=>{
        let name = request.body.name;
        let photo_url = request.body.photo_url;
        let nationality = request.body.nationality;
        let query ='INSERT INTO Artists (name, photo_url, nationality) VALUES ($1,$2,$3)'
        const values = [name,photo_url,nationality];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result);
        })
  }
  let getIdArtist = (values, callback)=>{
        let query = 'SELECT * FROM Artists where id = $1';
        const value = values
        dbPoolInstance.query(query, value, (err,result)=>{
            callback(err,result)
        })
  }

  let getEditArtist = (request,callback)=>{
        let query = 'SELECT * FROM Artists where id = $1';
        const values = [request.params.id];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getUpdateArtist = (request,callback)=>{
        let {name,photo_url,nationality} = request.body;
        let query = 'UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4';
        const values = [name,photo_url,nationality,request.params.id];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getDelArtist = (request,callback)=>{
        let query = 'DELETE FROM Artists WHERE id = $1';
        const values = [request.params.id];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  let getAllSongsArtist = (request,callback)=>{
        let query = 'SELECT songs.*, Artists.name, Artists.photo_url FROM songs INNER JOIN Artists ON Artists.id = songs.artist_id where artist_id = $1';
        const values = [request.params.id];
        dbPoolInstance.query(query, values, (err,result)=>{
            callback(err,result)
        })
  }

  return {
    getArtists: getArtists,
    getNewArtist,
    getPostArtist,
    getIdArtist,
    getEditArtist,
    getUpdateArtist,
    getDelArtist,
    getAllSongsArtist
      };
};
