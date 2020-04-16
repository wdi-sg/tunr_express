module.exports.getArtistSongById = async (req, res) => {
    // const { id } = req.params;
    // const { rows } = await db.query('SELECT * FROM songs where id = $1', [id]);
    console.log('Get Artist Song By Id');
    res.send('Get Artist Song By Id');
}

module.exports.getAllSongsOfArtist = async (req, res) => {
    // const { id } = req.params;
    // const { rows } = await db.query('SELECT * FROM songs');
    console.log('Get All Songs');
    res.send('Get All Songs');
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