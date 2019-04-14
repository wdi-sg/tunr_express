var React = require("react");

class ArtistNewSong extends React.Component {
  render() {
    const obj = this.props.artist[0];
    const name = obj.name;
    const photo = obj.photo_url;
    const id = obj.id;
    const postPath = `/artists/${id}/songs`;
    return (
      <html>
        <head/>
        <body>
          <h3>Add a new Song for {name} to the TUNR!</h3>
          <img width="500px" height="500px" src={photo} alt="Photo of Artist" />

          <form method="POST" action={postPath}>
                Song Title: <input name="title" type="text" placeholder="Please Me"/><br/>
                <br/>
                Song Album: <input name="album" type="text" placeholder=" ... "/><br/>
                <br/>
                Song Artwork: <input name="artwork" type="text" placeholder="http:// ... .jpg"/><br/>
                <br/>
                Preview Link: <input name="preview_link" type="text" placeholder="http:// ... .mp3"/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = ArtistNewSong;