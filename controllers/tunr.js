module.exports = (db) =>{
    let allArtists = (request, response) => {
        db.tunr.getAllArtists((err, res) =>{
            if(err){
                response.send("Error occurred.")
            } else {
                response.render('home', res)
            }
        })
    }

    let newArtistForm = (request, response) => {
      response.render('new');
    }

    let createNewArtist = (request, response) => {
      let x = request.body
      let values = [x.artistName, x.photoURL, x.nationality]
      db.tunr.postNewArtist(values, (err, res)=>{
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
      db.tunr.getArtist(artistId, (err, res)=>{
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
      db.tunr.getArtist(artistId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred")
        } else {
            response.render('edit', res)
        }
      })
    }

    let editArtist = (request, response) => {
      let x = request.body
      let values = [x.artistName, x.photoURL, x.nationality, request.params.id]
      db.tunr.updateArtist(values, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred, artist not updated.")
        } else {
            response.send("Artist successfully updated. <a href='/artists/'>Back to homepage.</a>")
        }
      })
    }

    let deleteArtist = (request, response) => {
      let artistId = [request.params.id]
      db.tunr.deleteArtist(artistId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred")
        } else {
            db.tunr.deleteSongsByArtist(artistId, (err, res)=>{
                response.send("Artist successfully deleted.<a href='/artists/'>Back to homepage.</a>" )
            })
        }
      })
    }

    let artistSongPage = (request, response)=>{
        let artistId = [request.params.id]
        db.tunr.getSongsByArtist(artistId, (err, res)=>{
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
        let artistId = [request.params.id]
        db.tunr.getArtist(artistId, (err, res)=>{
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
      db.tunr.getAllSongs((err, res)=>{
        if(err){
            console.log(err.message)
            response.send("error occured")
        } else {
            response.render('homeSongs', res)
        }
      })
    }

    let newSongForm = (request, response) => {
        db.tunr.getAllArtists((err, res)=>{
            if(err){
                console.log(err.message)
                response.send("Error occurred.")
            } else {
                response.render('newSongs', res);
            }
        })

    }

    let createNewSong = (request, response) => {
      let x = request.body
      let values = [x.songTitle, x.album, x.previewLink, x.artwork, x.artistID]
      db.tunr.postNewSong(values, (err, res)=>{
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
      db.tunr.getSong(songId, (err, res)=>{
        if(err){
            console.log(err)
            response.send("Error occurred.")
        } else {
            response.render('indivSong', res)
        }
      })
    }

    let editSongPage = (request, response) => {
      let songId = [request.params.id]
      db.tunr.getSong(songId, (err, res)=>{
        if(err){
            console.log(err.message)
            response.send("Error occurred")
        } else {
            db.tunr.getAllArtists((err2, res2)=>{
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
      let x = request.body
      let values = [x.songTitle, x.album, x.previewLink, x.artwork, x.artistID, request.params.id]
      db.tunr.updateSong(values, (err, res)=>{
        if(err){
            console.log(err)
            response.send("Error occurred. Data not updated.")
        } else {
            response.send("Song edited successfully! <a href='/songs/'>Back to homepage.</a>")
        }
      })

    }

    let deleteSong = (request, response) => {
      let songId = [request.params.id]
      db.tunr.deleteSong(songId, (err, res)=>{
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