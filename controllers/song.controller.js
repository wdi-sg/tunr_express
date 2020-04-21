const Song = require('../models/song.model')

const listSongs = ((req, res) => {
  const data = Song.select('*')
  data.then(data => res.json(data))
    .catch(console.error)
})

const showCreateSong = ((req, res) => {

  res.json('display Song form')
})

const addNewSong = ((req, res) => {
  const { title, album, preview_link, artwork, artist_id } = req.body
  const song = new Song(-1, title, album, preview_link, artwork, artist_id)
  song.save()
    .then(result => res.json(result))
    .catch(console.error)
})

const showSong = ((req, res) => {
  const { id } = req.params
  Song.select('*', { id })
    .then(songs => res.json(songs))
    .catch(console.error)
})

const editSong = ((req, res) => {

  res.json('edit Song')
})

const updateSong = ((req, res) => {
  const {id, title, album, preview_link, artwork, artist_id} = req.body
  const song = new Song(id, title, album, preview_link, artwork, artist_id)
  song.update()
    .then(data=>res.json(data))
    .catch(console.error)
})

const removeSong = ((req, res) => {
  const song = new Song()
  song.id = req.body.id
  song.delete()
    .then(data=>res.json(data.rows))
    .catch(console.error)
  res.json('edit Song')
})

module.exports = {
  listSongs,
  showCreateSong,
  addNewSong,
  showSong,
  editSong,
  updateSong,
  removeSong
}