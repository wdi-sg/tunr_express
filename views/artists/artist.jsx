var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artist = this.props.artist;

    let songLink = `/artists/${artist.id}/songs/`

    return (
      <html>
        <head />
        <body>
          <Layout title="Index">
            <h1>{artist.name}</h1>
            <img src={artist.photo_url} />
            <p>Nationality: {artist.nationality}</p>
            <a href={songLink}>Songs</a>
            </Layout>
        </body>
      </html>
    );
  }
}

module.exports = Home;
