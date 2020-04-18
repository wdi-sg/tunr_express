var React = require("react");

class EditArtist extends React.Component {
  render() {
    const artist = this.props.artist;

    return (
      <html>
        <head />
        <body>
          <h3>Edit Artist</h3>
          <form method='PUT' action={`/artists/${artist.id}?method_put`}>
            <h4>Name</h4>
            <input type='text' name='name' value={artist.name}/>
            <h4>Photo URL</h4>
            <input type='text' name='photo_url' value={artist.photo_url}/>
            <h4>Nationality</h4>
            <input type='text' name='nationality' value={artist.nationality}/>
            <br/><br/>
            <input type='submit' value='Submit'/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = EditArtist;