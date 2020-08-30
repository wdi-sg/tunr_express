var React = require("react");

class Edit extends React.Component {
  render() {
    let { id, name, photo_url, nationality } = this.props
    return (
      <html>
        <head />
        <body>
          <h3>Edit Entry</h3>
          <form method="POST" action={`/artists/${id}?_method=put`}>
                Artist Name: <input type="text" name="name" placeholder={name}/>
                <br/>
                Photo URL: <input type="text" name="photo_url" placeholder={photo_url}/>
                <br/>
                Nationality: <input type="text" name="nationality" placeholder={nationality}/>
                <input type="submit" value="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;