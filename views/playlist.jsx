var React = require("react");

class Playlist extends React.Component {
  render() {
    const playlist = this.props.playlist;
    const songs = this.props.songs;

    const listItems = songs.map(song => {
        return <li>{song.title}</li>;
    });

    return (
      <html>
        <head />
        <body>
          <h3>Presenting...</h3>
          <h4>Name</h4>
          <p>{playlist.name}</p>
          <h4>Track List</h4>
          <ol>
          {listItems}
          </ol>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;