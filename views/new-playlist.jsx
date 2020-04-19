var React = require("react");

class NewPlaylist extends React.Component {
  render() {
        console.log("new-playlist.jsx");

    return (
      <html>
        <head />
        <body>
          <h3>Add New Playlist</h3>
          <form method="POST" action="/playlists">
            <p>Playlist Name: <input name="name"/></p>
            <p><input type="submit" value="Add Playlist"/></p>
          </form>
        </body>
      </html>
    );
  }
};

module.exports = NewPlaylist;
