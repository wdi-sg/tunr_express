var React = require("react");

class PlaylistInfo extends React.Component {
  render() {

    const viewPlaylistInfo = this.props.songTitle.map((singlePlaylist) => {
        return (
            <div>
                <li>{singlePlaylist.title}</li>
            </div>
        );
    });

    return (
      <html>
        <head />
        <body>
          <h1>You are viewing details of {this.props.playlistName.name}</h1>
          <div>
            <ul>
              {viewPlaylistInfo}
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = PlaylistInfo;
