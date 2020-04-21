var React = require("react");

class NewSong extends React.Component {
  render() {

    console.log(this.props.songs);
    const displaySongs = this.props.songs.map( song => {
        return <option value={song.id}>{song.title}</option>
    })



    return (
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>
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
         <footer className="home-footer">
                <p> No of visits: {this.props.cookieCount}</p>
                </footer>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;