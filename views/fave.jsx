var React = require("react");

class Fave extends React.Component {
  render() {

  let url = `/favorites/`;

    return (
      <html>
        <head />
        <body>
          <h3>Favorite!</h3>
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

module.exports = Fave;