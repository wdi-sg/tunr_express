const Router = require('express-promise-router');
const db = require('../util/database.js');

const express = require('express');
const path = require('path');

const router = new Router();

const songsController = require('../controllers/songs-controller');

router.use('/', express.static(path.join(__dirname, '..', '/public/')));
router.use('/:id', express.static(path.join(__dirname, '..', '/public/')));

router.get('/:id/edit', songsController.getEditArtistSongById);

router.delete('/:id/delete', songsController.deleteArtistSongById);

router.get('/:id', songsController.getArtistSongById);

router.put('/:id', songsController.putArtistSongById)

router.post('/', songsController.postAddSongToArtist);

router.get('/', songsController.getAllSongsOfArtist);

module.exports = router;