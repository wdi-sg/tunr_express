var React = require("react");

class Artist extends React.Component {
  render() {
    const artistList = this.props.artists.map(artist =>
        <div key={artist.name} className="artist">
            <img className="artist-photo" src={artist.photo_url} />
            <p className="artist-id">{artist.id}</p>
            <p className="artist-name">{artist.name}</p>
            <p className="artist-nat">{artist.nationality}</p>
        </div>
        );
    return (
      <html>
        <head />
        <body>
        <div className="container">
            <div className="row">
                <div className="col">
                  <h1>Welcome!</h1>
                  {artistList}
                </div>
            </div>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = Artist;