var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create A New Playlist</h3>
          <form method="POST" action="/playlists">
          <div>Name of Playlist: <input type="text" name="name"/></div>
          <br />
          <div><input type="submit" value="Submit"/></div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;