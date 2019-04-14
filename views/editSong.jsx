var React = require("react");

class editSong extends React.Component {
  render() {

    const song = this.props.song[0];
    const id = song.id;
    const title = song.title;
    const album = song.album;
    const artwork = song.artwork
    const preview_link = song.preview_link;
    const artist_id = song.artist_id;
    const putPath = `/songs/${id}/?_method=PUT`;


    return (
      <html>
        <head />
        <body>
          <h3>Edit a Song in TUNR!</h3>
          <form method="POST" action={putPath}>
                <b>Artwork:</b><input name="artwork" type="text" defaultValue={artwork}/><br/>
                <br/>
                <b>Song Title:</b><input name="title" type="text" defaultValue={title}/><br/>
                <br/>
                <b>Album:</b><input name="album" type="text" defaultValue={album}/><br/>
                <br/>
                <b>Preview Link:</b><input name="preview_link" type="text" defaultValue={preview_link}/><br/>
                <br/>
                <b>Artist ID:</b><input name="artist_id" type="text" defaultValue={artist_id}/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = editSong;