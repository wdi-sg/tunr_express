var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create a new entry for a new artist</h3>
          <form method="POST" action="/artists">
                Artist Name: <input type="text" name="name"/>
                <br/>
                Photo URL: <input type="text" name="photo_url"/>
                <br/>
                Nationality: <input type="text" name="nationality"/>
                <input type="submit" value="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;