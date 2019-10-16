const React = require("react");
const Playlist = require("./Playlist");

class AllPlaylists extends React.Component {
  render() {
    return (
      <div>
        <h1>All Playlists</h1>
        <h3>
          <a href="/playlists/new">add a new playlist</a>
        </h3>
        <ul>
          {this.props.playlists.map(playlist => (
            <li>
              <a href={`/playlists/${playlist.id}`}>{playlist.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

module.exports = AllPlaylists;
