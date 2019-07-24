var React = require("react");

class Artist extends React.Component {
  render() {

    let artist = this.props.artist;

    return (
      <html>
        <head />
        <body>
          <h1>Artist Name: {artist.name}</h1>
          <img src={artist.photo_url}/>
          <h3>Artist Nationality: {artist.nationality}</h3>
        </body>
      </html>
    );
  }
}

module.exports = Artist;