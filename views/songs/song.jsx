var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artist = this.props.artist;
    let song = this.props.song;

    return (
    <Layout title={song.title}>
      <h1>{song.title}</h1>
      <h4>{artist.name}</h4>
      <img src={song.artwork} />
      <p>Album: {song.album}</p>
      <p><a href={song.preview_link}>Preview</a></p>
    </Layout>
    );
  }
}

module.exports = Home;
