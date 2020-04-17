var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
            <form method="POST" action="/artists">
                <p>Name
                <input type="text" name="name"/>
                </p>
                <p>Photo
                <input type="text" name="photo_url"/>
                </p>
                <p>Nationality
                <input type="text" name="nationality"/>
                </p>
                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;