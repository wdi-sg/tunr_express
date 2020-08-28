var React = require("react");

class Delete extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Delete Artist</h3>
          <form method="POST" action="/delete/?_method=delete">
                Artist ID: <input type="text" name="id" placeholder="Input ID of artist to delete"/>
                <input type="submit" value="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;