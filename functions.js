const pg = require('pg');

const configs = {
    user: 'robertkolsek',
    host: '127.0.0.1',
    database: 'tunr_db',
    port: 5432,
};

const pool = new pg.Pool(configs);

module.exports.deleteArtist = (req, res) => {
    const id = req.params.id
    const queryText = "DELETE FROM artists WHERE id='" + id + "'"

    pool.query(queryText, (err, result) => {
        if (err) {
            console.log("error", err.message)
        } else {

            const queryArtists = "SELECT * FROM artists"

            pool.query(queryArtists, (err, result) => {

                if (err) {
                    console.log("error", err.message)
                } else {
                    const data = {
                        artists: result.rows
                    }
                    res.render('show-all-artists', data)

                }

            })
        }
    })
}

module.exports.deleteForm = (req, res) => {
    const id = req.params.id
    const queryText = "SELECT * FROM artists WHERE id='" + id + "'"

    pool.query(queryText, (err, result) => {
        if (err) {
            console.log("error", err.message)
        } else {
            const data = {
                id: id,
                artist: result.rows[0]
            }
            res.render('delete', data)
        }
    })
}

module.exports.editForm = (req, res) => {

    const id = req.params.id
    const queryText = "SELECT * FROM artists WHERE id='" + id + "'"

    pool.query(queryText, (err, result) => {
        if (err) {
            console.log("error", err.message)
        } else {
            const data = {
                id: id,
                artist: result.rows[0]
            }
            res.render('edit', data)
        }
    })
}

module.exports.editArtist = (req, res) => {
    const id = req.params.id
    const values = [
        req.body.name,
        req.body.photo_url,
        req.body.nationality
    ]
    const queryText = "UPDATE artists SET name=$1, photo_url=$2, nationality=$3 WHERE id='" + id + "' RETURNING *"

    pool.query(queryText, values, (err, result) => {
        if (err) {
            console.log("error", err.message)
        } else {
            console.log(result.rows)
            res.render('show-artist', result.rows[0])
        }

    })
}

module.exports.newForm = (req, res) => {
    res.render('new');
}

module.exports.newArtist = (req, res) => {

    const newArtist = [
        req.body.name,
        req.body.photo_url,
        req.body.nationality
    ]

    const queryText = 'INSERT INTO artists (name, photo_url, nationality) VALUES ($1, $2, $3) RETURNING *'

    pool.query(queryText, newArtist, (err, result) => {

        if (err) {
            console.log("error", err.message)
        } else {

            const queryArtists = "SELECT * FROM artists"

            pool.query(queryArtists, (err, result) => {

                if (err) {
                    console.log("error", err.message)
                } else {
                    const data = {
                        artists: result.rows
                    }
                    res.render('show-all-artists', data)

                }

            })

        }
    })
}

module.exports.showArtists = (req, res) => {

    const queryText = "SELECT * FROM artists"

    pool.query(queryText, (err, result) => {
        if (err) {
            console.log("error", err.message)
        } else {
            const data = {
                artists: result.rows
            }
            res.render('show-all-artists', data)
        }
    })
}

module.exports.showSongs = (req, res) => {

    const id = req.params.id

    const artistQuery = "SELECT * FROM artists WHERE id='" + id + "'"
    const songQuery = "SELECT * FROM songs WHERE artist_id='" + id + "'"

    pool.query(artistQuery, (err, result) => {

        if (err) {
            console.log("error", err.message)
        } else {

            const artistName = result.rows[0]
            console.log(artistName)
            pool.query(songQuery, (error, songResult) => {

                if (err) {
                    console.log("error", err.message)
                } else {

                    const data = {
                        artistName: artistName,
                        songs: songResult.rows
                    }
                    // NEXT: MAP songs in jsx file and generate LI HTML
                    res.render('show-songs', data)
                }

                //end query 2
            })

        }
        //end query 1
    })
    //end request
}
module.exports.showArtistByID = (req, res) => {
    const id = req.params.id
    const queryText = "SELECT * FROM artists WHERE id='" + id + "'"

    pool.query(queryText, (err, result) => {

        if (err) {
            console.log("error", err.message)
        } else {
            res.render('show-artist', result.rows[0])

        }
    })
}

module.exports.showNewPlaylist = (req,res) => {
    res.render('new-playlist')
}

module.exports.newPlaylist = (req,res) => {
    const newPlaylist = [req.body.name]

    const queryText = 'INSERT INTO playlist (name) VALUES ($1) RETURNING *'

    pool.query(queryText, newPlaylist, (err,result) =>{

        res.send("Success!")

    })
}

module.exports.showPlaylistByID = (req, res) => {
    const id = [req.params.id]

    

    const joinQuery = "SELECT songs.title FROM songs INNER JOIN playlist_song ON (songs.id = playlist_song.song_id) WHERE playlist_song.playlist_id=$1"

    pool.query(joinQuery, id, (err,result) => {

        if (err) {
            console.log("error", err.message)
        } else {
            const data = {
                songs: result.rows
            }
            console.log(data)
            const queryText = "SELECT * FROM playlist WHERE id='" + id + "'"

            pool.query(queryText, (err, playResult) => {

                data.playlist = playResult.rows[0].name

                res.render('show-playlist', data)
            })
            
            

        }

    })
}

module.exports.showPlaylistNewSong = (req, res) => {
    const id = req.params.id
    const queryText = "SELECT title, id FROM songs"

    pool.query(queryText, (err,result) => {

        if (err) {
            console.log("error", err.message)
        } else {
            
            const data = {
                id: id,
                songs: result.rows
            }
            res.render('new-song', data)

        }

    })
}

module.exports.playlistNewSong = (req, res) => {
    const plID = req.params.id
    const values = [req.body.song, plID]

    const queryText = "INSERT INTO playlist_song (song_id, playlist_id) VALUES ($1, $2) RETURNING *"

    pool.query(queryText, values, (err,result) => {

        if (err) {
            console.log("error", err.message)
        } else {
            
           res.send(result.rows)

        }

    })
}