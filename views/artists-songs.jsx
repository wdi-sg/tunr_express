var React = require("react");

class ArtistSongs extends React.Component {
  render() {
    const info = this.props.songs;
    const songsList = info.map(song => {
      return (
        <li key={song.id}>
          <a href={`/songs/${song.id}`}>{song.title}</a>
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

          <a href={`/artists/${info[0].artist_id}/songs/new`}>
            <button className="btn btn-success">Add A Song for This Artist</button>
          </a>
          <h1>List of Songs by {info[0].artist_name}</h1>
          <ul>{songsList}</ul>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
