var React = require("react");

class NewArtistSong extends React.Component {
  render() {


    return (
      <html>
        <head/>
        <body>
          <h2>Homepage</h2>
          <a href="/artist">Artists</a><br/>
          <a href="/song">Songs</a><br/>
          <a href="/playlist">Playlist</a><br/>
        </body>
      </html>
    );
  }
}

module.exports = NewArtistSong;
