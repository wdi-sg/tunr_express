var React = require("react");

class Artist extends React.Component {
  render() {
        let artist=this.props.artist;
        console.log(artist);
    return (
      <html>
        <head />
        <body>
            <img src={artist.photo_url} width="100px" height="100px" />
            <p>Name: {artist.name}</p>
            <p>Nationality: {artist.nationality}</p>
        </body>
      </html>
    );
  }
}

module.exports = Artist;
