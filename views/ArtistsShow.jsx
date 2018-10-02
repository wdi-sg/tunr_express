var React = require("react");

class ArtistsShow extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>{this.props.name}</h1>
          <p>
            <strong>Nationality: </strong>
            {this.props.nationality}
          </p>
          <img src={this.props.photo_url} alt={this.props.name} />
        </body>
      </html>
    );
  }
}

module.exports = ArtistsShow;
