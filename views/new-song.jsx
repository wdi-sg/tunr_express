var React = require("react");

class NewSong extends React.Component {
  render() {

    console.log(this.props.songs);
    const displaySongs = this.props.songs.map( song => {
        return <option value={song.id}>{song.title}</option>
    })



    return (
      <html>
        <head />
        <body>
        <div>
        <form method="POST" action="/playlists/newsong">
        <input name="playlist_id" type="hidden" value={this.props.playlistIndex} />
         <h1>Playlist Title: {this.props.playlistTitle}</h1>
          <h2>Add a song to this playlist</h2>
          <p>
          <select name="song_id">
          {displaySongs}
          </select>
          </p>
          <button type="submit">Add Song</button>
          </form>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = NewSong;