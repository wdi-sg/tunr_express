var React = require("react");

class PlaylistSongs extends React.Component {
  render() {

    console.log(this.props.songsByPlaylist);
    const songs = this.props.songsByPlaylist.map( song=> {
        return <li>{song.title}</li>
    })

    return (
      <html>
        <head />
        <body>
          <h1>Playlist: {this.props.playlistName}</h1>
          <div>
          <ol>
              {songs}
          </ol>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = PlaylistSongs;