var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artist = this.props.artist;
    let song = this.props.song;

    let editURL = `/artists/${artist.id}/songs/${song.id}/edit`;

    return (
    <Layout title={song.title}>
      <h1>{song.title}</h1>
      <h4>{artist.name}</h4>
      <img src={song.artwork} />
      <p>Album: {song.album}</p>
      <p><a href={song.preview_link}>Preview</a></p>
      <p><a href={editURL}>Edit</a></p>
    </Layout>
    );
  }
}

module.exports = Home;
