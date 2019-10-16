var React = require("react");

class Newlist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Add Playlist</h3>
            <form method="POST" action="/playlists/new">
                Name: <input type="text" name="name" required/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Newlist;