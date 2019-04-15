var React = require("react");

    class newPlaylist extends React.Component {
      render() {
        return (
          <html>
          <head>
          <script src="/addSongsToPlaylist.js"></script>
          </head>
            <body>
            <h1>Add New Playlist</h1>
              <h3>
              <form method="post" action="/playlist" >
                <p>Playlist Name: </p><input type="text" name="name" />
                <fieldset id="container"><legend>Songs</legend>
                <p>Song Title: </p><input type="text" name="song1" />
                <button type="button" id="button">Add another song</button>
                <br/>
                </fieldset>
                <br/><input type="submit" value="Submit" />
              </form>
              </h3>
            </body>
          </html>
        );
      }
    }

    module.exports = newPlaylist;