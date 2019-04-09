var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add artist</h3>
            <form method="POST" action="/new">
                Name <input type="text" name="name"/>
                Photo <input type="text" name="photo_url"/>
                Nationality <input type="text" name="nationality"/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;