var React = require("react");

class NewPlaylistSong extends React.Component {
  render() {
    const name = this.props.playlistInfo.name;
    const addSongLink = "/playlist/" + this.props.playlistInfo.id;
    const songOptionElements = this.props.songInfoArray.map(song => {
        return <option value={song.songid}>Song: {song.songtitle} &nbsp; || &nbsp; Artist: {song.artistname}  &nbsp;  ||  &nbsp; Album: {song.albumname}</option>
    })

    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h3 className = "container">Add a song from your library to the playlist:</h3>
            <h1 className = "container">"{name}"</h1>
            <br />
            <form method="POST" action={addSongLink} className = "container">
                <div className="form-group">
                    <select className="form-control form-control-sm" name="songid">
                        {songOptionElements}
                    </select>
                </div>
              <button type="submit" value="Submit" className="btn btn-primary">Add</button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylistSong;