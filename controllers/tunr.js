module.exports = (db) =>{
    let allArtists = (request, response) => {
      let queryText = "SELECT * FROM artists"
      db.pool.query(queryText, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("error occured")
        } else {
            response.render('home', res)
        }
      })
    }

    let newArtistForm = (request, response) => {
      response.render('new');
    }

    let createNewArtist = (request, response) => {
      let queryText = "INSERT INTO artists(name,photo_url,nationality) VALUES($1,$2,$3)"
      let values = [request.body.artistName, request.body.photoURL, request.body.nationality]
      db.pool.query(queryText, values, (err, res)=>{
        if(err){
            console.log(err)
            response.send("Error occurred. Data not added.")
        } else {
            response.send("Artist created successfully! <a href='/artists/'>Back to homepage.</a>")
        }
      })

    }

    let artistPage = (request, response) => {
      let artistId = [request.params.id]
      let queryText = "SELECT * FROM artists WHERE id=$1"
      db.pool.query(queryText, artistId, (err, res)=>{
        if(err){
            console.log(err)
            response.send("Error occurred.")
        } else {
            response.render('indivArtist', res)
        }
      })
    }

    let editArtistPage = (request, response) => {
      let artistId = [request.params.id]
      let queryText = "SELECT * FROM artists WHERE id=$1"
      db.pool.query(queryText, artistId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred")
        } else {
            response.render('edit', res)
        }
      })
    }

    let editArtist = (request, response) => {
      let values = [request.body.artistName, request.body.photoURL, request.body.nationality, request.params.id]
      let queryText = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id=$4"
      db.pool.query(queryText, values, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred, artist not updated.")
        } else {
            response.send("Artist successfully updated. <a href='/artists/'>Back to homepage.</a>")
        }
      })
    }

    let deleteArtist = (request, response) => {
      let queryText="DELETE from artists WHERE id=$1"
      let artistId = [request.params.id]
      db.pool.query(queryText, artistId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred")
        } else {
            let queryText2 = "DELETE from songs WHERE artist_id=$1"
            db.pool.query(queryText2, artistId, (err, res)=>{
                response.send("Artist successfully deleted.<a href='/artists/'>Back to homepage.</a>" )
            })
        }
      })
    }

    let artistSongPage = (request, response)=>{
        let queryText = "SELECT * FROM songs INNER JOIN (SELECT id AS artist_ids, name AS artist_name FROM artists) AS artistB ON songs.artist_id=artistB.artist_ids WHERE artist_id=$1"
        let artistId = [request.params.id]
        db.pool.query(queryText, artistId, (err, res)=>{
            if(err){
                console.log(err.message)
                response.send("Error occurred")
            } else {
                if(res.rows.length==0){
                    let artistnewSongURL = "/artists/" + request.params.id + "/songs/new"
                    response.send(`No songs for this artist yet!  <a href=${artistnewSongURL}>Add a new song for this artist.</a>`)
                } else {
                    response.render('artistSongs', res)
                }

            }
        })
    }

    let newSongByArtist = (request, response)=>{
        let queryText = "SELECT * FROM artists WHERE id=$1"
        let artistId = [request.params.id]
        db.pool.query(queryText, artistId, (err, res)=>{
            if(err){
                console.log(err.message)
                response.send("error occurred.")
            } else {
                response.render('newArtistSong', res)
            }
        })
    }

    let allSongs = (request, response) => {
      let queryText = "SELECT * FROM songs"
      db.pool.query(queryText, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("error occured")
        } else {
            response.render('homeSongs', res)
        }
      })
    }

    let newSongForm = (request, response) => {
        let queryText = "SELECT * FROM artists"
        db.pool.query(queryText, (err, res)=>{
            if(err){
                console.log(err.message)
                response.send("Error occurred.")
            } else {
                response.render('newSongs', res);
            }
        })

    }

    let createNewSong = (request, response) => {
      let queryText = "INSERT INTO songs(title,album,preview_link,artwork,artist_id) VALUES($1,$2,$3,$4,$5)"
      let x = request.body
      let values = [x.songTitle, x.album, x.previewLink, x.artwork, x.artistID]
      db.pool.query(queryText, values, (err, res)=>{
        if(err){
            console.log(err)
            response.send("Error occurred. Data not added.")
        } else {
            response.send("Song created successfully! <a href='/artists/'>Back to homepage.</a>")
        }
      })

    }

    let songPage = (request, response) => {
      let songId = [request.params.id]
      let queryText = "SELECT * FROM songs INNER JOIN (SELECT id AS artist_ids, name AS artist_name FROM artists) AS artist on songs.artist_id=artist.artist_ids WHERE songs.id=$1"
      db.pool.query(queryText, songId, (err, res)=>{
        if(err){
            console.log(err)
            response.send("Error occurred.")
        } else {
            response.render('indivSong', res)
        }
      })
    }

    let editSongPage = (request, response) => {
      let artistId = [request.params.id]
      let queryText = "SELECT * FROM songs WHERE songs.id=$1"
      db.pool.query(queryText, artistId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred")
        } else {
            let queryText2 = "SELECT * FROM artists"
            db.pool.query(queryText2, (err2, res2)=>{
                if(err2){
                    console.log(err.message)
                    response.send("Error occurred.")
                } else {
                    res.artists = res2.rows
                    response.render('editSongs', res);
                }
            })
        }
      })
    }

    let editSong = (request, response) => {
      let queryText = "UPDATE songs SET title=$1,album=$2,preview_link=$3,artwork=$4,artist_id=$5 WHERE id=$6"
      let x = request.body
      let values = [x.songTitle, x.album, x.previewLink, x.artwork, x.artistID, request.params.id]
      db.pool.query(queryText, values, (err, res)=>{
        if(err){
            console.log(err)
            response.send("Error occurred. Data not updated.")
        } else {
            response.send("Song edited successfully! <a href='/songs/'>Back to homepage.</a>")
        }
      })

    }

    let deleteSong = (request, response) => {
      let queryText="DELETE from songs WHERE id=$1"
      let artistId = [request.params.id]
      pool.query(queryText, artistId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred")
        } else {
            response.send("Song successfully deleted.<a href='/songs/'>Back to homepage.</a>" )
        }
      })
    }


    return {
        allArtists,
        newArtistForm,
        createNewArtist,
        artistPage,
        editArtistPage,
        editArtist,
        deleteArtist,
        artistSongPage,
        newSongByArtist,
        allSongs,
        newSongForm,
        createNewSong,
        songPage,
        editSongPage,
        editSong,
        deleteSong
    }
}