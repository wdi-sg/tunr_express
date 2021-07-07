var React = require('react');
class Artists extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1> {this.props.name}</h1>
            <p>{this.props.photo_url}</p>
            <p>{this.props.nationality}</p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artists;