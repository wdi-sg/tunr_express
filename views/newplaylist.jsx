var React = require("react");

class Newplaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>New Playlist</h1>
          <form action="/playlists/show" method="post">
            <input type="text" name="playlist" placeholder="playlist name"></input>
            <input type="submit" value="Get Playlist!"></input>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Newplaylist;