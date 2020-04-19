var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add a new playlist</h3>
          <form action="/playlist" method="POST">
            <input
              type="text"
              name="newPlaylist"
              placeholder="Name of playlist"
            />
            <br />
            <button type="submit">Add Playlist</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;
