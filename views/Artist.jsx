const React = require("react");

class Artist extends React.Component {
  render() {
    return (
      <div>
        <h3><a href={`/artists/${this.props.id}`}>{this.props.name}</a></h3>
        <img src={this.props.photo_url} alt={this.props.name} width="100" />
        <p>Nationality: {this.props.nationality}</p>
        <hr />
      </div>
    );
  }
}

module.exports = Artist;
