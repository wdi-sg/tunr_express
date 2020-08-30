module.exports = (db) => {

  /**
   * ===========================================
   * Controller Logic
   * ===========================================
   */
let songs = (request,response)=>{
    db.songs.getSongs(request,(err,results)=>{
        if(err){
            console.log("err in songs",err.message)
        } else {
            response.render('./songs/songslist',results)
        }
    })
};

let newSong = (request,response)=>{
    db.songs.getNewSong(request,(err,results)=>{
        if(err){
            console.log("err in newSong",err.message)
        } else {
            response.render('./songs/newsong')
        }
    })
};

let postSong = (request,response)=>{
    db.songs.getPostSong(request,(err,results)=>{
        if(err){
            console.log("err in post song",err.message)
        } else {
            response.redirect('/songs')
        }
    })
};

let idSong = (request,response)=>{
    db.songs.getIdSong(request,(err,results)=>{
        if(err){
            console.log("err in id song",err.message)
        } else {
            response.render('./songs/songid',results.rows[0])
        }
    })
};

let editSong = (request,response)=>{
    db.songs.getEditSong(request,(err,results)=>{
        if(err){
            console.log("err",err.message)
        } else {
            response.render('./songs/songedit',results.rows[0])
        }
    })
};

let updateSong = (request,response)=>{
    let id = request.params.id;
    let {title,album,preview_link,artwork} = request.body;
    const data = [title, album, preview_link, artwork];
    db.songs.getUpdateSong(id,data,(err,results)=>{
        if(err){
            console.log("err in update song",err.message)
        } else {
            response.redirect(`/songs/${id}`)
        }
    })
};

let delSong = (request,response)=>{
    db.songs.getDelSong(request,(err,results)=>{
        if(err){
            console.log("err in del song",err.message)
        } else {
            response.redirect('/songs/')
        }
    })
};

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    songs: songs,
    newSong,
    postSong,
    idSong,
    editSong,
    updateSong,
    delSong  };
}