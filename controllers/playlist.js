module.exports = (db) => {

    let allPlaylist = (req, res) => {
        db.playlist.getAllPlaylist((err, result) => {
            if (err) {
                console.log("-- Error in allPlaylist controller", err.message);
            } else {
                res.render('./playlists/playlists', result);
            }
        })
    }

    let newPlaylistForm = (req, res) => {
        res.render('./playlists/new_playlist')
    }

    let newPlaylist = (req, res) => {
        let newData = [req.body.name];
        db.playlist.createNewPlaylist(newData, (err, result) => {
            if (err) {
                console.log("-- Error in newPlaylist controller", err.message)
            } else {
                if (result === true) {
                    res.redirect('/playlist/')
                }
            }
        })
    }

    let showPlaylistSong = (req, res) => {
        let id = req.params.id;
        
        db.playlist.showSongInPlaylist(id, (err, result) => {
            if (err) {
                console.log("-- Error in showPlaylistSong controller", err.message)
            } else {
                if (result < 1) {
                    res.send("There is no song in the playlist")
                } else {
                    res.render('./playlists/playlist_songs', result)
                }
            }
        })
    }

    let newEditPlaylistForm = (req, res) => {
        let id = req.params.id;
        let obj = {"id": id};
        res.render('./playlists/new_song_to_playlist', obj)
    }

    let addSongToPlaylist = (req, res) => {
        let playlistId = req.params.id;
        let values = [req.body.title, playlistId];
        db.playlist.addPlaylistSong(values, (err, result) => {
            if (err) {
                console.log("-- Error in addSongToPlaylist controller", err.message)
            } else {
                if (result === true) {
                    res.redirect(`/playlist/${playlistId}`)
                }
            }
        })
    }

    return {
        allPlaylist,
        newPlaylistForm,
        newPlaylist,
        showPlaylistSong,
        newEditPlaylistForm,
        addSongToPlaylist
    }
};