// takes in allModels as parameter from routes.js < index.js (require db.js)
// export to routes.js
module.exports = (db) => {

    let allSongs = (req, res) => {
        db.song.getAllSong((err, result) => {
            if (err) {
                console.log("-- Error in allSong controller", err.message);
            } else {
                res.render('./songs/songs', result);
            }
        })
    }

    let newSongForm = (req, res) => {
        res.render('./artists/new');
    }

    let newSong = (req, res) => {
        let songInfo = req.body;
        let values = [songInfo.title, songInfo.album, songInfo.preview_link, songInfo.artwork, songInfo.artist_id];

        db.song.createNewSong(values, (err,result) => {
            if (err) {
                console.log("-- Error in createNewSong controller", err.message);
            } else {
                if (result === true) {
                    res.redirect('/songs');
                }
            }
        })
    }

    let showSingleSong = (req, res) => {
        let id = req.params.id;

        db.song.selectSingleSong(id, (err, result) => {
            if (err) {
                console.log("-- Error in showSingleSong controller", err.message);
            } else {
                res.render('./songs/single_song', result)
            }
        })
    }

    let getEditSongForm = (req, res) => {
        let id = req.params.id;

        db.song.selectSingleSong(id, (err, result) => {
            if (err) {
                console.log("-- Error in getEditSongForm controller", err.message);
            } else {
                res.render('./songs/update_song', result)
            }
        })
    }

    let updateEditSong = (req, res) => {
        let id = req.params.id;
        let newData = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];

        db.song.updateSong(id, newData, (err, result) => {
            if (err) {
                console.log("-- Error in updateEditSong controller", err.message)
            } else {
                if (result === true) {
                    res.redirect('/songs/');
                }
            }
        })
    }

    let deleteSong = (req, res) => {
        let id = req.params.id;

        db.song.removeSong(id, (err, result) => {
            if (err) {
                console.log("-- Error in deleteSong controller", err.message)
            } else {
                if (result === true) {
                    res.redirect('/songs/');
                }
            }
        })
    }

    return {
        allSongs,
        newSongForm,
        newSong,
        showSingleSong,
        getEditSongForm,
        updateEditSong,
        deleteSong
    }
};