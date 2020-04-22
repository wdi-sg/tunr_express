var React = require("react");

class Newplaylist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Playlist Form Goes Here!</h3>
            <form method="POST" action="/artists">
                <p>Playlist name
                <input type="text" name="name"/>
                </p>
                <p>Song name
                <input type="text" name="photo_url"/>
                </p>
                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Newplaylist;