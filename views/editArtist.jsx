var React = require("react");

class EditArtist extends React.Component {
  render() {
    var url = "/artists/"+this.props.artist.id + "?_method=PUT";

    return (
      <form action={url} method="POST">
        <label>Name</label><br/>
        <input type="text" name="name" value={this.props.artist.name}/><br/>
        <label>Photo URL</label><br/>
        <input type="text" name="photo_url" value={this.props.artist.photo_url}/><br/>
        <label>Nationality</label><br/>
        <input type="text" name="nationality"/ value={this.props.artist.nationality}><br/>
        <input type="submit" value="Update Changes"/>
      </form>

    );
  }
}

module.exports = EditArtist;
