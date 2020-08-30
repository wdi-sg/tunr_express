var React = require("react");

class New extends React.Component {
  render() {
    let {title, album, preview_link, artwork, name, id} = this.props;
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <p>Display the form for editing a single new song</p>
          <form method="POST" action={`/songs/${id}?_method=put`}>
            Title: <input type="text" name="title" defaultValue={title}/>
            <br/>
            Album: <input type="text" name="album" defaultValue={album}/>
            <br/>
            Preview Link: <input type="text" name="preview_link" defaultValue={preview_link}/>
            <br/>
            Artwork: <input type="text" name="artwork" defaultValue={artwork}/>
            <br/>
            Artist name: <input type="text" name="artist_name" defaultValue={name}/>
            <br/>
            <input type="submit"/>
          </form>

          <form method="POST" action={`/songs/${id}?_method=delete`}>
            <input type="submit" value="DELETE"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;