var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <body>
            <form method="POST" action="/playlist">
              <h3>Let's build an amazing Playlist!🎤</h3>
                PLAYLIST NAME: <input type="text" name="name"/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;