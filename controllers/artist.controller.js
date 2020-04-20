
const Artist = require('../models/artist.model')

const listArtists = ((req, res) => {

  res.json('list artist')
})

const showCreateArtist = ((req, res) => {
  // newArtist.select('*', {id})
  // select * from artist where
  res.json('display artist form')
})

const addNewArtist =  ((req, res) => {
  const newArtist = new Artist('James')
  newArtist.save()
    .then(data=> res.json(data))
    .catch(console.error)
})

const showArtist = ((req, res) => {
  const {id} = req.params;
  const result = Artist.select('*',{id})
  result.then(data=>res.json(data))
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