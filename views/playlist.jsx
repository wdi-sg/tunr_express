var React = require("react");

class Playlist extends React.Component {
  render() {

    const playlistData = this.props.playListData;
    const playlist = playlistData[0];
    const songsList = playlistData.map ( (song, index) => {
      if (!song.id) {
        return console.log(`There is no song id.`);
      } else {
        return (
          <tr key={index + 1}>
            <th scope="row">{index + 1}</th>
            <td>
              <a href={`/songs/${song.id}`}>{song.title}</a>
            </td>
            <td>{song.album}</td>
          </tr>
        );
      }
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
          <h1>
            {playlist.id}) {playlist.name}
          </h1>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Album</th>
              </tr>
            </thead>
            <tbody>{songsList}</tbody>
          </table>

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
        </body>
      </html>
    );
  }
}

module.exports = Playlist;
