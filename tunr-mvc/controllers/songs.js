module.exports = (db) => {

  /**
   * ===========================================
   * Controller Logic
   * ===========================================
   */

  const songsList = (request, response) => {
      db.songs.getSongsList((err, res) => {
        if(err){response.send("unable to save your data!")} else {
        response.render('songs/songshome', { songs: res.rows });
    }
      });
  };

  const newSong = (request,response) => {
    db.songs.getNewSong((err,res)=>{
        if(err){response.send("unable to save your data!")}
        else {response.render('songs/songsnew')
    }
    })
  }


  const createSong = (request,response) => {
    let {title, album, preview_link, artwork, artist_id} = request.body;
    db.songs.getCreateSong(title, album, preview_link, artwork,artist_id,(err,res)=>{
        if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.send(`Song ${title} was added to the db successfully!`)
        }
    })
  }

const individualSong = (request,response) => {
    let {id} = request.params;
    db.songs.getIndividualSong(id,(err,res)=>{
                if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('songs/onesong', res.rows[0])
        }
    })
}

const editSong = (request,response) => {
    let {id} = request.params
    db.songs.getEditSong(id,(err,res)=>{
                if(err){
                    console.log(err)
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('songs/editsong', res.rows[0])
        }
    })
}

  const updateSong = (request,response) => {
    let {id} = request.params;
    let {title, album, preview_link, artwork} = request.body;
    db.songs.getUpdateSong(id,title, album, preview_link, artwork,(err,res)=>{
        if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.send(`Song data successfully updated!`)
        }
    })
  }


const deleteSong = (request,response) => {
    let {id} = request.params;
    db.songs.getDeleteSong(id,(err,res)=>{
        if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('songs/deletesong', res.rows[0])
        }
    })
  }

 const songDeleted = (request,response) => {
    let {id} = request.params;
    let {title} = request.body;
    db.songs.getSongDeleted(id,title,(err,res)=>{
                if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.send(`Song ${title}'s data successfully deleted from database!`)
        }
    })
}


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    songsList,
    newSong,
    createSong,
    individualSong,
    editSong,
    updateSong,
    deleteSong,
    songDeleted
    //if both key and values are the same you can just do this.
  };
}

