var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artist = this.props.artist;

    let songsList = `/artists/${artist.id}/songs/`
    let editURL = `/artists/${artist.id}/edit`

    return (
      <Layout title={artist.name}>
        <h1>{artist.name}</h1>
        <img src={artist.photo_url} />
        <p>Nationality: {artist.nationality}</p>
        <a href={songsList}>Songs</a>
        <p><a href={editURL}>Edit</a></p>
      </Layout>
    );
  }
}

module.exports = Home;
