var React = require("react");

class NewArtist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create New Artist</h3>
          <form action="/artists" method="POST">
              Name: <input type="text" name="artistName" />
              <br />
              Photo URL: <input type="text" name="photoURL" />
              <br />
              Nationality: <input type="text" name="nationality" />
              <br />
              <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewArtist;
