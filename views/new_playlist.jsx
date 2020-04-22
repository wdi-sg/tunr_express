var React = require('react');

class NewPlaylist extends React.Component {
  render() {
    const songs = this.props.songList;

    const options = songs.map(song => {
        return (
            <option>{song.title}</option>
            );
    })

    return (
      <html>
      <body>
      <p>Create New Playlist</p>
      <form method="POST" action="/playlists">
      <p>Name</p>
      <input type="text" name="name"/>
      <p>Songs</p>
      <select name="songs">
      {options}
      </select>
      <br/><br/>
      <input type='submit' value='Submit'/>
      </form>

      </body>
      </html>
      );
}
}

module.exports = NewPlaylist; 