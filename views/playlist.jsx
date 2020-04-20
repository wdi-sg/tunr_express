var React = require('react');

class Playlist extends React.Component {
  render() {
    const name = this.props.playlistInfo.name;
    const addSongLink = "/playlist/" + this.props.playlistInfo.id + "/newsong";
    const viewCount = this.props.visits;
    const playlistSongs = this.props.songInfo.map(song =>{
        return <li>Song: {song.title} &nbsp; || &nbsp; Artist: {song.name}  &nbsp;  ||  &nbsp; Album: {song.album}</li>
    })

    //const playlistLink = "/artists/" + this.props.id + "/songs";
    console.log(this.props.songInfo)
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h1 className = "container">Playlist Name: {name}</h1>
          </div>
          <div className = "container">
            <ol>{playlistSongs}</ol>
          </div>

          <form method="GET" action={addSongLink} className = "container">
                <button type="submit" className="btn btn-primary">Add a Song to Playlist</button>
          </form>
          <br />
          <h1>View Count: {viewCount}</h1>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;