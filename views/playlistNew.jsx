var React = require("react");

class playlistNew extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Add new playlist!</h3>
            <form action="/playlist" method="POST">
                <div>Playlist Name:</div><input name="playlist"/><br/>
                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = playlistNew;