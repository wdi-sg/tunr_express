var React = require("react");

class Home extends React.Component {
  render() {
        // console.log('home.jsx')
    return (
      <html>
        <head />
        <body>
          <h1>Tunr Express</h1>
            <div>
                <a href="/artists">Artists</a>
            </div>
            <div>
                <a href="/songs">Songs</a>
            </div>
            <div>
                <a href="/playlists">My Playlist</a>
            </div>
        </body>
      </html>
    );
  }
}
module.exports = Home;
