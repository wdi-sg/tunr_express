var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Enter A New Artist</h1>
          <form method="POST" action="/">
            <p>Name:</p>
            <input type="text" name="name" autoComplete="off" />
            <p>Nationality:</p>
            <input type="text" name="nationality" autoComplete="off" />
            <p>Photo URL:</p>
            <input type="text" name="photo_URL" autoComplete="off" />
            <br/>
            <br/>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
