var React = require("react");

class Show extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Artist Information</h1>
          <p>{this.props.artistName}</p>
          <p>{this.props.photo}</p>
          <p>{this.props.nationality}</p>
          <footer>Number of visits to page: {this.props.count}</footer>
        </body>
      </html>
    );
  }
}

module.exports = Show;
