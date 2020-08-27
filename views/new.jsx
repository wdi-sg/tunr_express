var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form method="POST" action="/artists">
          <label>Artist Name: </label>
          <input type="text" name="artistName" /><br/><br/>
          <label>Artist Photo URL: </label>
          <input type="text" name="photoURL"/><br/><br/>
          <label>Artist Nationality: </label>
          <input type="text" name="nationality"/><br/><br/>
          <input type="submit"/>
          </form>
          <br/><br/>
          <button><a href="/artists/">Back to homepage</a></button>
        </body>
      </html>
    );
  }
}

module.exports = New;