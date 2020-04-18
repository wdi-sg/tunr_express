const listSongs = ((req, res) => {
  res.json('list Song')
})

const showCreateSong = ((req, res) => {
  res.json('display Song form')
})

const addNewSong = ((req, res) => {

  res.json('add new Song')
})

const showSong = ((req, res) => {

  res.json('show one Song')
})

const editSong = ((req, res) => {

  res.json('edit Song')
})

const updateSong = ((req, res) => {

  res.json('edit Song')
})

const removeSong = ((req, res) => {

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