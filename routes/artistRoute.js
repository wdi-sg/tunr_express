const router = require('express').Router()
const {
        listArtists,
        showCreateArtist,
        addNewArtist,
        showArtist,
        editArtist,
        updateArtist,
        removeArtist
      } = require('../controllers/artist.controller')

router.get('/artists', listArtists)

router.get('/artists/new', showCreateArtist)

router.post('/artists', addNewArtist)

router.get('/artists:id', showArtist)

router.get('/artists/:id/edit', editArtist)

router.put('/artists:id', updateArtist)

router.delete('/artists:id', removeArtist)

module.exports = router