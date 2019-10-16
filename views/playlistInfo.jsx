var React = require("react");

class PlaylistInfo extends React.Component {
  render() {

    const viewPlaylistInfo = this.props.playlist.map((singlePlaylist) => {
        return (
            <div>
                <p>{singlePlaylist.name}</p>
            </div>
        );
    });

    return (
      <html>
        <head />
        <body>
          <h1>You are viewing details of {this.props.playlist[0].name}</h1>
          <div>
              {viewPlaylistInfo}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = PlaylistInfo;
