var React = require("react");

class Playlisthome extends React.Component {
  render() {
    let allPlaylist = this.props.playlists.map(playlist => {
        let playlistLink = "/playlist/" + playlist.id;
        return <li><a href={playlistLink}>{playlist.name}</a></li>
    });
    return (
      <html>
        <head />
        <body>
          <h1>List of playlists: </h1>
          <ul>
            {allPlaylist}
          </ul>
          <div>
            <a href="/playlist/new">Add a new Playlist</a>
          </div>
          <div>
            <a href="/artists">Back to artist page</a>
          </div>
          Visit Counter: {String(this.props.visits)}
        </body>
      </html>
    );
  }
}

module.exports = Playlisthome;