var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <body>
        <h1>Add New Artist</h1>
          <h3>
          <form method="post" action="/artists" >
            <p>Artist Name: </p><input type="text" name="name" />
            <p>Nationality: </p><input type="text" name="nationality" />
            <p>Image URL: </p><input type="text" name="url" />
            <br/><input type="submit" value="Submit" />
          </form>
          </h3>
        </body>
      </html>
    );
  }
}

module.exports = New;
