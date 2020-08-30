
module.exports = (db) => {

console.log("controllers triggered");

    let helloWorld = (req, res) => {
        res.send("Hello World.")
    }

    let allArtists = (req, res) => {
        db.artists.getAll((err, result) => {
            res.render('home', result.rows)
        })
    }

    let newArtistForm = (req, res) => {
        res.render('new');
    }

    let addNewArtist = (req, res) => {
        let values = [req.body.name, req.body.photo_url, req.body.nationality];
        db.artists.postNewArtist(values, (err, result) => res.send("Artist added successfully!"))
    }

    let viewSingleArtist = (req, res) => {
        let id = [req.params.id];
        db.artists.artistInfo(id, (err, result) => res.send(result.rows))
    }

    let editArtistInfo = (req, res) => {
        db.artists.editInfo(req.params.id, (err, result) => res.render('edit', result.rows[0]))
    }

    let updateArtistInfo = (req, res) => {
        let values = [req.params.id, req.body.name, req.body.photo_url, req.body.nationality];
        db.artists.updateInfo(values, (err, result) => res.send("Entry updated successfully"))
    }

    let deleteArtistForm = (req, res) => {
        res.render('delete');
    }

    let deleteArtist = (req, res) => {
        db.artists.removeEntry(req.body.id, (err, result) => res.send("Artist entry deleted."))
    }

    let showArtistSongs = (req, res) => {
        db.artists.getSongs(req.params.id, (err, result) => res.send(result.rows))
    }


    return {
        allArtists,
        helloWorld,
        newArtistForm,
        addNewArtist,
        viewSingleArtist,
        editArtistInfo,
        updateArtistInfo,
        deleteArtistForm,
        deleteArtist,
        showArtistSongs
    }
}