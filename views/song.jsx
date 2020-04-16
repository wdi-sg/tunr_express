var React = require("react");

class Song extends React.Component {
  render() {

    const song = this.props.songData;

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
              {song.id}) {song.title}
            </h1>
            <h2>
              Artist:{" "}
              <a href={`/artists/${song.artist_id}`}>{song.artist_name}</a>
            </h2>
            <h3>Album: {song.album}</h3>
            <p>
              <img src={song.artwork} />
            </p>
            <p>
              <a href={song.preview_link}>Preview Song</a>
            </p>

            <a href={`/songs/${song.id}/edit`}>
              <button className="btn btn-warning">Edit song</button>
            </a>
            <form method="post" action={`/songs/${song.id}?_method=delete`}>
              <button type="submit" className="btn btn-danger">
                Delete song
              </button>
            </form>

            <a href="/songs">
              <button className="btn btn-primary">Back To Songs</button>
            </a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Song;
