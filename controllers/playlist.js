module.exports = (db) => {

  /**
   * ===========================================
   * Controller Logic
   * ===========================================
   */

  let listPlayList = (request, response) => {
        db.playlist.getPlayList((err,results)=>{
            if(err){
                console.log("err---listplaylist error controller", err.message)
            } else {
                response.render('./playlist/home')
            }
        })
  };

let newPlayList = (request,response)=>{
        response.render('./playlist/new')
}

let createPlayList = (request,response)=>{
        let name = request.body.name;
        db.playlist.getCreatePlayList(name,(err,results)=>{
        if(err){
            console.log("err ---  createPlayList in controllers")
        }else {response.render("./playlist/id")}
    })
}

let addSongToPlayList = (request,response)=>{
        db.playlist.getAddSongToPlayList((err,results)=>{
        if(err){
            console.log("err ---  addSongToPlayList in controllers",err.message)
        }else {response.render("./playlist/addsong"),request.params.id}
    })
}

let addedSongToPlayList = (request,response)=>{
        let playListId = request.body.id;
        let songName = request.body.name
    db.playlist.getAddedSongToPlayList(playListId,songName,(err,results)=>{
        if(err){
            console.log("err ---addedSongToPlayList in controller",err.message)
        } else {
            response.redirect(`/playlists/${playListId}`)
        }
    })
};

let listPlayListSongs = (request,response)=>{
        const values = [request.params.id]
        db.playlist.getListPlayListSongs(values,(err,results)=>{
        if(err){
            console.log("err---- idartist in controllers",err.message)
        }else {response.render("./playlist/id",results.rows[0])}
    })
}



  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    listPlayList:listPlayList,
    newPlayList,
    createPlayList,
    addSongToPlayList,
    listPlayListSongs,
    addedSongToPlayList,
    };
}

