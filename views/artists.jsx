var React = require("react");

class Artists extends React.Component {
  render() {
    const artists = this.props.artists;

    const artistList = artists.map(artist => {
        return (
            <a href={`/artists/${artist.id}`}><h3>{artist.name}</h3></a>
            );
    })

    return (
      <html>
        <head />
        <body>
          <h1>All Artists</h1>
          {artistList}
        </body>
      </html>
    );
  }
}

module.exports = Artists;