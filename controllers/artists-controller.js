const db = require('../util/database.js');
const Artist = require('../models/artist.js');

module.exports.getArtistById = async (req, res) => {

    // const { id } = req.params;
    // const queryT = `SELECT * FROM artists WHERE id=${id}`
    // const { rows } = await db.query(queryT);
    const { id } = req.params;

    const rows = await Artist.get(id);

    res.render('./artists/artist-single', { 'singleArtist': rows[0] });

}

module.exports.getAllArtists = async (req, res) => {

    const { rows } = await db.query('SELECT * FROM artists');

    res.render('./artists/artist-all', { 'allArtists': rows });

}

module.exports.getAddArtist = async (req, res) => {
    res.render('./artists/add-artist');
}

module.exports.postAddArtist = async (req, res) => {

    const newArtist = new Artist(
        req.body.name,
        req.body.nationality,
        req.body['image link']);

    console.log(newArtist);

    const rows = await newArtist.save();

    res.redirect(`./artists/${rows[0].id}`);

}

module.exports.getEditArtistById = async (req, res) => {

    const { id } = req.params;

    const rows = await Artist.get(id);

    res.render('./artists/edit-artist', {
        'singleArtist': rows[0]
    });

}

module.exports.putArtistById = async (req, res) => {


    const { id } = req.params;

    await Artist.edit(
        req.body.name,
        req.body.nationality,
        req.body['image link'],
        id);

    res.redirect(`./${id}`);

}

module.exports.deleteArtistById = async (req, res) => {

    const { id } = req.params;

    await Artist.delete(id);

    res.render('./artists/artist-deleted');

}