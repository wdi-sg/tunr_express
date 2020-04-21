var React = require("react");

class addPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>Please enter a name for you new playlist!!</h1>
                <div>
                    <form action='/playlist' method="POST">
                        <p>
                            Playlist Name: <input name="playlistName" />
                        </p>
                        <input type="submit" value="Add this Playlist!!"></input>
                    </form>
                </div>
                <p>The number of page count is: {this.props.cookie}</p>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = addPlaylist;