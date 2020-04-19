const db = require('../util/database.js');
const getDateUtil = require('../util/get-date.js');

module.exports.getPlaylistById = async (req, res) => {

    const { id } = req.params;
    const queryT = `SELECT * FROM playlists WHERE id=${id}`
    const { rows } = await db.query(queryT);

    const queryT2 = `SELECT * from playlists_songs INNER JOIN songs ON playlists_songs.song_id = songs.id WHERE playlist_id=${id}`

    const resultTwo = await db.query(queryT2);

    try {
        res.render('./playlists/playlist-single', { 'singlePlaylist': resultTwo.rows });
    } catch (e) {
        res.status(404).render('404');
        console.log(e);
    }

}

module.exports.getAllPlaylists = async (req, res) => {

    const { rows } = await db.query('SELECT * FROM playlists');

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

    res.render('./playlists/add-playlist', { artists: resultArtists.rows, songs: resultSongs.rows });
}

module.exports.postAddPlaylist = async (req, res) => {

    if (!Array.isArray(req.body.artist))
        req.body.artist = req.body.artist.split();

    if (!Array.isArray(req.body.song))
        req.body.song = req.body.song.split();

    let i = 0;
    const playlistArr = req.body.artist.reduce((arr, el) => {
        const obj = { 'artist': el, 'song': req.body.song[i] };
        i++;
        return arr.push(obj), arr;
    }, [])

    const queryT1 = `INSERT into playlists(created_on, name) VALUES ($1, $2) RETURNING *`
    const queryV1 = [getDateUtil.getTimeStamp(), req.body['playlist_name']];

    const resultOne = await db.query(queryT1, queryV1);

    playlistArr.forEach(async playlistSong => {

        const queryT2 = `SELECT id, artist_id FROM songs WHERE title='${playlistSong.song}'`;
        const { rows } = await db.query(queryT2);

        const queryT3 = `INSERT into playlists_songs(song_id, playlist_id) VALUES ('${rows[0].id}', '${resultOne.rows[0].id}') RETURNING *`
        const resultThree = await db.query(queryT3);

    })

    res.redirect(`./playlists/${resultOne.rows[0].id}`);

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

    // console.log(resultTwo.rows);

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
    const playlistArr = req.body.artist.reduce((arr, el) => {
        const obj = { 'artist': el, 'song': req.body.song[i] };
        i++;
        return arr.push(obj), arr;
    }, [])

    const queryT2 = `DELETE FROM playlists_songs where playlist_id =${id}`

    const resultTwo = await db.query(queryT2);

    playlistArr.forEach(async playlistSong => {
        const queryT3 = `SELECT id, artist_id FROM songs WHERE title='${playlistSong.song}'`;
        const { rows } = await db.query(queryT3);

        console.log(rows);

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