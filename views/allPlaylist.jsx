var React = require("react");

class AllPlaylist extends React.Component {
  render() {

    const playlistName = this.props.playlists.map ((playlist) => {

        return (
            <div>
                <li>{playlist.name}</li>
            </div>
        );
    });

    return (
      <html>
        <head />
        <body>
          <h1>All Playlists</h1>
          <ul>
              {playlistName}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = AllPlaylist;
