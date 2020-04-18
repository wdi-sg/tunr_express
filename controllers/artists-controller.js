const db = require('../util/database.js');

module.exports.getArtistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `SELECT * FROM artists WHERE id=${id}`
    const { rows } = await db.query(queryT);

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

    const queryT = `INSERT INTO artists(name, nationality, photo_url) VALUES($1, $2, $3) RETURNING *`;
    const queryV = [req.body.name, req.body.nationality, req.body['image link']];
    const { rows } = await db.query(queryT, queryV);

    res.redirect(`./artists/${rows[0].id}`);

}

module.exports.getEditArtistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `SELECT * FROM artists WHERE id=${id}`
    const { rows } = await db.query(queryT);

    res.render('./artists/edit-artist', {
        'singleArtist': rows[0]
    });

}

module.exports.putArtistById = async (req, res) => {


    const { id } = req.params;
    const queryT = `UPDATE artists SET name = '${req.body.name}', nationality = '${req.body.nationality}', photo_url = '${req.body['image link']}' WHERE id=${id}`
    const { rows } = await db.query(queryT);

    res.redirect(`./${id}`);

}

module.exports.deleteArtistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `DELETE from artists WHERE id=${id}`
    const { rows } = await db.query(queryT);
    res.render('./artists/artist-deleted');

}