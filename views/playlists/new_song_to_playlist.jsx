var React = require("react");

class NewSongToPlaylist extends React.Component {
  render() {
      let id = this.props;
      // console.log(id);
    return (
      <html>
        <head />
        <body>
            <h2>Add New Song to Playlist</h2>
            <div>
                <form method="POST" action={`/playlist/${id.id}`}>
                    Song Name: <input type="text" name="title"/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = NewSongToPlaylist;