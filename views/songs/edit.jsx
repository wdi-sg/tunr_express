var React = require("react");

class Edit extends React.Component {
  render() {
    let { id, title, album, preview_link, artwork, artist_id } = this.props
    return (
      <html>
        <head />
        <body>
          <h3>Edit Entry</h3>
          <form method="POST" action={`/songs/${id}?_method=put`}>
                Title: <input type="text" name="title" placeholder={title}/>
                <br/>
                Album: <input type="text" name="album" placeholder={album}/>
                <br/>
                Preview Link: <input type="text" name="preview_link" placeholder={preview_link}/>
                <br/>
                Artwork URL: <input type="text" name="artwork" placeholder={artwork}/>
                <br/>
                Artist ID: <input type="text" name="artist_id" placeholder={artist_id}/>
                <br/>
                <input type="submit" value="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;