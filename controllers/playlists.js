module.exports = (db) => {

    let newPlaylistForm = (req, res) => res.render('playlists/new');

    let addNewPlaylist = (req, res) => {
        let values = [req.body.id, req.body.name];
        console.log(values)
        db.playlists.postNewPlaylist(values, (err,result) => res.send("Successfully created playlist!"))
    }

    let showPlaylist = (req, res) => {
        db.playlists.getAll(req.params.id, (err, result) => res.send(result.rows))
    }

    return {
        newPlaylistForm,
        addNewPlaylist,
        showPlaylist
    }
}