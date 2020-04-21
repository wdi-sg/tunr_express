var React = require("react");

class SinglePlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <span>
            <h3>Playlist's id :</h3>
            <h4>{this.props.playlistInfo.id}</h4>
          </span>
          <p>Playlist's name: </p>
          <h4>{this.props.playlistInfo.name}</h4>
          <footer>Number of visits: {this.props.counter}</footer>
        </body>
      </html>
    );
  }
}

module.exports = SinglePlaylist;
