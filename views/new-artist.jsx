var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create New Artists</h3>
          <form method='POST' action='/artists'>
            <p>Artist Name</p>
            <input type='text' name='name' placeholder="artist name"/>
            <p>Photo URL</p>
            <input type='text' name='photo_url' placeholder="photo"/>
            <p>Nationality</p>
            <input type='text' name='nationality' placeholder="nationality"/>
            <input type='submit' value='Submit'/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
