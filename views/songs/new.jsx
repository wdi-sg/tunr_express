var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add new song</h3>
          <form method="POST" action="/songs">
                Title: <input type="text" name="title"/>
                <br/>
                Album: <input type="text" name="album"/>
                <br/>
                Preview Link: <input type="text" name="preview_link"/>
                <br/>
                Artwork URL: <input type="text" name="artwork"/>
                <br/>
                Artist ID: <input type="text" name="artist_id"/>
                <input type="submit" value="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;