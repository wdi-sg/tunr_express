module.exports = (db) => {

    let homepage = (req,res) => {
        res.render('home');
    }

    let allArtists = (req,res) => {
        db.artists.allArtists_cb((err,result) => {
            if (err) {
                console.log('error in artists_controller allArtists', err.message);
            }
            else {
                res.send(result.rows);
            }
        })
    }

    let newArtist = (req,res) => {
        res.render('new');
    }

    let createNewArtist = (req,res) => {

        let name = req.body.artistName;
        let img_url = req.body.imageUrl;
        let nationality = req.body.artistNationality;

        db.artists.createNewArtist_cb(name, img_url, nationality, (err,result) => {
            if (err) {
                console.log('error in artists_controller createNewArtist', err.message);
            }
            else {
                res.send(req.body);
            }
        })
    }

    let getArtist = (req,res) => {

        let id = req.params.id;

        db.artists.getArtist_cb(id, (err,result) => {
            if (err) {
                console.log('error in artists_controller getArtist', err.message);
            }
            else {
                res.render('artist', result.rows);
            }
        })
    }

    let deleteArtist = (req,res) => {

        let id = req.params.id;

        db.artists.deleteArtist_cb(id, (err,result) => {
            if (err) {
                console.log('error in artists_controller deleteArtist', err.message);
            }
            else {
                res.send('Artist Deleted');
            }
        })
    }

    let editArtist = (req,res) => {

        let id = req.params.id;

        db.artists.editArtist_cb(id, (err,result) => {
            if (err) {
                console.log('error in artists_controller editArtist', err.message);
            }
            else {
                res.render('edit_artist', result.rows);
            }
        })
    }

    let editedArtist = (req,res) => {

        let name = req.body.artistName;
        let img_url = req.body.imageUrl;
        let nationality = req.body.artistNationality;
        let id = req.params.id;

        db.artists.editedArtist_cb(name, img_url, nationality, id, (err,result) => {
            if (err) {
                console.log('error in artists_controller editedArtist', err.message);
            }
            else {
                res.send(req.body);
            }
        })
    }

    let artistSongs = (req,res) => {

        let id = req.params.id;

        db.artists.artistSongs_cb(id, (err,result) => {
            if (err) {
                console.log('error in artists_controller artistSongs', err.message);
            }
            else {
                res.send(result.rows);
            }
        })
    }    

    return {
        homepage,
        allArtists,
        newArtist,
        createNewArtist,
        getArtist,
        deleteArtist,
        editArtist,
        editedArtist,
        artistSongs
    }
}


