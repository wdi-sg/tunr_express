var React = require("react");

class AddToPlaylist extends React.Component {
  render() {

    const songs = this.props.songs
    const playlist = this.props.playlist

    const songsList = songs.map(song=> {
      return (
        <option key={song.id} value={song.id}>{song.title}</option>
      )
    })

    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <a href="/">
            <button className="btn btn-primary">Back To Home</button>
          </a>
          <h3>Adding to Playlist '{playlist.name}'</h3>
          <form action={`/playlists/${playlist.id}`} method="post">

          <select name="songs">
            <option>Add Songs...</option>
            {songsList}
          </select>

            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = AddToPlaylist;
