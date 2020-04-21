var React = require("react");

class Favorites extends React.Component {
  render() {
    let allSongs = this.props.songs.map(song => {
        return <li>{song.title}</li>
    });
    return (
      <html>
        <head />
        <body>
          <h1>All favorite songs: </h1>
          <ul>
            {allSongs}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Favorites;