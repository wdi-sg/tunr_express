const Artist = require('../models/artist.model')

const showArtist = ((req, res) => {
  const { id } = req.params
   Artist.select('*', { id })
     .then(artists => res.json(artists))
     .catch(console.error)
})

const listArtists = ((req, res) => {
  Artist.select('*')
    .then(artists => res.json(artists))
    .catch(console.error)
})

const showCreateArtist = ((req, res) => {
  // render create
  res.json('display artist form')
})

// receives an artist?
const addNewArtist = ((req, res) => {
  const { name, photo_url, nationality } = req.body
  const newArtist = new Artist(-1, name, photo_url, nationality)
  newArtist.save()
    .then(data => res.json(data))
    .catch(console.error)
})

const editArtist = ((req, res) => {
  // render edit
  res.json('edit artist')
})

// receives an artist?
const updateArtist = ((req, res) => {
  const artist = new Artist()
  artist.data = req.body
  artist.update()
    .then(data => res.json(data))
    .catch(console.error)
})

// @returns {Arr} [] if not deleted, else id of deleted
const removeArtist = ((req, res) => {
  const artist = new Artist()
  artist.id = req.body.id
  artist.delete()
    .then(data => res.json(data.rows))
    .catch(console.error)
})

// @param artist id
// @returns {Artist} with relns
const showArtistSongs = ((req, res) => {
  const {id} = req.params
  // Artist.fetchChild('*')
  const artist = new Artist(id)
  artist.fetchChild('song')
    .then(artistWithSongs=>res.json(artistWithSongs.data))
    .catch(console.error)
})

const createNewArtistSong = ((res, req) => {
  res.json('show create new artist songs')
})

const showCreateNewArtistSong = ((res, req) => {
  res.json('show create new artist song form')
})

module.exports = {
  listArtists,
  showCreateArtist,
  addNewArtist,
  showArtist,
  editArtist,
  updateArtist,
  removeArtist,
  showArtistSongs,
  createNewArtistSong,
  showCreateNewArtistSong
}