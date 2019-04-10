var React = require("react");


class ArtistSongNew extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <p> Create New Artist Song </p>
            <form method="post" action="/artist/:id/songs/new">
            <label for="id">title</label>
            <input type="text" name="title"/>

            <label for="id">Album</label>
            <input type="text" name="album"/>

            <label for="id">Preview Link</label>
            <input type="text" name="preview_link"/>


            <label for="id">Artwork</label>
            <input type="text" name="artwork"/>

            <label for="id">Artist Id</label>
            <input type="text" name="artist_id"/> <br/>

            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongNew;