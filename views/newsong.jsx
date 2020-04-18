var React = require("react");

class Newsong extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Add New Song</h1>
          <form action="/playlists/show" method="post">
            <input type="text" name="playlist" placeholder="playlist name"></input>
            <input type="submit" value="Get Playlist!"></input>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Newsong;