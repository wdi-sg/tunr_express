var React = require("react");

class addSong extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Adding songs to Playlist #{this.props.id}</h3>
          <h2>Playlist Name: {this.props.name}</h2>
          <form method="POST" action={"/playlists/" + this.props.id}>
          <div>Song ID: <input type="text" name="song_id"/></div>
          <br />
          <div><input type="submit" value="Submit"/></div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = addSong;