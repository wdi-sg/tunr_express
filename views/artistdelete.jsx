var React = require("react");

class ArtistDelete extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <p> Delete Artist </p>
            <form method="post" action="/artist/delete">
            <label for="id">Id</label>
            <input type="text" name="id"/>
            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ArtistDelete;