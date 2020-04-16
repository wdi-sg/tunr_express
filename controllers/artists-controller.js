module.exports.getArtistById = async (req, res) => {
    // const { id } = req.params;
    // const { rows } = await db.query('SELECT * FROM artists where id = $1', [id]);
    console.log('Get Artist By Id');
    res.send('Get Artist By Id');
}

module.exports.getAllArtists = async (req, res) => {
    console.log('Get All Artist!');
    res.send('Get All Artists!');
}

module.exports.postAddArtist = async (req, res) => {
    console.log('Add New Artist!');
    res.send('Add New Artist!');
}

module.exports.getEditArtistById = async (req, res) => {
    console.log('Get Edit Artist Form By Id!');
    res.send('Get Edit Artist Form By Id!');
}

module.exports.putArtistById = async (req, res) => {
    console.log('Artist Edited!');
    res.send('Artist Edited!');
}

module.exports.deleteArtistById = async (req, res) => {
    console.log('Delete Artist Form By Id!');
    res.send('Delete Artist Form By Id!');
}