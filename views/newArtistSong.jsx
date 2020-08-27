var React = require("react");

class NewArtistSongs extends React.Component {
  render() {
    let artist = this.props.rows[0]

    return (
      <html>
        <head />
        <body>
        <h3>Add a new song for {artist.name}</h3>
          <form method="POST" action="/songs">

          <input type="hidden" name="artistID" value={artist.id}/>

          <label>Song Title: </label>
          <input type="text" name="songTitle" /><br/><br/>

          <label>Album: </label>
          <input type="text" name="album"/><br/><br/>

          <label>Preview Link: </label>
          <input type="text" name="previewLink"/><br/><br/>

          <label>Artwork: </label>
          <input type="text" name="artwork"/><br/><br/>


          <input type="submit"/>
          </form>
          <br/><br/>
          <button><a href="/songs/">Back to homepage</a></button>
        </body>
      </html>
    );
  }
}

module.exports = NewArtistSongs;