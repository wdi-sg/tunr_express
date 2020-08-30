var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h2>Add New Playlist</h2>
            <div>
                <form method="POST" action="/playlist">
                    Playlist Name: <input type="text" name="name"/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;