var React = require("react");

class Edit extends React.Component {
  render() {
    let artist = this.props.rows[0]
    let putURL = "/artists/" + artist.id + "?_method=put"
    let deleteURL = "/artists/"+artist.id+"?_method=delete"
    return (
      <html>
        <head />
        <body>
          <form method="POST" action={putURL}>
          <label>Artist Name: </label>
          <input type="text" name="artistName" defaultValue={artist.name}/><br/><br/>
          <label>Artist Photo URL: </label>
          <input type="text" name="photoURL" defaultValue={artist.photo_url}/><br/><br/>
          <label>Artist Nationality: </label>
          <input type="text" name="nationality"defaultValue={artist.nationality}/><br/><br/>
          <input type="submit"/>
          </form>
          <br/><br/>
          <form method="POST" action={deleteURL}>
          <input type="submit" value="DELETE ARTIST"/>
          <p>Note: deleting this artist will delete all of their songs, too.</p>
          </form>
          <br/><br/>
          <button><a href="/artists/">Cancel (Back to homepage)</a></button>
        </body>
      </html>
    );
  }
}

module.exports = Edit;