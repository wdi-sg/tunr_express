var React = require("react");

class Playlist extends React.Component {
  render() {
    return (
      <html>
        <body>
        <h1>New Playlist</h1>
        <form action="/playlist" method="POST">
        <p>Name :</p><input type="text" name="name" required/><br/>
        <br/><input type="submit" value="Submit"/>
        </form>
        </body>
      </html>
    )
  }
}

module.exports = Playlist;