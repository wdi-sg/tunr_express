var React = require("react");

class Update_song extends React.Component {
  render() {
    let {id, title, album, preview_link, artwork, artist_id} = this.props[0];
    return (
      <html>
        <head />
        <body>
          <h2>Edit this song</h2>
          <div>
            <h2>{title}</h2>
            <img src={artwork} alt="song artwork" width="75"/>
            <div>Album: {album}</div>
            <div>Artist ID: {artist_id}</div>
            <div><audio controls><source src={preview_link} type="audio/mpeg/m4a"/></audio></div>
            <br/>
            <br/>
          </div>
          <div>
            <form method="POST" action={`/artists/${id}?_method=PUT`}>
              Title: <input type="text" name="title" id="title"/>
              <br/>
              Album: <input type="text" name="album" id="album"/>
              <br/>
              Preview_link: <input type="text" name="preview_link" id="preview_link"/>
              <br/>
              Artwork: <input type="text" name="artwork" id="artwork"/>
              <br/>
              Artist ID: <input type="text" name="artist_id" id="artist_id"/>
              <br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Update_song;
