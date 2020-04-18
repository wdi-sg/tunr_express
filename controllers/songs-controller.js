const db = require('../util/database.js');

module.exports.getArtistSongById = async (req, res) => {

    res.render('./songs/song-single.jsx', { 'singleSong': req.song });

}

module.exports.getAllSongsOfArtist = async (req, res) => {

    try {
        const queryT = `SELECT * FROM songs WHERE artist_id = ${req.artist.id}`
        const { rows } = await db.query(queryT);

        res.render('./songs/song-all.jsx', {
            'allSongs': rows,
            'artist': req.artist
        });

    } catch (e) {
        res.status(404).render('404');
        console.log(e);
    }
}

module.exports.getAddSongToArtist = async (req, res) => {

    res.render('./songs/add-song.jsx', { 'artist': req.artist });
}

module.exports.postAddSongToArtist = async (req, res) => {

    const queryT = `INSERT INTO songs(title, album, preview_link, artwork, artist_id) RETURNING *`;
    const queryV = `VALUES(${req.body.title}, ${req.body.album}, ${req.body["preview_link"]}, ${req.body.artwork}, ${req.artist.id})`

    res.redirect('./songs');

}

module.exports.getEditArtistSongById = async (req, res) => {

    !req.song.title ? res.render('404') : res.render('./songs/edit-song.jsx', {
        'singleSong': req.song,
        'artist': req.artist
    });

}

module.exports.putArtistSongById = async (req, res) => {

    const queryT = `UPDATE songs SET title = '${req.body.title}', album = '${req.body.album}', preview_link = '${req.body['preview link']}', artwork = '${req.body.artwork}', artist_id = '${req.artist.id}' WHERE id=${req.song.id}`

    const { rows } = await db.query(queryT);
    res.redirect(`./${req.song.position}`);

}

module.exports.deleteArtistSongById = async (req, res) => {

    const queryT = `DELETE from songs WHERE id=${req.song.id}`
    const { rows } = await db.query(queryT);
    res.render('./songs/song-deleted');

}