const React = require("react");
const Layout = require("./layout");

class Playlist extends React.Component {
  render() {
    const playlistID = this.props.playlistName.id;
    const playlistName = this.props.playlistName.name;
    const playlistSongs = this.props.playlistSongs;

    const songElement = playlistSongs.map(song => {
      return (
        <h6>
          <a className="text-light" href={song.preview_link}>
            {song.title}
          </a>
        </h6>
      );
    });

    const addSongPath = "/playlists/" + playlistID + "/newsong";

    return (
      <Layout username={this.props.username}>
        <div className="container text-center d-flex justify-content-center align-items-center">
          <h1 className="mr-3">{playlistName}</h1>{" "}
          <a href={addSongPath}>
            <button className="btn btn-success">New Song</button>
          </a>
        </div>
        <div className="container text-center">{songElement}</div>
      </Layout>
    );
  }
}

module.exports = Playlist;
