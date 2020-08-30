module.exports = (db) => {

  /**
   * ===========================================
   * Controller Logic
   * ===========================================
   */

  let indexControllerCallback = (request, response) => {
       response.render('home')
  };

  let artists = (request,response)=>{
      db.artists.getArtists((err,results)=>{
        if(err){
            console.log("err --- artists in controllers", err.message)
        } else {
            response.render('./artist/artist',results)
        }
      });
  }

let newArtist = (request,response)=>{
        db.artists.getNewArtist((err,results)=>{
        if(err){
            console.log("err ---  newArtist in controllers")
        }else {response.render("./artist/new")}
    })
}

let postArtist = (request,response)=>{
        db.artists.getPostArtist((err,results)=>{
        if(err){
            console.log("err ---  postArtist in controllers",err.message)
        }else {response.send(request.body)}
    })
}

let idArtist = (request,response)=>{
        const values = [request.params.id]
        db.artists.getIdArtist(values,(err,results)=>{
        if(err){
            console.log("err---- idartist in controllers",err.message)
        }else {response.render("./artist/id",results.rows[0])}
    })
}

let editArtist = (request,response)=>{
    db.artists.getEditArtist(request,(err,results)=>{
        if(err){
            console.log("err ---in edit artist",err.message)
        } else {
            response.render('./artist/update', results.rows[0])
        }
    })
};
let updateArtist = (request,response)=>{
    db.artists.getUpdateArtist(request,(err,resulst)=>{
        if(err){
            console.log("err---in update artist",err.message)
        } else {
            response.redirect(`/artists/${request.params.id}`)
        }
    })
};

let delArtist = (request,response)=>{
    db.artists.getDelArtist(request,(err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.redirect('/artists/')
        }
    })
};

let allSongsArtist = (request,response)=>{
    db.artists.getAllSongsArtist(request,(err,results)=>{
        if(err){
            console.log("err in all songs artist",err.message)
        } else {
            response.render('./songs/songs',results)
        }
    })
};

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: indexControllerCallback,
    artists,
    newArtist,
    postArtist,
    idArtist,
    editArtist,
    updateArtist,
    delArtist,
    allSongsArtist
    };
}