var React = require("react");

class ArtistNewSong extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>New Song by the Artist: {this.props.artistName[0].name}</h1>
          <form action={"/artists/" + this.props.artistName[0].id + "/songs"} method="POST">
              Song Title: <input type="text" name="songTitle" />
              <br />
              Album: <input type="text" name="album" />
              <br />
              Preview Link: <input type="text" name="previewLink" />
              <br />
              Artwork: <input type="text" name="artwork" />
              <br />
              <input type="submit" value="Add New Song" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ArtistNewSong;
