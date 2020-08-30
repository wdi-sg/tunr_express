var React = require("react");

class Edit extends React.Component {
  render() {
    let {id, name, photo_url, nationality} = this.props;
    return (
      <html>
        <head />
        <body>
          <h1>Form Goes Here!</h1>
          <p>Display the form for editing a single artist</p>
          <form method="POST" action={`/artists/${id}?_method=put`}>
            Name: <input type="text" name="name" defaultValue={name}/>
            <br/>
            Photo: <input type="text" name="photo_url" defaultValue={photo_url}/>
            <br/>
            Nationality: <input type="text" name="nationality" defaultValue={nationality}/>
            <br/>
            <input type="submit" value="SUBMIT"/>
          </form>

          <form method="POST" action={`/artists/${id}?_method=delete`}>
            <input type="submit" value="DELETE"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;