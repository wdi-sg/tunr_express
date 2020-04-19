const db = require('../util/database.js');

module.exports.getPlaylistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `SELECT * FROM playlists WHERE id=${id}`
    const { rows } = await db.query(queryT);

    try {
        res.render('./playlists/playlist-single', { 'singlePlaylist': rows[0] });
    } catch (e) {
        res.status(404).render('404');
        console.log(e);
    }

    console.log('Get Playlist By Id');

}

module.exports.getAllPlaylists = async (req, res) => {

    const { rows } = await db.query('SELECT * FROM playlists');

    try {
        res.render('./playlists/playlist-all', { 'allPlaylists': rows });
    } catch (e) {
        res.status(404).render('404');
        console.log(e);
    }

    console.log('Get All Playlists');
}

module.exports.getAddPlaylist = async (req, res) => {

    const queryT = `SELECT name, id from artists`;
    const queryT2 = `SELECT title, artist_id from songs`;
    const resultArtists = await db.query(queryT);
    const resultSongs = await db.query(queryT2);

    console.log(resultSongs.rows);

    res.render('./playlists/add-playlist', { artists: resultArtists.rows, songs: resultSongs.rows });
}

module.exports.postAddPlaylist = async (req, res) => {

    // const queryT = `INSERT INTO playlists() VALUES() RETURNING *`;
    // const queryV = [];
    // const { rows } = await db.query(queryT, queryV);

    // res.redirect(`./playlists/${rows[0].id}`);
    console.log('Post Add Playlist');

}

module.exports.getEditPlaylistById = async (req, res) => {

    // const { id } = req.params;
    // const queryT = `SELECT * FROM playlists WHERE id=${id}`
    // const { rows } = await db.query(queryT);

    // res.render('./playlists/edit-playlist', {
    //     'singlePlaylist': rows[0]
    // });

    console.log('Get Edit Playlist Form By Id');

}

module.exports.putPlaylistById = async (req, res) => {


    // const { id } = req.params;
    // const queryT = `UPDATE playlists SET name = '' WHERE id=${id}`
    // const { rows } = await db.query(queryT);

    // res.redirect(`./${id}`);

    console.log('Put Playlist By Id');

}

module.exports.deletePlaylistById = async (req, res) => {

    // const { id } = req.params;
    // const queryT = `DELETE from playlists WHERE id=${id}`
    // const { rows } = await db.query(queryT);
    // res.render('./playlists/playlist-deleted');

    console.log('Delete Playlist By Id');

}