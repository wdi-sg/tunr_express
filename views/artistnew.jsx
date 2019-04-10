var React = require("react");

class ArtistNew extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <p> Create New Artist </p>
            <form method="post" action="/artist/new">
            <label for="id">Name</label>
            <input type="text" name="name"/>

            <label for="id">Nationality</label>
            <input type="text" name="nationality"/>

            <label for="id">Photo URL</label>
            <input type="text" name="photo_url"/> <br/>

            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ArtistNew;