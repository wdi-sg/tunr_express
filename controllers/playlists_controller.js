const e = require("express");

module.exports = (db) => {

    let allPlaylists = (req,res) => {

        db.playlists.allPlaylists_cb((err, result) => {
            if (err) {
                console.log('error at playlists_controller, allPlaylists ---', err.message);
            }
            else {
                res.send(result.rows);
            }
        })
    }

    let newPlaylist = (req,res) => {
        res.render('new');
    }

    let createNewPlaylist = (req,res) => {

        let name = req.body.name;

        db.playlists.createNewPlaylist_cb(name, (err, result) => {
            if (err) {
                console.log('error at playlists_controller, createNewPlaylist ---', err.message);
            }
            else {
                res.send('Playlist Added');
            }
        })
    }

    let getPlaylist = (req, res) => {

        let id = req.params.id;

        db.playlists.getPlaylist_cb(id, (err, result) => {
            if (err) {
                console.log('error at playlists_controller. getPlaylist ---', err.message);
            }
            else {
                res.render('playlist', result.rows);
            }
        })
    }

    let editPlaylist = (req, res) => {

        let id =req.params.id;

        db.playlists.editPlaylist_cb(id, (err, result) => {
            if (err) {
                console.log('error at playlists_controller, editPlaylist ---', err.message);
            }
            else {
                res.render('edit_playlist', result.rows);
            }
        })
    }

    let editedPlaylist = (req, res) => {

        let name = req.body.name;
        let id =req.params.id;

        db.playlists.editedPlaylist_cb(name, id, (err, result) => {
            if (err) {
                console.log('error at playlists_controller, editedPlaylist ---', err.message);
            }
            else {
                res.redirect(`/playlists/${id}`);
            }
        })
    }

    let deletePlaylist = (req, res) => {

        let id = req.params.id;

        db.playlists.deletePlaylist_cb(id, (err, result) => {
            if (err) {
                console.log('error at playlists_controller, deletePlaylist ---', err.message);
            }
            else {
                res.redirect('/playlists');
            }
        })
    }

    let addSongToPlaylist = (req, res) => {

        let name = req.body.name;
        let id = req.params.id;

        db.playlists.addSongToPlaylist_cb = (name, id, (err, result) => {
            if (err) { 
                console.log('error at playlists_controller, addSongToPlaylist ---', err.message);
            }
            else {
                res.send('Song Added');
            }
        })
    }



    return {
        allPlaylists,
        newPlaylist,
        createNewPlaylist,
        getPlaylist,
        editPlaylist,
        editedPlaylist,
        deletePlaylist,
        addSongToPlaylist
    }
}