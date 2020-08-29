module.exports = (db) => {


  const newPlaylist = (request,response) => {
    db.playlist.getNewPlaylist((err,res)=>{
        if(err){response.send("unable to save your data!")}
        else {response.render('playlist/new')
    }
    })
  }

  const createPlaylist = (request,response) => {
    let {name} = request.body;
    db.playlist.getCreatePlaylist(name,(err,res)=>{
        if(err){
            console.log(err)
            response.status(500).send("Oops we cannot add the playlist")
        } else {
            response.send(`Playlist ${name} was added to the db successfully!`)
        }
    })
  }


const individualPlaylist = (request,response) => {
    let {id} = request.params;
    db.playlist.getIndividualPlaylist(id,(err,res)=>{
                if(err){
            response.status(500).send("Oops we did not find the student you were looking for")
        } else {
            response.render('playlist/oneplaylist',{playlist:res.rows})
        }
    })
}


//   const songsList = (request, response) => {
//       db.songs.getSongsList((err, res) => {
//         if(err){response.send("unable to save your data!")} else {
//         response.render('songs/songshome', { songs: res.rows });
//     }
//       });
//   };


// const editSong = (request,response) => {
//     let {id} = request.params
//     db.songs.getEditSong(id,(err,res)=>{
//                 if(err){
//                     console.log(err)
//             response.status(500).send("Oops we did not find the student you were looking for")
//         } else {
//             response.render('songs/editsong', res.rows[0])
//         }
//     })
// }

//   const updateSong = (request,response) => {
//     let {id} = request.params;
//     let {title, album, preview_link, artwork} = request.body;
//     db.songs.getUpdateSong(id,title, album, preview_link, artwork,(err,res)=>{
//         if(err){
//             response.status(500).send("Oops we did not find the student you were looking for")
//         } else {
//             response.send(`Song data successfully updated!`)
//         }
//     })
//   }



  return {
  newPlaylist,
  createPlaylist,
  individualPlaylist
  };
}

