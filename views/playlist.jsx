const React = require("react");
const Layout = require("./layout");

class Playlist extends React.Component {
  render() {
    console.log(this.props.playlists);
    let playlistElement;
    if (Array.isArray(this.props.playlists)) {
      const playlists = this.props.playlists;
      playlistElement = playlists.map(playlist => {
        const playListPath = "/playlists/" + playlist.id;
        return (
          <h6 className="mb-5">
            <a href={playListPath}>{playlist.name}</a>
          </h6>
        );
      });
    } else {
      const newSongPath = "/playlists/" + this.props.playlists.id + "/newsong";
      playlistElement = (
        <div className="d-flex flex-column justify-content-center ">
          <h1>{this.props.playlists.name}</h1>
          <a className="btn btn-primary" href={newSongPath}>
            New Song
          </a>
        </div>
      );
    }

    return (
      <Layout>
        <div className="container d-flex flex-column align-items-center playlist">
          {playlistElement}
        </div>
      </Layout>
    );
  }
}

module.exports = Playlist;
