var React = require("react");

class ShowPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>{this.props.name}</h1>
        </body>
      </html>
    );
  }
}

module.exports = ShowPlaylist;
