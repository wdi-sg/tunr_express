var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
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
          </div>

        </body>
      </html>
    );
  }
}

module.exports = New;
