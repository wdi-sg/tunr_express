var React = require("react");

class NewSongs extends React.Component {
  render() {
    let artists = this.props.rows
    let artistOptionHTML = artists.map((item)=>{
        return <option value={item.id}>{item.name}</option>
    })
    return (
      <html>
        <head />
        <body>
          <form method="POST" action="/songs">
          <label>Song Title: </label>
          <input type="text" name="songTitle" /><br/><br/>

          <label>Album: </label>
          <input type="text" name="album"/><br/><br/>

          <label>Preview Link: </label>
          <input type="text" name="previewLink"/><br/><br/>

          <label>Artwork: </label>
          <input type="text" name="artwork"/><br/><br/>

          <label>Artist: </label>
          <select name="artistID">
          {artistOptionHTML}
          </select>
          <p> If artist is not present, add a new artist <a href="/artists/new">here</a></p>

          <input type="submit"/>
          </form>
          <br/><br/>
          <button><a href="/songs/">Back to homepage</a></button>
        </body>
      </html>
    );
  }
}

module.exports = NewSongs;