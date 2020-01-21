var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <form action="/" method="POST">
          <h3>Name</h3><input name="name"></input>
          <h3>Photo URL</h3><input name="photo_url"></input>
          <h3>Nationality</h3><input name="nationality"></input>
          <div>
          <input type="submit"></input>
          </div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;