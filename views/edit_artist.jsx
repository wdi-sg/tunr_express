var React = require("react");

class EditArtist extends React.Component {
  render() {

    let {id, name, photo_url, nationality} = this.props[0];

    return (
      <html>
        <head />
        <body>

        <h2>Artist</h2>
        <h3>{name}</h3>
        <img src={photo_url} alt = {name} height = '300' width = '300'/>
        <h3>{nationality}</h3>

          <div>
            <h2>Edit Artist Information</h2>
            <form method = 'POST' action = {`/artists/${id}?_method=put`}>
              Artist Name: <input type='text' name='artistName'/><br/>
              Image URL: <input type='text' name='imageUrl'/><br/>
              Artist Nationality: <input type='text' name='artistNationality'/>
              <input type = "submit" value = "submit"/>
            </form>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = EditArtist;
