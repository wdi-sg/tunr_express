const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');

const artistsController = require('../controllers/artists-controller');
const songsRoutes = require('./songs-routes.js');

router.use('/', express.static(path.join(__dirname, '..', '/public/')));
router.use('/:id', express.static(path.join(__dirname, '..', '/public/')));

router.use('/:id/songs', songsRoutes);

router.get('/:id/edit', artistsController.getEditArtistById);

router.delete('/:id/delete', artistsController.deleteArtistById);

router.get('/:id', artistsController.getArtistById);

router.put('/:id', artistsController.putArtistById)

router.post('/', artistsController.postAddArtist);

router.get('/', artistsController.getAllArtists);

module.exports = router;