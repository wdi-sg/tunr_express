const listArtists = ((req, res) => {
  res.json('list artist')
})

const showCreateArtist = ((req, res) => {
  res.json('display artist form')
})

const addNewArtist = ((req, res) => {

  res.json('add new artist')
})

const showArtist = ((req, res) => {

  res.json('show one artist')
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

module.exports = {
  listArtists,
  showCreateArtist,
  addNewArtist,
  showArtist,
  editArtist,
  updateArtist,
  removeArtist
}