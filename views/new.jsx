var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create A New Artist</h3>
          <form method="POST" action="/artists">
          Name: <input type="text" name="name"/><br />
          Photo URL: <input type="text" name="photo_url"/><br />
          Nationality: <input type="text" name="nationality"/><br />
          <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;