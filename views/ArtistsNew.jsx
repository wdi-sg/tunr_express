const React = require('react');

class ArtistsNew extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>New Artist</h1>
          <form method="POST" action="/artists">
            <p>Name</p>
            <input type="text" name="name" required />
            <p>Photo URL</p>
            <input type="url" name="photoUrl" required />
            <p>Nationality</p>
            <input type="text" name="nationality" required />
            <br /><br />
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ArtistsNew;
