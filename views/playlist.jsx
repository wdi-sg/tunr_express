const React = require("react");
const Layout = require("./layout");

class Playlist extends React.Component {
  render() {
    console.log(this.props);
    const playlistName = this.props.playlistName.name;
    const playlistSongs = this.props.playlistSongs;

    const songElement = playlistSongs.map(song => {
      return <h6><a className="text-light" href={song.preview_link}>{song.title}</a></h6>;
    });

    console.log(playlistName, playlistSongs);

    return (
      <Layout>
        <div className="container text-center">
          <h1>{playlistName}</h1>
          {songElement}
        </div>
      </Layout>
    );
  }
}

module.exports = Playlist;
