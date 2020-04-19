var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Let's add a playlist!</h1>
          <h2>Name of playlist: </h2>
          <form method="POST" action="/playlists/new">
          <input type="text" name="playlist" />
          <button type="submit">Add</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;