var React = require("react");

class EditPlaylist extends React.Component {
  render() {

    let {id, name} = this.props[0];

    return (
      <html>
        <head />
        <body>

        <h2>{name}</h2>

          <div>
            <h3>Edit Playlist Information</h3>
            <form method = 'POST' action = {`/playlists/${id}?_method=put`}>
                Playlist Name: <input type='text' name='name'/><br/>
                <input type = "submit" value = "submit"/>
            </form>

            <h3>Add New Song</h3>
            <form method = 'POST' action = {`/playlists/${id}`}>
                Song Name: <input type='text' name='name'/><br/>
                <input type = "submit" value = "submit"/>
            </form>
          </div>

        </body>
      </html>
    );
  }
}

module.exports = EditPlaylist;
