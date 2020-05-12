var React = require("react");

class NewPlaylist extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>New Playlist</h1>
          <form action="/playlist" method="POST">
              <input type="text" name="playlistName" />
              <input type="submit" value="Create Playlist" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;
