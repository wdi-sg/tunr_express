var React = require("react");

class editArtist extends React.Component {
  render() {

    const artist = this.props.artist[0];
    const id = artist.id;
    const name = artist.name;
    const nationality = artist.nationality;
    const url = artist.photo_url;
    const putPath = `/artists/${id}?_method=PUT`;

    return (
      <html>
        <body>
        <h1>Edit Artist</h1>
          <h3>
          <form method="post" action={putPath} >
            <p>Artist Name: </p><input type="text" name="name" value={name} />
            <p>Nationality: </p><input type="text" name="nationality" value={nationality} />
            <p>Image URL: </p><input type="text" name="url" value={url} />
            <br/><input type="submit" value="Submit" />
          </form>
          </h3>
        </body>
      </html>
    );
  }
}

module.exports = editArtist;
