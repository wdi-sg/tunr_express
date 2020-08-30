var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>New Playlist</h3>
          <form method ="POST" action="../playlist">
            <label htmlFor ="title">Title</label><br/>
            <input type="text" name="name"/><br/><br/>
            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
