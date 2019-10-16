var React = require("react");

class Newlistsong extends React.Component {
  render() {
    let formAction = '/playlists/' + this.props.id + '/newsong';
    let song = this.props.songs.map(song => {
        return ( <option value={song.id}>{song.title}</option> );
    });
    return (
      <html>
        <head />
        <body>
            <h3>Add Song to Playlist {this.props.id}</h3>
            <form method="POST" action={formAction}>
                Song: <select name="song_id">
                    {song}
                </select>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Newlistsong;