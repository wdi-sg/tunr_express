const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const db = require('../util/database.js');

const artistsController = require('../controllers/artists-controller');
const songsController = require('../controllers/songs-controller');
const songsRoutes = require('./songs-routes.js');

router.use('/', express.static(path.join(__dirname, '..', '/public/')));
router.use('/:id', express.static(path.join(__dirname, '..', '/public/')));


//Middleware to store artist properties in request before moving on to songsRoutes. Necessary for queries made in songs-controller as artist id in url will not be exposed there.

router.use('/:id/songs', async (req, res, next) => {

    const { id } = req.params;
    const queryT = `SELECT * FROM artists WHERE id=${id}`
    const { rows } = await db.query(queryT);

    req.artist = rows[0]
    next();
})

router.use('/:id/songs', songsRoutes);

router.use('/songs/add', () => {

})

router.get('/:id/edit', artistsController.getEditArtistById);

router.get('/:id/delete', artistsController.deleteArtistById);

router.get('/new', artistsController.getAddArtist);

router.get('/:id', artistsController.getArtistById);

router.put('/:id', artistsController.putArtistById)

router.post('/', artistsController.postAddArtist);

router.get('/', artistsController.getAllArtists);

module.exports = router;