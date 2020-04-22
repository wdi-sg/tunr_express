var React = require("react");

class Playlists extends React.Component {
  render() {
    const playlist = this.props.playlist;
    const songs = this.props.songs;

    const listItems = songs.map(song => {
        return <li>{song.title}</li>;
    });

    return (
      <html>
        <body>
          <p>{playlist.name}</p>
          <ol>
          {listItems}
          </ol>
        </body>
      </html>
    );
  }
}

module.exports = Playlists;