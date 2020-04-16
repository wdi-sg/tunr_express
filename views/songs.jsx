var React = require("react");

class Songs extends React.Component {
  render() {
    let allSongs = this.props.songs.map(song => {
        return <li>{song.title}</li>
    });
    return (
      <html>
        <head />
        <body>
          <h1>All songs for selected artist: </h1>
          <ul>
            {allSongs}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Songs;