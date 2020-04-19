const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const db = require('../util/database.js');

const playlistsController = require('../controllers/playlists-controller');
const errorController = require('../controllers/404-controller.js');

router.use('/', express.static(path.join(__dirname, '..', '/public/')));
router.use('/:id', express.static(path.join(__dirname, '..', '/public/')));

router.get('/:id/edit', playlistsController.getEditPlaylistById);

router.get('/:id/delete', playlistsController.deletePlaylistById);

router.get('/new', playlistsController.getAddPlaylist);

router.get('/:id', playlistsController.getPlaylistById);

router.put('/:id', playlistsController.putPlaylistById)

router.post('/', playlistsController.postAddPlaylist);

router.get('/', playlistsController.getAllPlaylists);

router.use(errorController.get404Page);

module.exports = router;