var React = require("react");

class addSong extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>Please enter the song id to add into the play list!</h1>
                <div>
                    <form action='/playlist/:id' method="POST">
                        <p>
                            Song ID: <input name="songId" />
                        </p>
                        <p>
                            Playlist ID: <input name="playlistId" value={this.props.plId}/>
                        </p>

                        <input type="submit" value="Add this Artist!"></input>
                    </form>
                </div>
                <p>The number of page count is: {this.props.cookie}</p>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = addSong;