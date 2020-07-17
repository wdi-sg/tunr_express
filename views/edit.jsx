var React = require("react");

class Edit extends React.Component {
  render() {
    const {artist} = this.props;
    console.log(artist)
    return (
      <div>
        <form action={`/artists/${artist.id}?_method=put`} method="post" id="artist">
          <div>
            <label htmlFor="name">Artist name: </label>
            <input type="text" name="name" defaultValue={artist.name}/>
          </div>
          <div>
            <label htmlFor="img">Photo url: </label>
            <input type="text" name="photo_url" defaultValue={artist.photo_url}/>
          </div>
          <div>
            <label htmlFor="nationality">Nationality: </label>
            <input type="text" name="nationality" defaultValue={artist.nationality}/>
          </div>
        </form>
        <button type="submit" form="artist" value="submit">
            Edit
        </button>
        <form action={`/artists/${artist.id}?_method=delete`} method="post" id="artistDelete">
        </form>
        <button type="submit" form="artistDelete" value="submit">
            Delete
        </button>
      </div>
    );
  }
}

module.exports = Edit;
