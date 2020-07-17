var React = require("react");

class Songs extends React.Component {
  render() {
    const songList = this.props.songs.map(song =>
        <div key={song.title} className="songs">
            <img className="songs-photo" src={song.artwork} />
            <p className="song-title">Title: {song.title}</p>
            <p className="song-album">Album: {song.album}</p>
            <p className="song-preview-link">Preview Link: {song.preview_link}</p>
        </div>
        );
    return (
      <html>
        <head />
        <body>
        <h1>Songs by Artist </h1>
           {songList}
        </body>
      </html>
    );
  }
}

module.exports = Songs;