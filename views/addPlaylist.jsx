var React = require('react');

class addPlaylist extends React.Component {
  render() {

    return (
      <html>
        <body>
          <div>
            <h1>Adding new playlist</h1>
            <form action="/playlists" method="POST">
                Enter Playlist Information Here:
                <br></br>
                <input type="text" name="name" placeholder="playlist name"/>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = addPlaylist;