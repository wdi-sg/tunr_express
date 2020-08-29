// takes in allModels as parameter from routes.js < index.js (require db.js)
// export to routes.js
module.exports = (db) => {
    
    let root = (req, res) => {
        res.render('./home');
    }

    let allArtists = (req, res) => {
        db.artist.getAllArtist((err, result) => {
            if (err) {
                console.log("-- Error in allArtist controller", err.message);
            } else {
                res.render('./artists/artists', result);
            }
        });
    }

    let newArtistForm = (req, res) => {
        res.render('./artists/new')
    }

    let newArtist = (req, res) => {
        let artistInfo = req.body;
        let values = [artistInfo.name, artistInfo.photo_url, artistInfo.nationality];
        db.artist.createNewArtist(values, (err, result) => {
            if (err) {
                console.log("-- Error in newArtist controller", err.message)
            } else {
                if (result === true) {
                    res.redirect('./artists/artists');
                }
            }
        })
    }

    let showSingleArtist = (req, res) => {
        let id = req.params.id;
        db.artist.selectSingleArtist(id, (err, result) => {
            if (err) {
                console.log("-- Error in showSingleArtist controller", err.message)
            } else {
                res.render('./artists/single_artist', result)
            }
        })
    }

    let getEditArtistForm = (req, res) => {
        let id = req.params.id;
        db.artist.selectSingleArtist(id, (err, result) => {
            if (err) {
                console.log("-- Error in editArtistForm controller", err.message)
            } else {
                res.render('./artists/update', result)
            }
        })
    }

    let updateEditArtist = (req, res) => {
        let id = req.params.id;
        let newData = [req.body.name, req.body.photo_url, req.body.nationality]
        db.artist.updateArtist(id, newData, (err, result) => {
            if (err) {
                console.log("-- Error in updateEditArtist controller", err.message)
            } else {
                if (result === true) {
                    res.redirect('./artists/artists');
                }
            }
        })
    }

    let deleteArtist = (req, res) => {
        let id = req.params.id;

        db.artist.removeArtist(id, (err, result) => {
            if (err) {
                console.log("-- Error in deleteArtist controller", err.message)
            } else {
                if (result === true) {
                    res.redirect('./artists/artists');
                }
            }
        })
    }

    let artistSong = (req, res) => {
        let id = req.params.id;

        db.artist.getArtistSongs(id, (err, result) => {
            if (err) {
                console.log("-- Error in deleteArtist controller", err.message)
            } else {
                res.render('./artists/artistsong', result)
            }
        })
    }
    
    return {
        root,
        allArtists,
        newArtistForm,
        newArtist,
        showSingleArtist,
        getEditArtistForm,
        updateEditArtist,
        deleteArtist,
        artistSong
    }
};