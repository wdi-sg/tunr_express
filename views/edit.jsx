var React = require("react");

class Edit extends React.Component {
  render() {


    let artist = this.props.artist;
    let url = `/artists/${artist.id}?_method=PUT`;
    console.log('url', url)
    console.log(artist);

    return (
      <html>
        <head />
        <body>
          <h3>Edit Artist!</h3>
            <form method="POST" action={url}>
              <p>ID: </p>
              <input name="id" defaultValue ={artist.id}/><br/>
              <p>Name: </p>
              <input name="name" defaultValue ={artist.name}/><br/>
              <p>Photo_URL: </p>
              <input name="photo" defaultValue ={artist.photo}/><br/>
              <p> Nationality: </p>
              <input name="nationality" defaultValue ={artist.nationality}/><br/>
              <input type="submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = Edit;