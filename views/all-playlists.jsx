var React = require("react");

class AllPlaylists extends React.Component {
  render() {

    const playlistArr = this.props.playlists;
    const playlistLinks = playlistArr.map((playlist) => {
      return (
        <li key={playlist.id}>
          <a href={`/artists/${playlist.id}`}>{playlist.name}</a>
        </li>
      );
    });

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

          <a href="/playlists/new">
            <button className="btn btn-light">Add A Playlist</button>
          </a>
          <h1>All Playlists</h1>
          <ul>{playlistLinks}</ul>
        </body>
      </html>
    );
  }
}

module.exports = AllPlaylists;
