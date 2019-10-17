var React = require('react');
class playlistSongs extends React.Component {
    render() {
        return (
            <html>
              <body>
                <div>
                <h3>Playlist Name:</h3>
                <h2>{this.props.name}</h2>
                <h3>Songs in playlist:</h3>
                <h2>{this.props.song_id}</h2>
                </div>
              </body>
            </html>
          );
    }
}

module.exports = playlistSongs;