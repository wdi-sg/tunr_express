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

    console.log('Get All Playlists');
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

        console.log(resultOne.rows);
        console.log(rows);

        const queryT3 = `INSERT into playlists_songs(song_id, playlist_id) VALUES ('${rows[0].id}', '${resultOne.rows[0].id}') RETURNING *`

        const resultThree = await db.query(queryT3);

    })

    // res.redirect(`./playlists/${rows[0].id}`);
    console.log(playlistArr);

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

    const { id } = req.params;
    const queryT = `DELETE from playlists WHERE id=${id}`
    const { rows } = await db.query(queryT);
    res.render('./playlists/playlist-deleted');

    console.log('Delete Playlist By Id');

}