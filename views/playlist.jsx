var React = require("react");

class Playlist extends React.Component {
  render() {

  let url = `/playlist/`;

    return (
      <html>
        <head />
        <body>
          <h3>New Playlist!</h3>
            <form method="POST" action={url}>
              <p>ID: </p>
              <input name = "name" type = "text"/>
              <input type="submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = Playlist;