const React = require("react");

class Artist extends React.Component {
  render() {
    return (
      <div>
        <h3><a href={`/playlists/${this.props.playlist_id}`}>Playlist id: {this.props.playlist_id}</a></h3>
        <p>Song id: {this.props.song_id}</p>
        {/* <img src={this.props.photo_url} alt={this.props.name} width="100" /> */}
        {/* <p>Nationality: {this.props.nationality}</p> */}
        <hr />
      </div>
    );
  }
}

module.exports = Artist;
