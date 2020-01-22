var React = require("react");

class NewSongForArtist extends React.Component {
  render() {
    const id = this.props.artist.id
    const actionURL = "/artists/"+id+"/songs/"

    return (
      <html>
        <head />
        <body>
            <h1>{this.props.artist.name} - New Song!</h1>
        <form action={actionURL} method="POST">
            <input type="text" name="title" placeholder="title"/>
            <input type="text" name="album" placeholder="album"/>
            <input type="text" name="preview_link" placeholder="preview_link"/>
            <input type="text" name="artwork" placeholder="artwork"/>
            <input type="text" name="artist_id" value={this.props.artist.id} readOnly/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewSongForArtist;
