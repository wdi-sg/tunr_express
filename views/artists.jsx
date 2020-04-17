var React = require("react");

class Artists extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>You have just added this artist:</h3>
          <p>{this.props.artist.name}</p>
        </body>
      </html>
    );
  }
}

module.exports = Artists;
