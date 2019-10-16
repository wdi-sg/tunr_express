const React = require("react");
const Playlist = require("./Playlist");

class AllPlaylists extends React.Component {
  render() {
    return (
      <div>
        <h1>All Playlists</h1>
        <h2><a href="/playlists/new">add a new playlist</a></h2>
        {this.props.playlists.map(playlist => (
          <Playlist id={playlist.id} name={playlist.name} />
        ))}
      </div>
    );
  }
}

module.exports = AllPlaylists;
