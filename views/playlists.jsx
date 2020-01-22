const React = require("react");
const Layout = require("./layout");

class Playlist extends React.Component {
  render() {
    let playlistElement;
    const playlistName = this.props.playlistName;

    const playlists = this.props.playlists;
    console.log(this.props);
    playlistElement = playlists.map(playlist => {
      const playListPath = "/playlists/" + playlist.id;
      return (
        <h6 className="mb-4">
          <a href={playListPath}>{playlist.name}</a>
        </h6>
      );
    });

    return (
      <Layout>
        <div className="container d-flex flex-column align-items-center ">
          <h1 className="mb-4">All Playlists</h1>
          {playlistElement}
        </div>
      </Layout>
    );
  }
}

module.exports = Playlist;
