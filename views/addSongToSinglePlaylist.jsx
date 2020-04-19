var React = require("react");

class AddedSongToSinglePlaylist extends React.Component {
  render() {
    const songListDropdown = this.props.songlist.map((eachSong) => {
      return (
        <option name="songNum" value={eachSong.id}>
          {eachSong.id}: {eachSong.title}
        </option>
      );
    });
    return (
      <html>
        <head />
        <body>
          <span>
            <h3>Playlist's id :</h3>
            <h4>{this.props.playlistInfo.id}</h4>
          </span>
          <p>Playlist's name: </p>
          <h4>{this.props.playlistInfo.name}</h4>
          <h5>Add a song to this playlist:</h5>
          <form action="/playlist/:id" method="POST">
            <input
              //   type="hidden"
              name="playlistNum"
              value={this.props.playlistInfo.id}
            ></input>

            <select>{songListDropdown}</select>
            <br />
            <button type="submit">Add selected song to playlist</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = AddedSongToSinglePlaylist;
