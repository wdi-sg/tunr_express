var React = require("react");

class EditSong extends React.Component {
  render() {

    let {id, title, album, preview_link, artwork} = this.props[0];

    return (
      <html>
        <head />
        <body>

        <h2>Song</h2>
        <h3>{title}</h3>
        <h3>{album}</h3>
        <h3>{preview_link}</h3>
        <h3>{artwork}</h3>

          <div>
            <h2>Edit Song Information</h2>
            <form method = 'POST' action = {`/songs/${id}?_method=put`}>
            Song Title: <input type='text' name='title'/><br/>
              Album Name: <input type='text' name='album'/><br/>
              Preview Link: <input type='text' name='preview_link'/><br/>
              Album Artwork: <input type='text' name='artwork'/><br/>
              <input type = "submit" value = "submit"/>
            </form>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = EditSong;
