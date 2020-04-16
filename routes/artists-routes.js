const Router = require('express-promise-router');
const db = require('../util/database.js');

const router = new Router();

const artistsController = require('../controllers/artists-controller');

const songsRoutes = require('./songs-routes.js');

router.use('/:id/songs', songsRoutes);

router.get('/:id/edit', artistsController.getEditArtistById);

router.delete('/:id/delete', artistsController.deleteArtistById);

router.get('/:id', artistsController.getArtistById);

router.put('/:id', artistsController.putArtistById)

router.post('/', artistsController.postAddArtist);

router.get('/', artistsController.getAllArtists);

module.exports = router;