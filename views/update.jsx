var React = require("react");

class New extends React.Component {
  render() {
        let {id,name} = this.props;
    return (
      <html>
        <head />
        <body>
          <h3>{name}</h3>
          <form method ="POST" action={`/artists/${id}?_method=put`}>
            <label for ="name">Name</label><br/>
            <input type="text" name="name"/><br/><br/>
            <label for ="photo_url">Photo Url</label><br/>
            <input type="text" name="photo_url"/><br/><br/>
            <label for ="nationality">Nationality</label><br/>
            <input type="text" name="nationality"/><br/><br/>
            <input type="submit" value="Update"/>
          </form>
        </body>
      </html>
    );
    }
}

module.exports = New;
