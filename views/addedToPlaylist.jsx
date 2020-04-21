var React = require("react");

class AddedToPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>
            You have just added song No. {this.props.addedSong.song_id} to
            playlist {this.props.addedSong.playlist_id}:
          </h3>
          <footer>Number of visits: {this.props.counter}</footer>
        </body>
      </html>
    );
  }
}

module.exports = AddedToPlaylist;
