var React = require("react");

class ArtistSongs extends React.Component {
  render() {

    const songByArtist = this.props.artistSongs.map((individualArtistSongs) => (
            <div>
                <li>Song Title: {individualArtistSongs.title}</li>
                <p>Album: {individualArtistSongs.album}</p>
            </div>
        )
    );

    return (
      <html>
        <head />
        <body>
          <h1>Songs by the Artist: {this.props.artistName[0].name}</h1>
          <ul>
              {songByArtist}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
