var React = require('react');
class Playlists extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1> {this.props.name}</h1>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlists;