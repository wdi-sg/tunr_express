var React = require("react");

class ShowPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Playlist</h1>
          <p>{this.props.playlistName}</p>
        </body>
      </html>
    );
  }
}

module.exports = ShowPlaylist;
