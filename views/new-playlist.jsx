var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <form action="/playlist" method="POST">
            <input type="text" name="name" placeholder="Playlist name"/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;
