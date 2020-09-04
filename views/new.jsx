var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

          <div>
            <h2>Input A New Artist</h2>
            <form method = 'POST' action = '/artists'>
              Artist Name: <input type='text' name='artistName'/><br/>
              Image URL: <input type='text' name='imageUrl'/><br/>
              Artist Nationality: <input type='text' name='artistNationality'/><br/>
              <input type = "submit" value = "submit"/>
            </form>

            <h2>Input A New Song</h2>
            <form method = 'POST' action = '/songs'>
              Song Title: <input type='text' name='title'/><br/>
              Album Name: <input type='text' name='album'/><br/>
              Preview Link: <input type='text' name='preview_link'/><br/>
              Album Artwork: <input type='text' name='artwork'/><br/>
              Artist Name: <input type='text' name='artistName'/><br/>
              <input type = "submit" value = "submit"/>
            </form>

            <h2>Create A New Playlist</h2>
            <form method='POST' action ='/playlists'>
              Playlist Name: <input type ='text' name='name'/><br/>
              <input type = "submit" value = "submit"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
