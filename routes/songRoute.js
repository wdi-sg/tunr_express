const router = require('express').Router()
const {
              listSongs,
              showCreateSong,
              addNewSong,
              showSong,
              editSong,
              updateSong,
              removeSong
      } = require('../controllers/song.controller')

router.get('/songs', listSongs)

router.get('/songs/new', showCreateSong)

router.post('/songs', addNewSong)

router.get('/songs/:id', showSong)

router.get('/songs/:id/edit', editSong)

router.put('/songs/:id', updateSong)

router.delete('/songs/:id', removeSong)

module.exports = router