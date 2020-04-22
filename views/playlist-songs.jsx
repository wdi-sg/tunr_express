var React = require("react");

class PlaylistSongs extends React.Component {
  render() {

    console.log(this.props.songsByPlaylist);
    const songs = this.props.songsByPlaylist.map( song=> {
        return <li class="list-group-item">{song.title}</li>
    })

    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css"/>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>

        <body>
          <div class="jumbotron">
              <h1 className="display-4">Playlist Title: {this.props.playlistName}</h1>

        </div>
            <ul class="list-group">
                {songs}
            </ul>
        </body>
      </html>
    );
  }
}

module.exports = PlaylistSongs;