var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <form action="/artists" method="POST">
            <input type="text" name="name" placeholder="Name" />
            <br />
            <input type="text" name="photo_url" placeholder="Photo URL" />
            <br />
            <input type="text" name="nationality" placeholder="Nationality" />
            <br />
            <button type="submit">Add Artist</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
