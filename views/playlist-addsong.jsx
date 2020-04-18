var React = require('react');

class PlaylistAdd extends React.Component {
  render() {
    const playlist = this.props.playlist;
    const songs = this.props.songList;

    const options = songs.map(song => {
        return (
            <option>{song.title}</option>
            );
    })

    return (
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css"/>
      </head>
      <body>
      <h3>Add Songs To Playlist</h3>
      <form method="POST" action="/playlists">
      <h4>Name</h4>
      <p>{playlist.name}</p>
      <h4>Add Songs</h4>
      <select className="selectpicker" multiple data-live-search="true" name="songs">
      {options}
      </select>
      <br/><br/>
      <input type='submit' value='Submit'/>
      </form>

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
      </body>
      </html>
      );
}
}

module.exports = PlaylistAdd;