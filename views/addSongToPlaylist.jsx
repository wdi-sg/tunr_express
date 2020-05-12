var React = require("react");

class AddSongToPlaylist extends React.Component {
  render() {

    const songsAvailable = this.props.songList.map((song) => {
        return (
            <div>
                {song.id}. {song.title}
            </div>
        );
    });

    return (
      <html>
        <head />
        <body>
          <h1>Add song to the playlist: {this.props.playlistName[0].name}</h1>
          <form action={"/playlist/" + this.props.playlistName[0].id} method="POST">
            <input type="text" name="songID" />
            <input type="submit" value="Add Song to Playlist" />
            <ul>
                {songsAvailable}
            </ul>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = AddSongToPlaylist;
