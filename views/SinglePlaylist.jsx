const React = require("react");
const Playlist = require("./Playlist");

class SinglePlaylist extends React.Component {
  render() {
    if (!this.props.result) {
      return (
        <div>
          <h1>Playlist id not found!</h1>
          <a href="/playlists/">Return to main</a>
        </div>
      );
    }
    // const { id, name } = this.props.result;
    return (
      <div>
          <strong>{this.props.msg}</strong>
          <h3>Playlist: {this.props.playlist_id}</h3>
          <ul>
          { this.props.result.map( result => {
            return (
              <li>{result.title}</li>
            );
          })}
          </ul>
          <a href="/playlists/">back to main</a>
      </div>
    );
  }
}

module.exports = SinglePlaylist;
