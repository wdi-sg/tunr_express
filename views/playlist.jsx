var React = require("react");

class Playlist extends React.Component {
  render() {

    let {id, name} = this.props[0];

    return (
      <html>
        <head />
        <body>

        <h2>{name}</h2>

          <div>
              <form method = 'GET' action = {`/playlists/${id}/edit`}>
                  <input type = "submit" value = "Edit Playlist"/>
              </form>
              
            <form method = 'POST' action = {`/playlists/${id}?_method=delete`}>
              <input type = "submit" value = "Delete"/>
            </form>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = Playlist;