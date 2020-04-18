const db = require('../util/database.js');

module.exports.getArtistSongById = async (req, res) => {

    const { id } = req.params;
    const queryT = `SELECT * FROM songs WHERE artist_id=${req.artist.id}`
    const { rows } = await db.query(queryT);
    console.log(rows[id]);

    !rows ? res.render('404') : res.render('./songs/song-single.jsx', { 'singleSong': rows[id] });
}

module.exports.getAllSongsOfArtist = async (req, res) => {

    const queryT = `SELECT * FROM songs WHERE artist_id = ${req.artist.id}`
    const { rows } = await db.query(queryT);

    !rows[0] ? res.render('404') : res.render('./songs/song-all.jsx', {
        'allSongs': rows,
        'artist': req.artist
    });
}

module.exports.postAddSongToArtist = async (req, res) => {
    console.log('Add New Artist!');
    res.send('Add New Artist!');
}

module.exports.getEditArtistSongById = async (req, res) => {
    console.log('Get Edit Artist Form By Id!');
    res.send('Get Edit Artist Form By Id!');
}

module.exports.putArtistSongById = async (req, res) => {
    console.log('Artist Edited!');
    res.send('Artist Edited!');
}

module.exports.deleteArtistSongById = async (req, res) => {
    console.log('Delete Artist Form By Id!');
    res.send('Delete Artist Form By Id!');
}