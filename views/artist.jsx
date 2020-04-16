var React = require("react");

class Artist extends React.Component {
  render() {

    const artist = this.props.artistData;

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
              {artist.id}) {artist.name}
            </h1>
            <img src={artist.photo_url}></img>
            <p>Nationality: {artist.nationality}</p>

            <p><a href={`/artists/${artist.id}/songs`}>View All Songs</a></p>

            <a href={`/artists/${artist.id}/edit`}>
              <button className="btn btn-warning">Edit Artist</button>
            </a>
            <form method="post" action={`/artists/${artist.id}?_method=delete`}>
              <button type="submit" className="btn btn-danger">
                Delete Artist
              </button>
            </form>

            <a href="/artists">
              <button className="btn btn-primary">Back To Artists</button>
            </a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artist;
