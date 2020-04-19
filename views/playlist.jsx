var React = require("react");

class Playlist extends React.Component {
  render() {

    const playlist = this.props.foundPlaylist;

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
          <div className="artist">
            <h1>
              {playlist.id}) {playlist.name}
            </h1>

            <a href={`/playlists/${playlist.id}/edit`}>
              <button className="btn btn-warning">Edit Playlist</button>
            </a>
            <form method="post" action={`/songs/${playlist.id}?_method=delete`}>
              <button type="submit" className="btn btn-danger">
                Delete Playlist
              </button>
            </form>

            <a href="/playlists">
              <button className="btn btn-primary">Back To Playlists</button>
            </a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;
