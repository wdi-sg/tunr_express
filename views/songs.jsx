var React = require("react");

class Songs extends React.Component {
  render() {

    const songs = this.props.songs.map(song => {
        return <p>{song.title} — {song.album}</p>
    });

    return (
      <html>
        <head />
        <body>
            {this.props.artists.name}
            {songs}
        </body>
      </html>
    );
  }
}

module.exports = Songs;