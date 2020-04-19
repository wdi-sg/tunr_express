var React = require("react");

class AllPlaylist extends React.Component {
  render() {
    const playlistName = this.props.individualPlaylist.map((eachPlaylist) => {
      return (
        <div>
          <p>
            {eachPlaylist.id}: {eachPlaylist.name}
          </p>
        </div>
      );
    });
    return (
      <html>
        <head />
        <body>
          <h3>All playlists</h3>
          {playlistName}
        </body>
      </html>
    );
  }
}

module.exports = AllPlaylist;
