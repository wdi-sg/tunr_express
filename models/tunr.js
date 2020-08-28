module.exports = (dbPoolInstance) =>{

    let getAllArtists = (callback)=>{
      let queryText = "SELECT * FROM artists ORDER BY name"
      dbPoolInstance.query(queryText, (err, res)=>{
        callback(err, res)
      })
    }

    let postNewArtist = (values, callback)=>{
      let queryText = "INSERT INTO artists(name,photo_url,nationality) VALUES($1,$2,$3)"
      dbPoolInstance.query(queryText, values, (err, res)=>{
        callback(err, res)
      })
    }

    let getArtist = (id, callback) => {
        let queryText = "SELECT * FROM artists WHERE id=$1"
        dbPoolInstance.query(queryText, id, (err, res)=>{
            callback(err, res)
        })
    }

    let updateArtist = (values, callback) =>{
        let queryText = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4"
        dbPoolInstance.query(queryText, values, (err, res)=>{
            callback(err, res)
        })
    }

    let deleteArtist = (id, callback)=>{
        let queryText="DELETE from artists WHERE id=$1"
        dbPoolInstance.query(queryText, id, (err, res)=>{
            callback(err, res)
        })
    }

    let deleteSongsByArtist = (id, callback)=>{
        let queryText = "DELETE from songs WHERE artist_id=$1"
        dbPoolInstance.query(queryText, id,(err,res)=>{
            callback(err,res)
        })
    }

    let getSongsByArtist = (id, callback)=>{
        let queryText = "SELECT * FROM songs INNER JOIN (SELECT id AS artist_ids, name AS artist_name FROM artists) AS artistB ON songs.artist_id=artistB.artist_ids WHERE artist_id=$1 ORDER BY songs.title"
        dbPoolInstance.query(queryText, id, (err, res)=>{
            callback(err, res)
        })

    }

    let getAllSongs = (callback)=>{
        let queryText = "SELECT * FROM songs ORDER BY title"
        dbPoolInstance.query(queryText, (err, res)=>{
            callback(err,res)
        })
    }

    let postNewSong = (values, callback)=>{
        let queryText = "INSERT INTO songs(title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5)"
        dbPoolInstance.query(queryText, values, (err, res)=>{
            callback(err, res)
        })
    }

    let getSong = (id, callback) =>{
        let queryText = "SELECT * FROM songs INNER JOIN (SELECT id AS artist_ids, name AS artist_name FROM artists) AS artist on songs.artist_id=artist.artist_ids WHERE songs.id=$1"
        dbPoolInstance.query(queryText, id, (err, res)=>{
            callback(err,res)
        })
    }

    let updateSong = (values, callback)=>{
        let queryText = "UPDATE songs SET title=$1,album=$2,preview_link=$3,artwork=$4,artist_id=$5 WHERE id=$6"
        dbPoolInstance.query(queryText, values, (err, res)=>{
            callback(err, res)
        })
    }

    let deleteSong = (id, callback) => {
        let queryText="DELETE from songs WHERE id=$1"
        dbPoolInstance.query(queryText, id, (err,res)=>{
            callback(err,res)
        })
    }





    return {
        getAllArtists,
        postNewArtist,
        getArtist,
        updateArtist,
        deleteArtist,
        deleteSongsByArtist,
        getAllSongs,
        getSongsByArtist,
        postNewSong,
        getSong,
        updateSong,
        deleteSong
    }

}