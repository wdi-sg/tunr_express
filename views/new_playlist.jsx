var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form method="POST" action="/new">
            <p>Name:
              <input type="text" name="artistName"></input>
            </p>
            <p>Photo:
              <input type="text" name="photoUrl"></input>
            </p>
            <p>Nationality:
              <input type="text" name="nationality"></input>
              <input type="submit"></input>
            </p>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
