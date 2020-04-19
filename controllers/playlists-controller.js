const db = require('../util/database.js');
const Playlist = require('../models/playlist.js');
const getDateUtil = require('../util/get-date.js');

module.exports.getPlaylistById = async (req, res) => {

    const { id } = req.params;

    const rows = await Playlist.get(id);

    try {

        res.render('./playlists/playlist-single', { 'singlePlaylist': rows });

    } catch (e) {

        res.status(404).render('404');
        console.log(e);

    }

}

module.exports.getAllPlaylists = async (req, res) => {

    const rows = await Playlist.getAll();

    try {

        res.render('./playlists/playlist-all', { 'allPlaylists': rows });

    } catch (e) {

        res.status(404).render('404');
        console.log(e);

    }

}

module.exports.getAddPlaylist = async (req, res) => {

    const queryT = `SELECT name, id from artists`;
    const queryT2 = `SELECT title, artist_id from songs`;
    const resultArtists = await db.query(queryT);
    const resultSongs = await db.query(queryT2);

    res.render('./playlists/add-playlist', {
        artists: resultArtists.rows,
        songs: resultSongs.rows
    });
}

module.exports.postAddPlaylist = async (req, res) => {

    const newPlaylist = new Playlist(req.body['playlist_name']);

    const rows = await newPlaylist.save(req.body);

    res.redirect(`./playlists/${rows[0].id}`);

}

module.exports.getEditPlaylistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `SELECT * FROM playlists WHERE id=${id}`
    const { rows } = await db.query(queryT);

    const queryT2 = `SELECT song_id, title, artist_id from playlists_songs INNER JOIN songs ON playlists_songs.song_id = songs.id WHERE playlist_id=${id} ORDER BY song_id`

    const resultTwo = await db.query(queryT2);

    const queryT3 = `SELECT name, id from artists`;
    const queryT4 = `SELECT title, artist_id from songs`;
    const resultArtists = await db.query(queryT3);
    const resultSongs = await db.query(queryT4);

    res.render('./playlists/edit-playlist', {
        'singlePlaylist': rows[0],
        'playlistSongs': resultTwo.rows,
        'artists': resultArtists.rows,
        'songs': resultSongs.rows
    })

}

module.exports.putPlaylistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `UPDATE playlists SET name = '${req.body.name}' WHERE id=${id}`
    const { rows } = await db.query(queryT);

    if (!Array.isArray(req.body.artist))
        req.body.artist = req.body.artist.split();

    if (!Array.isArray(req.body.song))
        req.body.song = req.body.song.split();

    let i = 0;
    const playlistArr = req.body.artist
        .reduce((arr, el) => {
            const obj = { 'artist': el, 'song': req.body.song[i] };
            i++;
            return arr.push(obj), arr;
        }, [])

    const queryT2 = `DELETE FROM playlists_songs where playlist_id =${id}`

    const resultTwo = await db.query(queryT2);

    playlistArr.forEach(async playlistSong => {
        const queryT3 = `SELECT id, artist_id FROM songs WHERE title='${playlistSong.song}'`;
        const { rows } = await db.query(queryT3);

        const queryT4 = `INSERT into playlists_songs(song_id, playlist_id) VALUES ('${rows[0].id}', '${id}') RETURNING *`

        const resultFour = await db.query(queryT4);

    })

    res.redirect(`./${id}`);

}

module.exports.deletePlaylistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `DELETE from playlists WHERE id=${id}`
    const { rows } = await db.query(queryT);
    res.render('./playlists/playlist-deleted');

    console.log('Delete Playlist By Id');

}