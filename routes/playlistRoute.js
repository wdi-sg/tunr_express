const router = require('express').Router()
const {
        listPlaylists,
        showCreatePlaylist,
        addNewPlaylist,
        showPlaylist,
        editPlaylist,
        updatePlaylist,
        removePlaylist,
        addSongToPlaylist
      } = require('../controllers/playlist.controller')


router.get('/playlists', listPlaylists)

router.get('/playlists/new', showCreatePlaylist)

router.post('/playlists', addNewPlaylist)

router.get('/playlists/:id', showPlaylist)

router.post('/playlists/:id', addSongToPlaylist)

router.get('/playlists/:id/edit', editPlaylist)

router.put('/playlists/:id', updatePlaylist)

router.delete('/playlists/:id', removePlaylist)

module.exports = router