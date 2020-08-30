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
                console.log(results)
                response.render('./playlist/home',results)
            }
        })
  };

    let newPlayList = (request,response)=>{
        response.render('./playlist/new')
    }

    let createPlayList = (request,response)=>{
        let name = request.body.name;
        console.log(request.body);
        db.playlist.getCreatePlayList(name,(err,results)=>{
            if(err){
                console.log("err ---  createPlayList in controllers")
            }else {response.redirect("/playlist")}
        })
    }

    let addSongToPlayList = (request,response)=>{
        let id = request.params.id
        let obj = {"id":id}
        response.render("./playlist/addsong",obj)
        
    }

    let addedSongToPlayList = (request,response)=>{
            let playListId = request.body.playlist_id;
            let songName = request.body.name
            // console.log(request.body)
        db.playlist.getAddedSongToPlayList(playListId,songName,(err,results)=>{
            if(err){
                console.log("err ---addedSongToPlayList in controller",err.message)
            } else {
                response.redirect('/playlist/'+ playListId)
            }
        })
    };

    let listPlayListSongs = (request,response)=>{
            const values = request.params.id;
            db.playlist.getListPlayListSongs(values,(err,results)=>{
            if(err){
                console.log("err---- idartist in controllers",err.message)
            }else {response.render("./playlist/id",results)}
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

