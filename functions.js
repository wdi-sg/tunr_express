module.exports = {
showArtist:  (text, response ) => {
  pool.query(text,(err, res) => {
    let artists = {};
    artists.list=[];
    for(let i = 0; i < res.rows.length; i++){
            artists.list.push(res.rows[i]);
        }
    response.render('artists', artists);
  });
}

// const showSong =  ( text, response ) => {
//   pool.query(text,(err, res) => {
//     let songs = {};
//     songs.list=[];
//     for(let i = 0; i < res.rows.length; i++){
//             songs.list.push(res.rows[i]);
//         }
//     response.render('songs', songs);
//   });
// }

// const editArtist =  ( text, response ) => {
//   pool.query(text,(err, res) => {
//     response.render('editArtist', res.rows);
//   });
// }

// const editSong =  ( text, response ) => {
//   pool.query(text,(err, res) => {
//     response.render('editSong', res.rows);
//   });
// }

// const createSongSpecific =  ( text, response ) => {
//   pool.query(text,(err, res) => {
//     response.render('createSongSpecific', res.rows);
//   });
// }

// const doubleQuerySong = ( text, followUpText, response ) => {
//   pool.query(text,(err, res) => {
//     pool.query(followUpText,(err, res) => {
//       let songs = {};
//       songs.list=[];
//       for(let i = 0; i < res.rows.length; i++){
//               songs.list.push(res.rows[i]);
//           }
//       response.render('songs', songs);
//     });
//   });
// }

// const showPlaylist =(text, response) => {
//   pool.query(text,(err, res) => {
//     pool.query(followUpText,(err, res) => {
//     let songs = {};
//       songs.list=[];
//       for(let i = 0; i < res.rows.length; i++){
//               songs.list.push(res.rows[i]);
//           }
//       response.render('playlists', songs);
//     });
//   });
// }
}