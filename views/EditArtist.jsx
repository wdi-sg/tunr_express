const React = require("react");

class EditArtist extends React.Component {
  render() {
    const { name, nationality, photo_url } = this.props.artist;
    return (
      <div>
        <h1>edit artist: {name}</h1>
        <form action={`/artists/${this.props.id}?_method=put`} method="POST">
            <input type="text" name="name" defaultValue={name}/><br/>
            <input type="text" name="nationality" defaultValue={nationality}/><br/>
            <input type="text" name="photo_url" defaultValue={photo_url} style={{width: "500px"}}/><br/>
            <input type="submit" value="edit artist"/>
        </form>
      </div>
    );
  }
}

module.exports = EditArtist;
