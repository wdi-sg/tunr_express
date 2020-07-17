var React = require('react');
class addedPlaylist extends React.Component {
    render() {
        return (
            <html>
              <body>
                <div>
                <h3>New Playlist Added!</h3>
                <h3>Playlist Name:</h3>
                <h2>{this.props.name}</h2>
                </div>
              </body>
            </html>
          );
    }
}

module.exports = addedPlaylist;