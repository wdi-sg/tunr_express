var React = require("react");

class Artists extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>You have just added this artist:</h3>
          <h4>{this.props.artist.name}</h4>
          <h5>Artist's photo: </h5>
          <p>{this.props.artist.photo_url}</p>
          <h5>Artist's Nationality: </h5>
          <p>{this.props.artist.nationality}</p>
          <footer>Number of visits: {this.props.counter}</footer>
        </body>
      </html>
    );
  }
}

module.exports = Artists;
