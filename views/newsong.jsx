var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>New Song</h3>
          <form method ="POST" action="/songs">
            <label for ="title">Title</label><br/>
            <input type="text" name="title"/><br/><br/>
            <label for ="album">Album</label><br/>
            <input type="text" name="album"/><br/><br/>
            <label for ="preview_link">Preview Link</label><br/>
            <input type="text" name="preview_link"/><br/><br/>
            <label for ="artwork">Artwork Link</label><br/>
            <input type="text" name="artwork"/><br/><br/>
            <label for ="artist_id">Artist Name</label><br/>
            <input type="text" name="artist_id"/><br/><br/>
            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
