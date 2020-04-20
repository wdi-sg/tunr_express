var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create New Playlist</h3>
          <form method='POST' action='/playlists'>
            <p>Playlist Name</p>
            <input type='text' name='name' placeholder="playlist name"/>
            <input type='submit' value='Submit'/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;
