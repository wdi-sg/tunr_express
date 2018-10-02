var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>ADD NEW ARTIST</h1>
          <form method="POST" action="/artists">
            <p>Artist name</p>
            <input name="name"/>
            <p>Nationality</p>
            <input name="nationality"/>
            <p>Image link</p>
            <input name="photo_url"/>
            <p></p>
            <input type='submit' value="Submit"/>
          </form>
          <p></p>
          <form method="GET" action="/artists">
            <input type='submit' value="Back"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
