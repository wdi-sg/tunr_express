var React = require("react");

class ArtistEdit extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <p> Edit Artist </p>
            <form method="post" action="/artist/edit">

            <label for="id">Id</label>
            <input type="text" name="id"/>

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

module.exports = ArtistEdit;