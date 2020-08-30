module.exports = (db) => {

    console.log("song controllers activated");

    let allSongs = (req, res) => db.songs.getAll((err, result) => res.send(result.rows))

    let newSongForm = (req, res) => res.render('songs/new')

    let addNewSong = (req, res) => {
        let values = [req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];
        db.songs.postNewSong(values, (err, result) => res.send("Song added successfully!"))
    }

    let viewSong = (req, res) => {
        db.songs.getSong(req.params.id, (err, result) => {
            if (result.rowCount > 0){
                res.send(result.rows[0])
            } else {
                res.send("Sorry, song not found.")
            }
        })
    }

    let editSongInfo = (req, res) => {
        db.songs.editInfo(req.params.id, (err, result) => res.render('songs/edit', result.rows[0]));
    }

    let updateSongInfo = (req, res) => {
        let values = [req.params.id, req.body.title, req.body.album, req.body.preview_link, req.body.artwork, req.body.artist_id];
        db.songs.updateInfo(values, (err, result) => res.send("Successfully updated song entry"));
    }

    let deleteSongForm = (req, res) => res.render('songs/delete')

    let deleteSong = (req, res) => {
        db.songs.removeEntry(req.body.id, (err, result) => res.send("Song entry deleted."))
    }

    return {
        allSongs,
        newSongForm,
        addNewSong,
        viewSong,
        editSongInfo,
        updateSongInfo,
        deleteSongForm,
        deleteSong
    };
};