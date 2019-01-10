var React = require("react");

class NewPlaylist extends React.Component {
  render() {

    return (
      <html>
        <head/>
        <body>
          <h3>Add New Playlist </h3>
          <form action="/playlist" method="POST">

                <h4>Playlist Name</h4>
                <input type="text" name="playlist" placeholder="e.g. Boomerangz"/>

                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;
