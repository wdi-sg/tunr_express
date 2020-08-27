var React = require("react");

class Song extends React.Component {
  render() {
        let song = this.props.rows[0]
        let editFormURL="/songs/"+song.id+"/edit"
        let artistURL = "/artists/" + song.artist_id + "/"

    return (
      <html>
        <head />
        <body>
          <h1>{song.title} by <a href={artistURL}>{song.artist_name}</a></h1>
          <a href={editFormURL}><button>Edit this Song!</button></a><br/>
          <img src={song.artwork}/><br/>
          <p>Album: {song.album}</p>
          <p><a href={song.preview_link}>Song Preview</a></p>

          <a href="/songs/"><button>Back to songs</button></a>

        </body>
      </html>
    );
  }
}

module.exports = Song;