module.exports = (db) => {

    let allSongs = (req,res) => {
        db.songs.allSongs_cb((err,result) => {
            if (err) {
                console.log('error in songs_controller allSongs', err.message);
            }
            else {
                res.send(result.rows);
            }
        })
    }

    let newSong = (req,res) => {
        res.render('new');
    }

    let createNewSong = (req,res) => {

        let title = req.body.title;
        let album = req.body.album;
        let preview_link = req.body.preview_link;
        let artwork = req.body.artwork;
        let artistName = req.body.artistName;

        db.songs.createNewSong_cb(title, album, preview_link, artwork, artistName, (err,result) => {
            if (err) {
                console.log('error in songs_controller createNewSong', err.message);
            }
            else {
                res.send(req.body);
            }
        })
    }

    let getSong = (req,res) => {

        let id = req.params.id;

        db.songs.getSong_cb(id, (err,result) => {
            if (err) {
                console.log('error in songs_controller getSong', err.message);
            }
            else {
                res.render('song', result.rows);
            }
        })
    }

    let deleteSong = (req,res) => {

        let id = req.params.id;

        db.songs.deleteSong_cb(id, (err,result) => {
            if (err) {
                console.log('error in songs_controller deleteSong', err.message);
            }
            else {
                res.send('Song Deleted');
            }
        })
    }

    let editSong = (req,res) => {

        let id = req.params.id;

        db.songs.editSong_cb(id, (err,result) => {
            if (err) {
                console.log('error in songs_controller editSong', err.message);
            }
            else {
                res.render('edit_song', result.rows);
            }
        })
    }

    let editedSong = (req,res) => {

        let title = req.body.title;
        let album = req.body.album;
        let preview_link = req.body.preview_link;
        let artwork = req.body.artwork;
        let id = req.params.id; 
        
        db.songs.editedSong_cb(title, album, preview_link, artwork, id, (err,result) => {
            if (err) {
                console.log('error in songs_controller editedSong', err.message);
            }
            else {
                res.send(req.body);
            }
        })
    }

    return {
        allSongs,
        newSong,
        createNewSong,
        getSong,
        deleteSong,
        editSong,
        editedSong
    }
}


