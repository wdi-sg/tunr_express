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

const showArtistSongs =((req,res) => {
  res.json('show artist songs')
})

const createNewArtistSong = ((res,req)=> {
  res.json('show create new artist songs')
})

const showCreateNewArtistSong = ((res, req)=> {
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