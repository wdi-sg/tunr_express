var React = require("react");

class Song extends React.Component {
  render() {
        let song=this.props.song;
        console.log(song);
    return (
      <html>
        <head />
        <body>
            <p><b>Title: {song.title}</b></p>
            <p>Album: {song.album}</p>
            <p>Preview Link: {song.preview_link}</p>
            <br />
        </body>
      </html>
    );
  }
}

module.exports = Song;

