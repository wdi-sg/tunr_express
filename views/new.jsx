var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!
          <form method='POST' action='/newArtist'>

          <input type="text" name="name" placeholder ="name"/>
          <input type="text" name="photo_url" placeholder="Photo url"/>
          <input type="text" name="nationality" placeholder = "nationality"/>

          <input type="submit"/>
          </form>

          </h3>
        </body>
      </html>
    );
  }
}

module.exports = New;
