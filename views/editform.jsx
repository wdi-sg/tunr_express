var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          <h1>Edit Artist!</h1>
          <form action="/artists" method="POST">
                        <p>Name Of Artist:</p>
                      <input type="text" name="name"/><br/>
                        <p>URL Of Photo:</p>
                      <input type="text" name="photo_url"/><br/>
                        <p>Nationality:</p>
                      <input type="text" name="nationality"/><br/>
                      <input type="submit" value="Submit" placeholder="Search!!"/>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
