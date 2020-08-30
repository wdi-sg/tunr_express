var React = require("react");

class Delete extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Delete Song Entry</h3>
          <form method="POST" action="/songs/delete/?_method=delete">
                Song ID: <input type="text" name="id" placeholder="Input ID of song entry to delete"/>
                <input type="submit" value="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;