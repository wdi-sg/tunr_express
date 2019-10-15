const React = require("react");

class Artists extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <img src={this.props.photo_url} alt={this.props.name} width="100" />
        <p>Nationality: {this.props.nationality}</p>
        <hr />
      </div>
    );
  }
}

module.exports = Artists;
