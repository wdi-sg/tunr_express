const React = require("react");
const Playlist = require("./Playlist");

class SinglePlaylist extends React.Component {
  render() {
    if (!this.props.playlist) {
      return (
        <div>
          <h1>Playlist id not found!</h1>
          <a href="/playlists/">Return to main</a>
        </div>
      );
    }
    const { id, name } = this.props.playlist;
    return (
      <div>
          <strong>{this.props.msg}</strong>
          <Playlist id={id} name={name} />
          <a href={`/playlists/${id}/edit`}>edit</a><br/>
          <a href="/playlists/">back to main</a>
      </div>
    );
  }
}

module.exports = SinglePlaylist;
