
var React = require("react");

class NewForm extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <h3>NEW ARTIST</h3>
          <form method="POST" action="/artist">
          <span>Artist name:</span><input type="text" name="name" value = " "/>
          <span>Photo:</span><input type="text" name="Photo_link" value = " "/>
          <span>Nationality:</span><input type="text" name="name" value = " "/>
          <input type="submit" value="Submit Artist"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewForm;