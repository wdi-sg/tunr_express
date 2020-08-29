module.exports = (db) => {

  /**
   * ===========================================
   * Controller Logic
   * ===========================================
   */

  const artistSongs = (request, response) => {
    let {id} = request.params;
      db.artists.getArtistSongs(id,(err, res) => {
        if(err){response.send("unable to save your data!")} else {
        response.render('artists/songprofile', { songs: res.rows });
    }
      });
  };

  const individualArtist = (request,response) => {
    let {id} = request.params;
    db.artists.getIndividualArtist(id,(err,res)=>{
        if(err){response.send("unable to save your data!")}
        else {response.render('artists/profile', res.rows[0])}
    })
  }


  const newArtist = (request,response) => {
    db.artists.getNewArtist((err,res)=>{
        if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('artists/new');
        }
    })
  }

const createArtist = (request,response) => {
    let {name, photo_url, nationality} = request.body;
    db.artists.getCreateArtist(name, photo_url, nationality,(err,res)=>{
                if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.send(`Artist ${name} was added to the db successfully!`)
        }
    })
}

const allArtists = (request,response) => {

    db.artists.getAllArtists((err,res)=>{
                if(err){
                    console.log(err)
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('artists/home', {artists: res.rows})
        }
    })
}

  const editArtist = (request,response) => {
    let {id} = request.params
    db.artists.getEditArtist(id,(err,res)=>{
        if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('artists/editprofile',res.rows[0]);
        }
    })
  }

  const updateArtist = (request,response) => {
    let {id} = request.params;
    let {name, photo_url, nationality} = request.body;
    db.artists.getUpdateArtist(id,name, photo_url, nationality,(err,res)=>{
                if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.send(`Artist data successfully updated!`)
        }
    })
}

const deleteArtist = (request,response) => {
    let {id} = request.params;
    db.artists.getDeleteArtist(id,(err,res)=>{
        if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('artists/deleteprofile',res.rows[0]);
        }
    })
  }

 const artistDeleted = (request,response) => {
    let {id} = request.params;
    let {name} = request.body;
    db.artists.getArtistDeleted(id,name,(err,res)=>{
                if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.send(`Artist ${name}'s data successfully deleted from database!`)
        }
    })
}

const artistNewSong = (request,response) => {
    let {id} = request.params;
    db.artists.getArtistNewSong(id,(err,res)=>{
        if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('artists/artistnewsong',res.rows[0]);
        }
    })
  }

const addArtistNewSong = (request,response) => {
    let {title, album, preview_link, artwork, artist_id} = request.body;
    db.artists.getAddArtistNewSong(title, album, preview_link, artwork, artist_id,(err,res)=>{
                if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.send(`Song ${title} was added to the db successfully!`)
        }
    })
}


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    artistSongs,
    individualArtist,
    newArtist,
    createArtist,
    allArtists,
    editArtist,
    updateArtist,
    deleteArtist,
    artistDeleted,
    artistNewSong,
    addArtistNewSong
    //if both key and values are the same you can just do this.
  };

}

