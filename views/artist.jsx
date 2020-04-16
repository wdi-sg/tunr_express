var React = require("react");

class Artist extends React.Component {
  render() {
    const artist = this.props.artist;
    console.log(artist.photo_url)

    return (
      <html>
        <head />
        <body>
          <h3>Presenting...</h3>
          <img src={artist.photo_url} style={{"width": "150px"}}/>
          <h4>Name</h4>
          <p>{artist.name}</p>
          <h4>Nationality</h4>
          <p>{artist.nationality}</p>
        </body>
      </html>
    );
  }
}

module.exports = Artist;