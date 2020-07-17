var React = require("react");

class Home extends React.Component {
  render() {
    const artistList = this.props.artists.map(artist =>
        <div key={artist.name} className="artist">
            <p className="artist-id">{artist.id}</p>
            <p className="artist-name">{artist.name}</p>
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

module.exports = Home;