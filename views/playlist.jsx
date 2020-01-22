const React = require("react");
const Layout = require("./layout");

class Playlist extends React.Component {
  render() {
    console.log(this.props.playlists);
    let playlistElement;
    if (Array.isArray(this.props.playlists)) {
      const playlists = this.props.playlists;
      playlistElement = playlists.map(playlist => {
        return <h6 className="mb-5">{playlist.name}</h6>;
      });
    } else {
      playlistElement = <h1>{this.props.playlists.name}</h1>;
    }

    return (
      <Layout>
        <div className="container d-flex flex-column align-items-center">
          {playlistElement}
        </div>
      </Layout>
    );
  }
}

module.exports = Playlist;
