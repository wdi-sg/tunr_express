var React = require("react");

class NewSong extends React.Component {
  render() {
    let url = "/artist/" + this.props.idKey + "/songs";
    console.log("url:", url);
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <h1>Add New Song!</h1>
              <form method="POST" action={url}>

               <p>Artist Id: </p>
                <input className="artist-id" type="number" name="artist_id" placeholder="choose artist" />

                <p>Song Title: </p>
                <input className="song-title" type="text" name="title" placeholder="enter song title" />

                 <p>Album: </p>
                <input className="song-album" type="text" name="album" placeholder="enter album title" />

                <p>Preview Link </p>
                <input className="song-preview-link" type="text" name="preview_link" placeholder="enter song preview link" />

                <p>Artwork </p>
                <input className="song-artwork" type="text" name="artwork" placeholder="enter song artwork image link" />

                <input className="submit-btn" type="submit" value="Add" />
              </form>

        </body>
      </html>
    );
  }
}

module.exports = NewSong;