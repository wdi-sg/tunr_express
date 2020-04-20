const Artist = require('../models/artist.model')


const showArtist = ((req, res) => {
  const { id } = req.params
   Artist.select('*', { id })
     .then(artists => res.json(artists))
})

const listArtists = ((req, res) => {
  Artist.select('*')
    .then(artists=>res.json(artists))
})

const showCreateArtist = ((req, res) => {
  res.json('display artist form')
})

const addNewArtist = ((req, res) => {
  const { name, photo_url, nationality } = req.body
  const newArtist = new Artist(-1, name, photo_url, nationality)
  newArtist.save()
    .then(data => res.json(data))
    .catch(console.error)
})

const editArtist = ((req, res) => {

  res.json('edit artist')
})

const updateArtist = ((req, res) => {

  res.json('edit artist')
})

const removeArtist = ((req, res) => {

  res.json('edit artist')
})

const showArtistSongs = ((req, res) => {
  res.json('show artist songs')
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