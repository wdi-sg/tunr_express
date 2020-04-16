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

module.exports.postAddArtist = async (req, res) => {

    console.log(req);
    res.send('Add New Artist!');

}

module.exports.getEditArtistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `SELECT * FROM artists WHERE id=${id}`
    const { rows } = await db.query(queryT);

    res.render('./artists/edit-artist', {
        'singleArtist': rows[0],
        invalidMsg: ""
    });

}

module.exports.putArtistById = async (req, res) => {

    let invalidMsg = [];

    //Check if fields are empty
    Object.keys(req.body).forEach(k => {
        if (!k) invalidMsg.push[`Please enter the artist's ${k}'`]
    })

    res.send('Artist Edited!');
}

module.exports.deleteArtistById = async (req, res) => {
    console.log('Delete Artist Form By Id!');
    res.send('Delete Artist Form By Id!');
}