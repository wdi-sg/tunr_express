var React = require("react");

class NewSong extends React.Component {
  render() {
    const artists = this.props.artistsData;
    const song = this.props.songData
  
    const artistOptions = artists.map((artist) => {
      if (song.artist_id===artist.id) {
        return
      } else {
        return <option key={artist.id} value={artist.id}>{artist.name}</option>;
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
          <a href="/">
            <button className="btn btn-primary">Back To Home</button>
          </a>
          <h3>Creating A New Song</h3>
          <form action="/songs" method="post">
            <input value={song.title} name="title" placeholder="Song Title" />
            <input value={song.album} name="album" placeholder="Album" />
            <input
              value={song.preview_link}
              name="preview_link"
              placeholder="Preview Link"
            />
            <input value={song.artwork} name="artwork" placeholder="Artwork" />
            <select name="artistId">
              <option value={song.artist_id}>{song.artist_name}</option>
              {artistOptions}
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

module.exports = NewSong;
