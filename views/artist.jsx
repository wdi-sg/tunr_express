var React = require("react");

class Artist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h1>Artist</h1>
        <div key={this.props.artists.name} className="artist">
            <img className="artist-photo" src={this.props.artists.photo_url} />
            <p className="artist-name">{this.props.artists.name}</p>
            <p className="artist-nat">{this.props.artists.nationality}</p>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = Artist;