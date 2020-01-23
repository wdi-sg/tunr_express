var React = require("react");

class AddSongToPlaylist extends React.Component {
  render() {
      const allSongs = this.props.songs.map(song =>{
          return <option value = {song.id}>{song.title}</option>
      })
      const index = "/playlists/" + this.props.hello;
    return (
      <html>
        <head />
        <body>
        <form action =  {index} method = "POST">
          ADD SONGS TO YOUR PLAYLIST!<br/>
          <select name="selectedSongs">{allSongs}</select>
          <br/>
          <input type="submit"></input>
          </form>
          </body>
      </html>
    );
  }
}

module.exports = AddSongToPlaylist;