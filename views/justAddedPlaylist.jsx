var React = require("react");

class JustAddedPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>You have just added this playlist:</h3>
          <p>{this.props.justAddedPlaylist.name}</p>
        </body>
      </html>
    );
  }
}

module.exports = JustAddedPlaylist;
