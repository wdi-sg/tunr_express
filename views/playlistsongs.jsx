var React = require("react");

class Playlistsongs extends React.Component {
  render() {
    let allSongs = this.props.songs.map(song => {
        return <li>{song.title}</li>
    });
    let addSongLink = "/playlist/" + String(this.props.id) + "/newsong";
    return (
      <html>
        <head />
        <body>
          <h1>All songs for selected playlist: </h1>
          <ul>
            {allSongs}
          </ul>
          <a href={addSongLink}>Add a new song into playlist</a>
        </body>
      </html>
    );
  }
}

module.exports = Playlistsongs;