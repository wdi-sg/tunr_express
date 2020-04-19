const db = require('../util/database.js');
const Song = require('../models/song.js');

module.exports.getArtistSongById = async (req, res) => {

    res.render('./songs/song-single.jsx', { 'singleSong': req.song });

}

module.exports.getAllSongsOfArtist = async (req, res) => {

    try {

        const rows = await Song.getAll(req.artist.id);

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

    const newSong = new Song(
        req.body.title,
        req.body.album,
        req.body["preview link"],
        req.body.artwork,
        req.artist.id);

    await newSong.save();

    res.redirect('./songs');

}

module.exports.getEditArtistSongById = async (req, res) => {

    !req.song.title ? res.render('404') : res.render('./songs/edit-song.jsx', {
        'singleSong': req.song,
        'artist': req.artist
    });

}

module.exports.putArtistSongById = async (req, res) => {

    await Song.edit(
        req.body.title,
        req.body.album,
        req.body['preview link'],
        req.body.artwork,
        req.artist.id,
        req.song.id
    );

    res.redirect(`./${req.song.position}`);

}

module.exports.deleteArtistSongById = async (req, res) => {

    await Song.delete(req.song.id);

    res.render('./songs/song-deleted');

}