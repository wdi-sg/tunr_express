var React = require("react");

class Newlistsong extends React.Component {
  render() {
    let formAction = '/playlists/' + this.props.id + '/newsong';
    return (
      <html>
        <head />
        <body>
            <h3>Add Song to Playlist {this.props.id}</h3>
            <form method="POST" action={formAction}>
                Song ID: <input type="number" name="song_id" min="1" required/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Newlistsong;