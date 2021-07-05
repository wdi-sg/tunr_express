var React = require("react");

class Newplaylist extends React.Component {
  render() {
    return (
      <html>
        <body>
            <form method="POST" action="/playlist">
              <h3>Create a new playlist🎤</h3>
                NAME: <input type="text" name="name"/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Newplaylist;