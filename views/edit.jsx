var React = require("react");

class Edit extends React.Component {
  render() {

    let artist = this.props.artists[0];
    let valueAttribute = `/artists/${artist.id}?_method=PUT`

    return (
      <html>
        <head />
        <body>
          <h3>Edit {artist.name}</h3>
            <form method="POST" action={valueAttribute}>
                Name <input type="text" name="name" defaultValue={artist.name}/>
                Photo <input type="text" name="photo_url" defaultValue={artist.photo_url}/>
                Nationality <input type="text" name="nationality" defaultValue={artist.nationality}/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;