var React = require("react");

class NewFavorites extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>Input a song ID to favorite it!</h1>
          <form method="POST" action="/favorites">
              Song ID: <input type="text" name="songID" />
              <br />
              <input type="submit" value="Add to Favorite" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewFavorites;
