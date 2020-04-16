var React = require("react");

class Artists extends React.Component {
  render() {
    const artists = this.props.artists;

    const artistList = artists.map(artist => {
        return (
            <a href={`/artists/${artist.id}`}>{artist.name}</a>
            );
    })

    return (
      <html>
        <head />
        <body>
          <p>Artists: </p>
          {artistList}
        </body>
      </html>
    );
  }
}

module.exports = Artists;