var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form method="POST" action="/artists">
         Name: <input type="text" name="name" />
          <br /><br />
          Photo URL: <input type="text" name="photo_url" />
          <br /><br />
          Nationality: <input type="text" name="nationality" />
          <br /><br />
          <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;