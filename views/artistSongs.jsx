var React = require("react");

class artistSongs extends React.Component {
  render() {
    let songs = this.props.songs;
    const listSongs = songs.map((song)=>{
        return <li>{song.title}</li>;
    });
    return (
      <html>
        <head />
        <body>
        <h1>List Of Songs</h1>
        <ul>
        {listSongs}
        </ul>
        </body>
      </html>
    );
  }
}

module.exports = artistSongs;