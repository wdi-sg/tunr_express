var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h2>New Artist</h2>

          <form method="POST" action="/artists">
             Name: <input type="text" name="name" required/><br/>
              Photo URL: <input type="url" name="photo_url" required/><br/>
              Nationality: <input type="text" name="nationality" required/><br/>
              <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
