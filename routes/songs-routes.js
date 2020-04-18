const Router = require('express-promise-router');
const db = require('../util/database.js');

const express = require('express');
const path = require('path');

const router = new Router();

const songsController = require('../controllers/songs-controller');

router.use('/', express.static(path.join(__dirname, '..', '/public/')));
router.use('/:id', express.static(path.join(__dirname, '..', '/public/')));

router.use('/:id', async (req, res, next) => {
    const { id } = req.params;
    const queryT = `SELECT * FROM songs WHERE artist_id=${req.artist.id} ORDER BY id`
    const { rows } = await db.query(queryT);
    req.song = rows[id];
    req.song.position = id;
    next();
})

router.get('/:id/edit', songsController.getEditArtistSongById);

router.get('/:id/delete', songsController.deleteArtistSongById);

router.get('/add', songsController.getAddSongToArtist);

router.get('/:id', songsController.getArtistSongById);

router.put('/:id', songsController.putArtistSongById)

router.post('/', songsController.postAddSongToArtist);

router.get('/', songsController.getAllSongsOfArtist);

module.exports = router;