var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <form action = "/playlists" method = "POST">
          PLAYLIST_NAME<br/><input name ="name"></input><br/>
          <input type="submit"></input>
          </form>
          </body>
      </html>
    );
  }
}

module.exports = New;