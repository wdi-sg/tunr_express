var React = require("react");
class Newplaylist extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/playlist">
                  <p>Playlist Name:</p>
                  <input type="text" name="name"/>
                  <p><button type="submit">Submit</button></p>
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Newplaylist;
