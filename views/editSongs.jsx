var React = require("react");

class EditSongs extends React.Component {
  render() {
    let allArtists = this.props["artists"]
    let song = this.props.rows[0]
    let artistOptionHTML = allArtists.map((item)=>{
        if(item.id===song.artist_id){
            return <option value={item.id} selected>{item.name}</option>
        }
        return <option value={item.id}>{item.name}</option>
    })
    let putURL = "/songs/" + song.id + "?_method=put"
    let deleteURL = "/songs/" + song.id + "?_method=delete"

    return (
      <html>
        <head />
        <body>
          <form method="POST" action={putURL}>
          <label>Song Title: </label>
          <input type="text" name="songTitle" defaultValue={song.title} /><br/><br/>

          <label>Album: </label>
          <input type="text" name="album" defaultValue={song.album}/><br/><br/>

          <label>Preview Link: </label>
          <input type="text" name="previewLink" defaultValue={song.preview_link}/><br/><br/>

          <label>Artwork: </label>
          <input type="text" name="artwork" defaultValue={song.artwork}/><br/><br/>

          <label>Artist: </label>
          <select name="artistID">
          {artistOptionHTML}

          </select>
          <p> If artist is not present, add a new artist <a href="/artists/new">here</a></p>

          <input type="submit"/>
          </form>
          <br/><br/>
          <form method="POST" action={deleteURL}>
          <input type="submit" value="DELETE SONG"/>
          </form>
          <br/><br/>
          <button><a href="/songs/">Back to homepage</a></button>
        </body>
      </html>
    );
  }
}

module.exports = EditSongs;