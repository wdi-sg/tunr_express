const React = require('react');

class SongsShow extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>{this.props.title}</h1>
          <p>
            <strong>Album: </strong>
            {this.props.album}
          </p>
          <p>
            <a href={this.props.preview_link}>Preview link</a>
          </p>
          <img src={this.props.artwork} alt={this.props.title} />
        </body>
      </html>
    );
  }
}

module.exports = SongsShow;
