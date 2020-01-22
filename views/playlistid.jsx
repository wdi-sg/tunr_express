var React = require("react");

class Playlistid extends React.Component {
  render() {
    return (
      <html>
        <head>
        <title>{this.props.chosenPlaylist.name}</title>
               <meta charSet="utf-8" />
        </head>

        <body>
          <h1>Here is the playlist you requested: </h1>
            <div>
                <div>
                    <h3 style={{color:"green"}}>Playlist</h3>
                    <p>{this.props.chosenPlaylist.name}</p>
                </div>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlistid;