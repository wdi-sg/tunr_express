var React = require("react");

class NewPlaylistSong extends React.Component {
  render() {
    const songs = this.props.songs.map(result =>{
        return (<option value={result.id}>{result.title}</option>)
    })
    const link = '/playlists/' + this.props.id + "/newsong"
        console.log(link)
    return (
      <html>
        <head />
        <body>
          <h3>Add song to playlist</h3>
          <form method='POST' action={link}>
            <p></p>
            <p>Song</p>
            <select name="songs">
            {songs}
            </select>
            <input type='submit' value='Submit'/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylistSong;
