var React = require("react");

class SingleArtist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Artist's info:</h3>
          <p>Artist's Name: </p>
          <h4>{this.props.artistInfo.name}</h4>
          <p>Artist's photo: </p>
          <p>{this.props.artistInfo.photo_url}</p>
          <p>Artist's Nationality: </p>
          <p>{this.props.artistInfo.nationality}</p>
        </body>
      </html>
    );
  }
}

module.exports = SingleArtist;
