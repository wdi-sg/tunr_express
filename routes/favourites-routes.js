const Router = require('express-promise-router');
const db = require('../util/database.js');

const express = require('express');
const path = require('path');

const router = new Router();

const favouritesController = require('../controllers/favourites-controller.js');
const errorController = require('../controllers/404-controller.js');

router.use('/', express.static(path.join(__dirname, '..', '/public/')));
router.use('/:id', express.static(path.join(__dirname, '..', '/public/')));

router.post('/new', favouritesController.postFavourites);

router.delete('/delete', favouritesController.deleteFavourites);

router.get('/', favouritesController.getAllFavourites);

router.use(errorController.get404Page);

module.exports = router;