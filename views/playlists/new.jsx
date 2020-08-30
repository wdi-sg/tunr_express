var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add new playlist</h3>
          <form method="POST" action="/playlists">
                Playlist ID: <input type="text" name="id"/>
                <br/>
                Playlist Name: <input type="text" name="name"/>
                <br/>
                <input type="submit" value="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;