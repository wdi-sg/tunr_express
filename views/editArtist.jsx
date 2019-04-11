var React = require("react");

class editArtist extends React.Component {
  render() {

    const artist = this.props.artist[0];
    const id = artist.id;
    const name = artist.name;
    const nationality = artist.nationality;
    const url = artist.photo_url;
    const putPath = `/artists/${id}/?_method=PUT`;


    return (
      <html>
        <head />
        <body>
          <h3>Edit an Artist in TUNR!</h3>
          <form method="POST" action={putPath}>
                Artist Name: <input name="name" type="text" defaultValue={artist.name}/><br/>
                <br/>
                Photo: <input name="url" type="text" defaultValue={artist.photo_url}/><br/>
                <br/>
                Nationality: <input name="nationality" type="text" defaultValue={artist.nationality}/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = editArtist;