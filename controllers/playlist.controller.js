const listPlaylists = ((req, res) => {
  res.json('list playlist route')
})
const showCreatePlaylist = ((req, res) => {
  res.json('show create playlist route')
})
const addNewPlaylist = ((req, res) => {
  res.json('add new playlist route')
})
const showPlaylist = ((req, res) => {
  res.json('show playlist (list all songs)')
})
const editPlaylist = ((req, res) => {
  res.json('edit playlist form route')
})
const updatePlaylist = ((req, res) => {
  res.json(' update playlist route ')
})
const removePlaylist = ((req, res) => {
  res.json('remove playlist route')
})
const addSongToPlaylist = ((req, res) => {
  res.json(' add new song to playlist route')
})


module.exports = {
  listPlaylists,
  showCreatePlaylist,
  addNewPlaylist,
  showPlaylist,
  editPlaylist,
  updatePlaylist,
  removePlaylist,
  addSongToPlaylist
}
