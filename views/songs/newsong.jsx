var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>New Song</h3>
          <form method ="POST" action="../students">
            <label htmlFor ="title">Title</label><br/>
            <input type="text" name="title"/><br/><br/>
            <label htmlFor ="album">Album</label><br/>
            <input type="text" name="album"/><br/><br/>
            <label htmlFor ="preview_link">Preview Link</label><br/>
            <input type="text" name="preview_link"/><br/><br/>
            <label htmlFor ="artwork">Artwork Link</label><br/>
            <input type="text" name="artwork"/><br/><br/>
            <label htmlFor ="artist_id">Artist Name</label><br/>
            <input type="text" name="artist_id"/><br/><br/>
            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
