var React = require("react");

class ArtistsShow extends React.Component {
  render() {
    const link = `/artists/${this.props.id}/edit`;
    return (
      <html>
        <head />
        <body>
          <h1>{this.props.name}</h1>
          <a href={link}>Edit</a>
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
