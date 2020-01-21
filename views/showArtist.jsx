var React = require("react");

class showArtist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Name</h3>{this.props.name}
          <h3>Photo URL</h3>{this.props.photo_url}
          <h3>Nationality</h3>{this.props.nationality}
        </body>
      </html>
    );
  }
}

module.exports = showArtist;