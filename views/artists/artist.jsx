var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artist = this.props.artist;

    let songsList = `/artists/${artist.id}/songs/`

    return (
      <Layout title={artist.name}>
        <h1>{artist.name}</h1>
        <img src={artist.photo_url} />
        <p>Nationality: {artist.nationality}</p>
        <a href={songsList}>Songs</a>
      </Layout>
    );
  }
}

module.exports = Home;
